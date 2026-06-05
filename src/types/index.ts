export type CategoryTag =
  | 'Outfits'
  | 'Bridal'
  | 'Lehengas'
  | 'Sarees'
  | 'Kurtis'
  | 'Gowns'
  | 'Festive'
  | 'Minimal'
  | 'Pastel';

export interface UserProfile {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  location: string;
  bio: string;
  website: string;
  email: string;
  category: string;
  socialLinks: string[];
  stats: {
    posts: number;
    followers: string;
    following: number;
    saves: string;
  };
}

export interface DesignerBoutique {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  cover: string;
  location: string;
  specialty: string;
  followers: string;
  rating: number;
  verified: boolean;
  portfolio: string[];
}

export interface Post {
  id: string;
  title: string;
  boutiqueId: string;
  image: string;
  location: string;
  category: CategoryTag;
  tags: string[];
  type: 'post' | 'reel' | 'lookbook';
  likes: number;
  saves: number;
  comments: number;
  createdAt: string;
  description: string;
}

export interface Board {
  id: string;
  name: string;
  description: string;
  coverPostIds: string[];
  postIds: string[];
  updatedAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  body: string;
  createdAt: string;
  attachments?: string[];
}

export interface MessageThread {
  id: string;
  participantId: string;
  unread: number;
  messages: Message[];
}

export interface NotificationItem {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'save' | 'order' | 'mention';
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
  actorId?: string;
  postId?: string;
}

export interface HighlightItem {
  id: string;
  title: string;
  image: string;
}

export interface SettingsState {
  privateProfile: boolean;
  allowMessages: boolean;
  emailAlerts: boolean;
  pushAlerts: boolean;
  defaultBoardId: string;
  preferredCategories: CategoryTag[];
}
