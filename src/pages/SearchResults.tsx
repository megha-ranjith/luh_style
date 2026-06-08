import { Link, useSearchParams } from 'react-router-dom';
import { Bookmark, Clapperboard, Crown, Scissors, Search, ShoppingBag } from 'lucide-react';
import { searchEcosystem } from '../api/mockApi';
import { BoutiqueCard } from '../components/boutique/BoutiqueCard';
import { MapPanel } from '../components/boutique/MapPanel';
import { PageTitle } from '../components/common/PageTitle';
import { DesignerCard } from '../components/designer/DesignerCard';
import { PostCard } from '../components/post/PostCard';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useLuhStore } from '../store/useLuhStore';

export function SearchResults() {
  const [params] = useSearchParams();
  const { posts, designers, searchQuery, setSearchQuery } = useLuhStore();
  const query = params.get('q') || searchQuery || 'kurthi';
  const results = searchEcosystem(query, posts, designers);

  return (
    <div className="grid gap-6 2xl:grid-cols-[1fr_360px]">
      <div>
        <PageTitle
          title={`Search: ${query}`}
          subtitle="One search brings back inspiration, reels, boutiques, designers, stitching providers, and collections."
          action={<Button variant="outline"><Search size={16} /> Filters</Button>}
        />
        <div className="mb-6 grid gap-3 md:grid-cols-6">
          <ResultStat icon={Bookmark} label="Posts" value={results.posts.length} />
          <ResultStat icon={Clapperboard} label="Reels" value={results.reels.length} />
          <ResultStat icon={ShoppingBag} label="Boutiques" value={results.boutiques.length} />
          <ResultStat icon={Crown} label="Designers" value={results.designers.length} />
          <ResultStat icon={Scissors} label="Stitching" value={results.stitchingProviders.length} />
          <ResultStat icon={Bookmark} label="Collections" value={results.collections.length} />
        </div>
        <Card className="mb-6 p-4">
          <div className="flex flex-wrap gap-3">
            {['kurthi', 'bridal', 'custom stitching', 'nearby boutiques', 'saree blouse', 'lehenga'].map((item) => (
              <Link key={item} to={`/search?q=${encodeURIComponent(item)}`} onClick={() => setSearchQuery(item)}>
                <Badge className={item === query ? 'bg-gold text-white' : ''}>{item}</Badge>
              </Link>
            ))}
          </div>
        </Card>
        <section className="mb-8">
          <h3 className="mb-4 font-serif text-2xl">Boutiques for "{query}"</h3>
          <div className="space-y-4">
            {results.boutiques.map((boutique) => <BoutiqueCard key={boutique.id} boutique={boutique} />)}
          </div>
        </section>
        <section className="mb-8">
          <h3 className="mb-4 font-serif text-2xl">Inspiration You Can Stitch</h3>
          <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
            {[...results.posts, ...results.reels].slice(0, 6).map((post) => <PostCard key={post.id} post={post} dense />)}
          </div>
        </section>
        <section className="mb-8">
          <h3 className="mb-4 font-serif text-2xl">Collections</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {results.collections.map((collection) => (
              <Link key={`${collection.boutiqueId}-${collection.id}`} to={`/boutiques/${collection.boutiqueId}`}>
                <Card className="overflow-hidden">
                  <img src={collection.image} alt={collection.title} className="h-44 w-full object-cover" />
                  <div className="p-4">
                    <h4 className="font-semibold">{collection.title}</h4>
                    <p className="text-sm text-charcoal/65">{collection.boutiqueName} · from Rs {collection.priceFrom.toLocaleString('en-IN')}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
      <aside className="space-y-5">
        <MapPanel boutiques={results.boutiques} />
        <Card className="p-5">
          <h3 className="mb-4 font-serif text-2xl">Designers</h3>
          <div className="space-y-4">
            {results.designers.slice(0, 2).map((designer) => <DesignerCard key={designer.id} designer={designer} />)}
          </div>
        </Card>
      </aside>
    </div>
  );
}

function ResultStat({ icon: Icon, label, value }: { icon: typeof Bookmark; label: string; value: number }) {
  return (
    <Card className="p-4">
      <Icon size={18} className="text-gold" />
      <p className="mt-2 font-serif text-2xl">{value}</p>
      <p className="text-xs uppercase text-charcoal/55">{label}</p>
    </Card>
  );
}
