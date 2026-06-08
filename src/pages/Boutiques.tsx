import { Link } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import { BoutiqueCard } from '../components/boutique/BoutiqueCard';
import { MapPanel } from '../components/boutique/MapPanel';
import { PageTitle } from '../components/common/PageTitle';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useLuhStore } from '../store/useLuhStore';

export function Boutiques() {
  const boutiques = useLuhStore((state) => state.designers).slice().sort((a, b) => a.distanceKm - b.distanceKm);

  return (
    <div className="grid gap-6 2xl:grid-cols-[1fr_360px]">
      <div>
        <PageTitle title="Boutiques" subtitle="Find nearby boutiques, custom stitching providers, and designers ready to turn inspiration into orders." action={<Button variant="outline"><SlidersHorizontal size={16} /> Filters</Button>} />
        <div className="mb-5 flex flex-wrap gap-3">
          {['All', 'Custom Stitching', '4+ & above', 'Women Owned', 'COD Available', 'Kurthi Specialist'].map((filter, index) => (
            <Button key={filter} variant={index === 0 ? 'primary' : 'secondary'}>{filter}</Button>
          ))}
        </div>
        <div className="space-y-4">
          {boutiques.map((boutique) => <BoutiqueCard key={boutique.id} boutique={boutique} />)}
        </div>
      </div>
      <aside className="space-y-5">
        <MapPanel boutiques={boutiques} />
        <Card className="p-5">
          <h3 className="font-serif text-2xl">Why boutique discovery?</h3>
          <div className="mt-4 space-y-4 text-sm text-charcoal/70">
            <p><strong className="text-ink">Unique designs.</strong> Find work you will not see everywhere.</p>
            <p><strong className="text-ink">Personalized fit.</strong> Convert references into stitched pieces.</p>
            <p><strong className="text-ink">Trusted and verified.</strong> Review-backed boutiques near you.</p>
          </div>
          <Link to="/stitching"><Button className="mt-5 w-full">Request Custom Design</Button></Link>
        </Card>
      </aside>
    </div>
  );
}
