import { CheckCircle2, MapPin, Star } from 'lucide-react';
import type { DesignerBoutique } from '../../types';
import { useLuhStore } from '../../store/useLuhStore';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

export function DesignerCard({ designer }: { designer: DesignerBoutique }) {
  const { followedDesignerIds, toggleFollow } = useLuhStore();
  const followed = followedDesignerIds.includes(designer.id);

  return (
    <Card className="overflow-hidden">
      <img src={designer.cover} alt={`${designer.name} portfolio`} className="h-36 w-full object-cover" />
      <div className="p-5">
        <div className="flex items-start gap-3">
          <img src={designer.avatar} alt={designer.name} className="h-12 w-12 rounded-full object-cover ring-2 ring-champagne/60" />
          <div className="min-w-0 flex-1">
            <h3 className="flex items-center gap-1 font-semibold text-ink">
              {designer.name} {designer.verified && <CheckCircle2 size={16} className="text-gold" />}
            </h3>
            <p className="text-sm text-charcoal/65">{designer.handle}</p>
          </div>
          <Button variant={followed ? 'secondary' : 'outline'} onClick={() => toggleFollow(designer.id)}>
            {followed ? 'Following' : 'Follow'}
          </Button>
        </div>
        <p className="mt-4 text-sm text-charcoal/75">{designer.specialty}</p>
        <div className="mt-4 flex items-center justify-between text-sm text-charcoal/70">
          <span className="flex items-center gap-1"><MapPin size={15} /> {designer.location}</span>
          <span className="flex items-center gap-1"><Star size={15} className="text-gold" fill="currentColor" /> {designer.rating}</span>
        </div>
      </div>
    </Card>
  );
}
