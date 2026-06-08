import { Link } from 'react-router-dom';
import { CheckCircle2, Clock, Heart, Mail, MapPin, Phone, Star } from 'lucide-react';
import type { DesignerBoutique } from '../../types';
import { useLuhStore } from '../../store/useLuhStore';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

export function BoutiqueCard({ boutique, compact = false }: { boutique: DesignerBoutique; compact?: boolean }) {
  const { followedDesignerIds, toggleFollow } = useLuhStore();
  const followed = followedDesignerIds.includes(boutique.id);

  return (
    <Card className="overflow-hidden">
      <div className={compact ? 'p-4' : 'grid gap-0 md:grid-cols-[280px_1fr_270px]'}>
        <div className={compact ? '' : 'p-4'}>
          <div className="relative overflow-hidden rounded-lg">
            <img src={boutique.cover} alt={`${boutique.name} boutique interior`} className={compact ? 'h-36 w-full object-cover' : 'h-44 w-full object-cover'} />
            <button
              onClick={() => toggleFollow(boutique.id)}
              className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-gold shadow"
              aria-label={followed ? 'Unfollow boutique' : 'Follow boutique'}
            >
              <Heart size={18} fill={followed ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>
        <div className={compact ? 'pt-4' : 'border-line p-5 md:border-r'}>
          <h3 className="flex items-center gap-2 font-serif text-2xl text-ink">
            {boutique.name}
            {boutique.verified && <CheckCircle2 size={17} className="text-gold" />}
          </h3>
          <p className="mt-1 text-sm text-charcoal/70">{boutique.specialty}</p>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-charcoal/70">
            <span className="flex items-center gap-1"><Star size={15} className="text-gold" fill="currentColor" /> {boutique.rating} ({boutique.reviewCount})</span>
            <span className="flex items-center gap-1"><MapPin size={15} /> {boutique.area} · {boutique.distanceKm} km</span>
            <span className="flex items-center gap-1"><Clock size={15} /> {boutique.hours}</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {boutique.services.slice(0, compact ? 3 : 5).map((service) => (
              <span key={service} className="rounded-full bg-champagne/12 px-3 py-1 text-xs font-semibold text-gold">{service}</span>
            ))}
          </div>
          {!compact && <p className="mt-4 text-sm text-charcoal/70">{boutique.priceRange} · Typical turnaround {boutique.turnaround}</p>}
        </div>
        {!compact && (
          <div className="flex flex-col justify-center gap-3 p-5 text-sm text-charcoal/75">
            <span className="flex items-center gap-2"><Phone size={16} /> {boutique.phone}</span>
            <span className="flex items-center gap-2"><Mail size={16} /> {boutique.email}</span>
            <Link to={`/boutiques/${boutique.id}`}>
              <Button variant="outline" className="mt-2 w-full">View Boutique</Button>
            </Link>
            <Link to={`/boutiques/${boutique.id}?book=true`}>
              <Button className="w-full">Book Appointment</Button>
            </Link>
          </div>
        )}
        {compact && (
          <div className="mt-4 flex gap-2">
            <Link to={`/boutiques/${boutique.id}`} className="flex-1"><Button variant="outline" className="w-full">View</Button></Link>
            <Link to={`/boutiques/${boutique.id}?book=true`} className="flex-1"><Button className="w-full">Book</Button></Link>
          </div>
        )}
      </div>
    </Card>
  );
}
