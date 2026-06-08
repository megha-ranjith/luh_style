import { Link } from 'react-router-dom';
import { MapPin, Navigation } from 'lucide-react';
import { BoutiqueCard } from '../components/boutique/BoutiqueCard';
import { PageTitle } from '../components/common/PageTitle';
import { Card } from '../components/ui/Card';
import { useLuhStore } from '../store/useLuhStore';

export function MapView() {
  const boutiques = useLuhStore((state) => state.designers).slice().sort((a, b) => a.distanceKm - b.distanceKm);

  return (
    <>
      <PageTitle title="Near Me" subtitle="Map-first boutique discovery for custom stitching, collections, and appointments around Bangalore." />
      <div className="grid gap-6 xl:grid-cols-[1fr_430px]">
        <Card className="relative h-[680px] overflow-hidden bg-ivory">
          <div className="absolute inset-0 opacity-80" style={{ backgroundImage: 'linear-gradient(#eadfca 1px, transparent 1px), linear-gradient(90deg, #eadfca 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
          <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold/20 text-gold ring-[18px] ring-gold/10">
            <Navigation size={26} fill="currentColor" />
          </div>
          {boutiques.map((boutique, index) => (
            <Link
              key={boutique.id}
              to={`/boutiques/${boutique.id}`}
              className="absolute rounded-full bg-ink px-3 py-2 text-xs font-semibold text-white shadow-soft"
              style={{ left: `${14 + (index * 17) % 72}%`, top: `${18 + (index * 19) % 64}%` }}
            >
              <span className="flex items-center gap-1"><MapPin size={14} /> {boutique.name}</span>
            </Link>
          ))}
        </Card>
        <div className="gold-scroll max-h-[680px] space-y-4 overflow-auto pr-2">
          {boutiques.map((boutique) => <BoutiqueCard key={boutique.id} boutique={boutique} compact />)}
        </div>
      </div>
    </>
  );
}
