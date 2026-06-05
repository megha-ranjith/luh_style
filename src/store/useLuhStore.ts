import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { boards, designers, messageThreads, notifications, posts, profile, settings } from '../data/mockData';
import type { Board, CategoryTag, DesignerBoutique, MessageThread, NotificationItem, Post, SettingsState, UserProfile } from '../types';

interface LuhState {
  profile: UserProfile;
  posts: Post[];
  designers: DesignerBoutique[];
  boards: Board[];
  threads: MessageThread[];
  notifications: NotificationItem[];
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
        settings: state.settings,
        likedPostIds: state.likedPostIds,
        savedPostIds: state.savedPostIds,
        followedDesignerIds: state.followedDesignerIds,
      }),
    },
  ),
);
