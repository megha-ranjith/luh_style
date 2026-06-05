import { Bell, Heart, MapPin, Search, SlidersHorizontal } from 'lucide-react';
import { useLuhStore } from '../../store/useLuhStore';
import { Button } from '../ui/Button';

export function Header() {
  const { profile, searchQuery, setSearchQuery, notifications } = useLuhStore();
  const unread = notifications.some((item) => !item.read);

  return (
    <header className="sticky top-0 z-10 border-b border-line/70 bg-pearl/85 px-4 py-4 backdrop-blur md:px-8 xl:ml-64">
      <div className="mx-auto flex max-w-[1540px] items-center gap-4">
        <div className="relative min-w-0 flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/60" size={19} />
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search styles, boutiques, boards, tags..."
            className="h-12 w-full rounded-full border border-line bg-white px-12 text-sm text-ink shadow-sm placeholder:text-charcoal/45"
            aria-label="Search Luh Style"
          />
        </div>
        <Button variant="secondary" className="hidden shrink-0 md:inline-flex">
          <MapPin size={17} /> {profile.location}
        </Button>
        <Button variant="ghost" className="h-11 w-11 px-0" aria-label="Open filters">
          <SlidersHorizontal size={19} />
        </Button>
        <Button variant="ghost" className="h-11 w-11 px-0" aria-label="Saved inspiration">
          <Heart size={19} />
        </Button>
        <Button variant="ghost" className="relative h-11 w-11 px-0" aria-label="Notifications">
          <Bell size={19} />
          {unread && <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-gold" />}
        </Button>
        <img src={profile.avatar} alt={profile.name} className="h-11 w-11 rounded-full object-cover ring-2 ring-champagne/70" />
      </div>
    </header>
  );
}
