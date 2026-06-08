import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { appointmentBookings, boards, designers, messageThreads, notifications, posts, profile, settings, stitchingRequests } from '../data/mockData';
import type { AppointmentBooking, Board, CategoryTag, DesignerBoutique, MessageThread, NotificationItem, Post, SettingsState, StitchingRequest, UserProfile } from '../types';

interface LuhState {
  profile: UserProfile;
  posts: Post[];
  designers: DesignerBoutique[];
  boards: Board[];
  threads: MessageThread[];
  notifications: NotificationItem[];
  appointments: AppointmentBooking[];
  stitchingRequests: StitchingRequest[];
  settings: SettingsState;
  likedPostIds: string[];
  savedPostIds: string[];
  followedDesignerIds: string[];
  searchQuery: string;
  selectedCategory: CategoryTag | 'All';
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: CategoryTag | 'All') => void;
  toggleLike: (postId: string) => void;
  toggleSave: (postId: string) => void;
  toggleFollow: (designerId: string) => void;
  createBoard: (name: string, description?: string) => void;
  updateBoard: (boardId: string, patch: Partial<Board>) => void;
  deleteBoard: (boardId: string) => void;
  pinToBoard: (postId: string, boardId: string) => void;
  sendMessage: (threadId: string, body: string) => void;
  ensureThread: (boutiqueId: string) => string;
  createAppointment: (input: Omit<AppointmentBooking, 'id' | 'status' | 'createdAt'>) => void;
  createStitchingRequest: (input: Omit<StitchingRequest, 'id' | 'status' | 'createdAt'>) => void;
  updateStitchingRequest: (requestId: string, patch: Partial<StitchingRequest>) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  updateProfile: (patch: Partial<UserProfile>) => void;
  updateSettings: (patch: Partial<SettingsState>) => void;
}

export const useLuhStore = create<LuhState>()(
  persist(
    (set) => ({
      profile,
      posts,
      designers,
      boards,
      threads: messageThreads,
      notifications,
      appointments: appointmentBookings,
      stitchingRequests,
      settings,
      likedPostIds: ['p1', 'p4'],
      savedPostIds: ['p1', 'p2', 'p5'],
      followedDesignerIds: ['label-ananya', 'silk-room'],
      searchQuery: '',
      selectedCategory: 'All',
      setSearchQuery: (query) => set({ searchQuery: query }),
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      toggleLike: (postId) =>
        set((state) => ({
          likedPostIds: state.likedPostIds.includes(postId)
            ? state.likedPostIds.filter((id) => id !== postId)
            : [...state.likedPostIds, postId],
        })),
      toggleSave: (postId) =>
        set((state) => ({
          savedPostIds: state.savedPostIds.includes(postId)
            ? state.savedPostIds.filter((id) => id !== postId)
            : [...state.savedPostIds, postId],
        })),
      toggleFollow: (designerId) =>
        set((state) => ({
          followedDesignerIds: state.followedDesignerIds.includes(designerId)
            ? state.followedDesignerIds.filter((id) => id !== designerId)
            : [...state.followedDesignerIds, designerId],
        })),
      createBoard: (name, description = 'A curated board for your saved fashion inspiration.') =>
        set((state) => ({
          boards: [
            ...state.boards,
            {
              id: crypto.randomUUID(),
              name,
              description,
              coverPostIds: [],
              postIds: [],
              updatedAt: new Date().toISOString(),
            },
          ],
        })),
      updateBoard: (boardId, patch) =>
        set((state) => ({
          boards: state.boards.map((board) => (board.id === boardId ? { ...board, ...patch } : board)),
        })),
      deleteBoard: (boardId) => set((state) => ({ boards: state.boards.filter((board) => board.id !== boardId) })),
      pinToBoard: (postId, boardId) =>
        set((state) => ({
          savedPostIds: state.savedPostIds.includes(postId) ? state.savedPostIds : [...state.savedPostIds, postId],
          boards: state.boards.map((board) =>
            board.id === boardId
              ? {
                  ...board,
                  postIds: board.postIds.includes(postId) ? board.postIds : [...board.postIds, postId],
                  coverPostIds: board.coverPostIds.includes(postId) ? board.coverPostIds : [...board.coverPostIds, postId].slice(-3),
                  updatedAt: new Date().toISOString(),
                }
              : board,
          ),
        })),
      sendMessage: (threadId, body) =>
        set((state) => ({
          threads: state.threads.map((thread) =>
            thread.id === threadId
              ? {
                  ...thread,
                  messages: [...thread.messages, { id: crypto.randomUUID(), senderId: state.profile.id, body, createdAt: new Date().toISOString() }],
                }
              : thread,
          ),
        })),
      ensureThread: (boutiqueId) => {
        let threadId = '';
        set((state) => {
          const existing = state.threads.find((thread) => thread.participantId === boutiqueId);
          if (existing) {
            threadId = existing.id;
            return state;
          }
          threadId = crypto.randomUUID();
          return {
            threads: [
              ...state.threads,
              {
                id: threadId,
                participantId: boutiqueId,
                unread: 0,
                messages: [
                  {
                    id: crypto.randomUUID(),
                    senderId: boutiqueId,
                    body: 'Thanks for reaching out through Luh Style. Share your inspiration or appointment preference and we will help with the next step.',
                    createdAt: new Date().toISOString(),
                  },
                ],
              },
            ],
          };
        });
        return threadId;
      },
      createAppointment: (input) =>
        set((state) => ({
          appointments: [
            {
              ...input,
              id: crypto.randomUUID(),
              status: 'requested',
              createdAt: new Date().toISOString(),
            },
            ...state.appointments,
          ],
          notifications: [
            {
              id: crypto.randomUUID(),
              type: 'order',
              title: 'Appointment requested',
              body: 'Your boutique appointment request has been saved.',
              createdAt: new Date().toISOString(),
              read: false,
              actorId: input.boutiqueId,
            },
            ...state.notifications,
          ],
        })),
      createStitchingRequest: (input) =>
        set((state) => ({
          savedPostIds: state.savedPostIds.includes(input.postId) ? state.savedPostIds : [...state.savedPostIds, input.postId],
          stitchingRequests: [
            {
              ...input,
              id: crypto.randomUUID(),
              status: 'sent',
              createdAt: new Date().toISOString(),
            },
            ...state.stitchingRequests,
          ],
          notifications: [
            {
              id: crypto.randomUUID(),
              type: 'order',
              title: 'Stitching request sent',
              body: 'Your inspiration has been converted into a boutique request.',
              createdAt: new Date().toISOString(),
              read: false,
              actorId: input.boutiqueId,
              postId: input.postId,
            },
            ...state.notifications,
          ],
        })),
      updateStitchingRequest: (requestId, patch) =>
        set((state) => ({
          stitchingRequests: state.stitchingRequests.map((request) => (request.id === requestId ? { ...request, ...patch } : request)),
        })),
      markNotificationRead: (id) =>
        set((state) => ({ notifications: state.notifications.map((item) => (item.id === id ? { ...item, read: true } : item)) })),
      markAllNotificationsRead: () => set((state) => ({ notifications: state.notifications.map((item) => ({ ...item, read: true })) })),
      updateProfile: (patch) => set((state) => ({ profile: { ...state.profile, ...patch } })),
      updateSettings: (patch) => set((state) => ({ settings: { ...state.settings, ...patch } })),
    }),
    {
      name: 'luh-style-state',
      partialize: (state) => ({
        profile: state.profile,
        boards: state.boards,
        threads: state.threads,
        notifications: state.notifications,
        appointments: state.appointments,
        stitchingRequests: state.stitchingRequests,
        settings: state.settings,
        likedPostIds: state.likedPostIds,
        savedPostIds: state.savedPostIds,
        followedDesignerIds: state.followedDesignerIds,
      }),
    },
  ),
);
