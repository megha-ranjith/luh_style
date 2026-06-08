import { NavLink } from 'react-router-dom';
import { Bell, Bookmark, CalendarDays, Crown, Flame, Grid2X2, HeartHandshake, Home, Map, MessageCircle, PlaySquare, Scissors, Search, Settings, ShoppingBag, User, Users } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useLuhStore } from '../../store/useLuhStore';

const nav = [
  { to: '/', label: 'Discover', icon: Home },
  { to: '/search', label: 'Search', icon: Search },
  { to: '/boutiques', label: 'Boutiques', icon: ShoppingBag },
  { to: '/map', label: 'Near Me', icon: Map },
  { to: '/stitching', label: 'Custom Stitching', icon: Scissors },
  { to: '/trending', label: 'Trending', icon: Flame },
  { to: '/following', label: 'Following', icon: Users },
  { to: '/saved', label: 'Saved', icon: Bookmark },
  { to: '/boards', label: 'Boards', icon: Grid2X2 },
  { to: '/reels', label: 'Reels', icon: PlaySquare },
  { to: '/lookbook', label: 'Lookbook', icon: HeartHandshake },
  { to: '/designers', label: 'Designers', icon: Crown },
  { to: '/bookings', label: 'Bookings', icon: CalendarDays },
  { to: '/messages', label: 'Messages', icon: MessageCircle },
  { to: '/notifications', label: 'Notifications', icon: Bell },
  { to: '/profile', label: 'Profile', icon: User },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const unreadNotifications = useLuhStore((state) => state.notifications.filter((item) => !item.read).length);
  const unreadMessages = useLuhStore((state) => state.threads.reduce((sum, thread) => sum + thread.unread, 0));

  return (
    <aside className="fixed left-0 top-0 z-20 hidden h-screen w-64 border-r border-line/70 bg-pearl/90 px-5 py-6 backdrop-blur xl:block">
      <div className="mb-10">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-champagne bg-champagne/10 text-xl font-serif text-gold">L</div>
          <div>
            <h1 className="font-serif text-3xl text-ink">Luh Style</h1>
            <p className="text-xs text-charcoal/70">See. Find. Stitch.</p>
          </div>
        </div>
      </div>
      <nav className="space-y-1">
        {nav.map((item) => {
          const Icon = item.icon;
          const count = item.label === 'Messages' ? unreadMessages : item.label === 'Notifications' ? unreadNotifications : 0;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex items-center justify-between rounded-full px-4 py-3 text-sm font-medium text-charcoal transition',
                  isActive ? 'bg-champagne/18 text-gold' : 'hover:bg-champagne/10',
                )
              }
            >
              <span className="flex items-center gap-3">
                <Icon size={18} />
                {item.label}
              </span>
              {count > 0 && <span className="rounded-full bg-gold px-2 py-0.5 text-xs text-white">{count}</span>}
            </NavLink>
          );
        })}
      </nav>
      <div className="absolute bottom-6 left-5 right-5 rounded-lg border border-line bg-ivory p-5">
        <p className="font-serif text-xl">Get it stitched.</p>
        <p className="mt-1 text-sm text-charcoal/70">Turn any saved design into a boutique order.</p>
      </div>
    </aside>
  );
}
