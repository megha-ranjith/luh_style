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
  area: string;
  distanceKm: number;
  specialty: string;
  followers: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  phone: string;
  email: string;
  hours: string;
  services: string[];
  collections: Collection[];
  reviews: Review[];
  coordinates: {
    lat: number;
    lng: number;
  };
  priceRange: string;
  turnaround: string;
  womenOwned: boolean;
  codAvailable: boolean;
  portfolio: string[];
}

export interface Collection {
  id: string;
  title: string;
  description: string;
  image: string;
  priceFrom: number;
  tags: string[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  body: string;
  createdAt: string;
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

export interface AppointmentBooking {
  id: string;
  boutiqueId: string;
  date: string;
  time: string;
  service: string;
  notes: string;
  status: 'requested' | 'confirmed' | 'completed';
  createdAt: string;
}

export interface StitchingRequest {
  id: string;
  postId: string;
  boutiqueId: string;
  service: string;
  measurements: string;
  budget: string;
  eventDate: string;
  notes: string;
  status: 'draft' | 'sent' | 'quoted' | 'booked';
  createdAt: string;
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
