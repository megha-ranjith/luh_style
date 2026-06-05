import type { Board, CategoryTag, DesignerBoutique, HighlightItem, MessageThread, NotificationItem, Post, SettingsState, UserProfile } from '../types';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=85`;

export const profile: UserProfile = {
  id: 'user-luh',
  name: 'Luh Ananya',
  handle: '@luhananya',
  avatar: img('photo-1494790108377-be9c29b29330'),
  location: 'Bangalore, India',
  bio: 'Curating refined occasionwear, boutique discoveries, and handcrafted design notes.',
  website: 'www.luhstyle.studio',
  email: 'hello@luhstyle.studio',
  category: "Women's Ethnic Wear",
  socialLinks: ['instagram.com/luhstyle', 'pinterest.com/luhstyle'],
  stats: { posts: 128, followers: '48K', following: 112, saves: '1.2M' },
};

export const designers: DesignerBoutique[] = [
  {
    id: 'label-ananya',
    name: 'Label Ananya',
    handle: '@labelananya',
    avatar: img('photo-1496747611176-843222e1e57c'),
    cover: img('photo-1610030469983-98e550d6193c'),
    location: 'Koramangala, Bangalore',
    specialty: 'Hand-embroidered bridal lehengas',
    followers: '48K',
    rating: 4.9,
    verified: true,
    portfolio: [img('photo-1610030469983-98e550d6193c'), img('photo-1612336307429-8a898d10e223'), img('photo-1594736797933-d0501ba2fe65')],
  },
  {
    id: 'silk-room',
    name: 'The Silk Room',
    handle: '@thesilkroom',
    avatar: img('photo-1524504388940-b1c1722653e1'),
    cover: img('photo-1622122201714-77da0ca8e5d2'),
    location: 'Jayanagar, Bangalore',
    specialty: 'Sarees, drapes, and occasion styling',
    followers: '56.4K',
    rating: 4.8,
    verified: true,
    portfolio: [img('photo-1622122201714-77da0ca8e5d2'), img('photo-1591369822096-ffd140ec948f'), img('photo-1609357605129-26f69add5d6e')],
  },
  {
    id: 'vaani',
    name: 'Vaani Boutique',
    handle: '@vaaniboutique',
    avatar: img('photo-1534528741775-53994a69daeb'),
    cover: img('photo-1603252109303-2751441dd157'),
    location: 'Banashankari, Bangalore',
    specialty: 'Festive kurtis and made-to-measure sets',
    followers: '22K',
    rating: 4.7,
    verified: true,
    portfolio: [img('photo-1603252109303-2751441dd157'), img('photo-1509631179647-0177331693ae'), img('photo-1617922001439-4a2e6562f328')],
  },
  {
    id: 'thread-tales',
    name: 'Thread & Tales',
    handle: '@threadtales',
    avatar: img('photo-1502823403499-6ccfcf4fb453'),
    cover: img('photo-1502716119720-b23a93e5fe1b'),
    location: 'Indiranagar, Bangalore',
    specialty: 'Minimal ivory gowns and resort edits',
    followers: '31K',
    rating: 4.8,
    verified: false,
    portfolio: [img('photo-1502716119720-b23a93e5fe1b'), img('photo-1483985988355-763728e1935b'), img('photo-1529139574466-a303027c1d8b')],
  },
  {
    id: 'stitch-sage',
    name: 'Stitch & Sage',
    handle: '@stitchsage',
    avatar: img('photo-1517841905240-472988babdf9'),
    cover: img('photo-1512436991641-6745cdb1723f'),
    location: 'Whitefield, Bangalore',
    specialty: 'Textile details and handwork',
    followers: '19K',
    rating: 4.6,
    verified: true,
    portfolio: [img('photo-1512436991641-6745cdb1723f'), img('photo-1515886657613-9f3515b0c78f'), img('photo-1485462537746-965f33f7f6a7')],
  },
];

const postSeed: Array<[string, string, string, CategoryTag, string, 'post' | 'reel' | 'lookbook']> = [
  ['p1', 'Timeless Champagne Lehenga', 'label-ananya', 'Bridal', 'photo-1610030469983-98e550d6193c', 'post'],
  ['p2', 'Pastel Blue Garden Anarkali', 'silk-room', 'Pastel', 'photo-1622122201714-77da0ca8e5d2', 'post'],
  ['p3', 'Golden Kurti for Festive Brunch', 'vaani', 'Kurtis', 'photo-1603252109303-2751441dd157', 'reel'],
  ['p4', 'Ivory Windowlight Gown', 'thread-tales', 'Gowns', 'photo-1502716119720-b23a93e5fe1b', 'lookbook'],
  ['p5', 'Handwork Detail in Rose Gold', 'stitch-sage', 'Minimal', 'photo-1512436991641-6745cdb1723f', 'reel'],
  ['p6', 'Saree Drape with Antique Zari', 'silk-room', 'Sarees', 'photo-1591369822096-ffd140ec948f', 'post'],
  ['p7', 'Bridal Back Detail Inspiration', 'label-ananya', 'Lehengas', 'photo-1612336307429-8a898d10e223', 'reel'],
  ['p8', 'Soft Gold Reception Edit', 'vaani', 'Festive', 'photo-1509631179647-0177331693ae', 'lookbook'],
  ['p9', 'Minimal Embroidered Co-ord', 'thread-tales', 'Outfits', 'photo-1483985988355-763728e1935b', 'post'],
  ['p10', 'Pearl Beadwork Closeup', 'stitch-sage', 'Bridal', 'photo-1515886657613-9f3515b0c78f', 'post'],
];

export const posts: Post[] = postSeed.map(([id, title, boutiqueId, category, imageId, type], index) => ({
  id,
  title,
  boutiqueId,
  image: img(imageId),
  location: designers.find((designer) => designer.id === boutiqueId)?.location ?? 'Bangalore, India',
  category,
  tags: [category, 'handcrafted', 'occasionwear', index % 2 ? 'new arrival' : 'editor pick'],
  type,
  likes: 840 + index * 221,
  saves: 520 + index * 173,
  comments: 18 + index * 7,
  createdAt: new Date(Date.now() - (index + 2) * 3_600_000).toISOString(),
  description: 'Refined construction, thoughtful details, and boutique-ready tailoring notes for your next occasion.',
}));

export const boards: Board[] = [
  { id: 'b1', name: 'Bridal Inspo', description: 'Ceremony looks, veils, and heirloom handwork.', coverPostIds: ['p1', 'p7', 'p10'], postIds: ['p1', 'p7', 'p10'], updatedAt: new Date().toISOString() },
  { id: 'b2', name: 'Pastel Perfection', description: 'Soft palettes for day events.', coverPostIds: ['p2', 'p6'], postIds: ['p2', 'p6'], updatedAt: new Date().toISOString() },
  { id: 'b3', name: 'Festive Looks', description: 'Gold-toned outfits for family gatherings.', coverPostIds: ['p3', 'p8'], postIds: ['p3', 'p8'], updatedAt: new Date().toISOString() },
];

export const messageThreads: MessageThread[] = [
  {
    id: 't1',
    participantId: 'label-ananya',
    unread: 2,
    messages: [
      { id: 'm1', senderId: 'label-ananya', body: 'Loved your bridal board. Would you like detail shots for the champagne lehenga?', createdAt: new Date(Date.now() - 4200000).toISOString(), attachments: [posts[0].image, posts[6].image] },
      { id: 'm2', senderId: 'user-luh', body: 'Yes, please. Can you also share the stitching timeline?', createdAt: new Date(Date.now() - 3000000).toISOString() },
    ],
  },
  {
    id: 't2',
    participantId: 'silk-room',
    unread: 0,
    messages: [
      { id: 'm3', senderId: 'silk-room', body: 'The pastel saree edit is ready for preview.', createdAt: new Date(Date.now() - 86400000).toISOString() },
    ],
  },
];

export const notifications: NotificationItem[] = [
  { id: 'n1', type: 'like', title: 'Label Ananya liked your board', body: 'Bridal Inspo is getting attention from boutiques.', createdAt: new Date(Date.now() - 900000).toISOString(), read: false, actorId: 'label-ananya', postId: 'p1' },
  { id: 'n2', type: 'comment', title: 'The Silk Room commented', body: 'They suggested an antique zari border pairing.', createdAt: new Date(Date.now() - 5200000).toISOString(), read: false, actorId: 'silk-room', postId: 'p2' },
  { id: 'n3', type: 'follow', title: 'Vaani Boutique followed you', body: 'They are now following your Luh Style profile.', createdAt: new Date(Date.now() - 8800000).toISOString(), read: true, actorId: 'vaani' },
  { id: 'n4', type: 'order', title: 'Inquiry draft saved', body: 'Your stitching inquiry can be resumed from Messages.', createdAt: new Date(Date.now() - 12600000).toISOString(), read: true },
];

export const highlights: HighlightItem[] = [
  { id: 'h1', title: 'Bridal', image: posts[0].image },
  { id: 'h2', title: 'Lehengas', image: posts[6].image },
  { id: 'h3', title: 'Sarees', image: posts[1].image },
  { id: 'h4', title: 'Kurtis', image: posts[2].image },
  { id: 'h5', title: 'Festive', image: posts[7].image },
];

export const settings: SettingsState = {
  privateProfile: false,
  allowMessages: true,
  emailAlerts: true,
  pushAlerts: true,
  defaultBoardId: 'b1',
  preferredCategories: ['Bridal', 'Sarees', 'Kurtis'],
};
