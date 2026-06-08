import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import type { DesignerBoutique } from '../../types';
import { Card } from '../ui/Card';

export function MapPanel({ boutiques }: { boutiques: DesignerBoutique[] }) {
  const nearby = boutiques.slice(0, 5);

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between p-5">
        <h3 className="font-serif text-2xl">Boutiques Near You</h3>
        <Link to="/map" className="text-sm font-semibold text-gold">View map</Link>
      </div>
      <div className="relative mx-5 h-56 overflow-hidden rounded-lg border border-line bg-ivory">
        <div className="absolute inset-0 opacity-80" style={{ backgroundImage: 'linear-gradient(#eadfca 1px, transparent 1px), linear-gradient(90deg, #eadfca 1px, transparent 1px)', backgroundSize: '34px 34px' }} />
        <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold/20 text-gold ring-8 ring-gold/10">
          <MapPin size={22} fill="currentColor" />
        </div>
        {nearby.map((boutique, index) => (
          <Link
            key={boutique.id}
            to={`/boutiques/${boutique.id}`}
            className="absolute flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white shadow-soft"
            style={{ left: `${18 + (index * 17) % 68}%`, top: `${20 + (index * 23) % 58}%` }}
            aria-label={boutique.name}
            title={boutique.name}
          >
            <MapPin size={17} />
          </Link>
        ))}
      </div>
      <div className="space-y-3 p-5">
        {nearby.slice(0, 3).map((boutique) => (
          <Link key={boutique.id} to={`/boutiques/${boutique.id}`} className="flex items-center gap-3 rounded-lg p-2 hover:bg-champagne/10">
            <img src={boutique.cover} alt="" className="h-14 w-14 rounded-md object-cover" />
            <span className="min-w-0 flex-1">
              <span className="block font-semibold">{boutique.name}</span>
              <span className="block text-sm text-charcoal/65">{boutique.area}</span>
            </span>
            <span className="text-sm text-charcoal/65">{boutique.distanceKm} km</span>
          </Link>
        ))}
      </div>
    </Card>
  );
}
