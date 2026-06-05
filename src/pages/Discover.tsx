import { ArrowUpRight, CalendarHeart, Sparkles } from 'lucide-react';
import { categories } from './helpers';
import { useFilteredContent } from '../hooks/useFilteredContent';
import { useLuhStore } from '../store/useLuhStore';
import { PostCard } from '../components/post/PostCard';
import { DesignerCard } from '../components/designer/DesignerCard';
import { PageTitle } from '../components/common/PageTitle';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { highlights } from '../data/mockData';

export function Discover() {
  const { posts, designers } = useFilteredContent();
  const { selectedCategory, setSelectedCategory } = useLuhStore();
  const trending = posts.slice(0, 5);

  return (
    <div className="grid gap-6 2xl:grid-cols-[1fr_340px]">
      <div>
        <PageTitle title="Discover" subtitle="A calm feed of boutique looks, designer stories, reels, and boards." />
        <section className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="flex items-center gap-2 font-serif text-2xl"><ArrowUpRight className="text-gold" /> Trending Now</h3>
            <Button variant="ghost">See all</Button>
          </div>
          <div className="grid gap-4 md:grid-cols-5">
            {trending.map((post) => (
              <article key={post.id} className="relative h-72 overflow-hidden rounded-lg border border-line shadow-soft">
                <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-lg font-semibold">{post.title}</p>
                  <p className="text-sm text-white/80">{post.saves.toLocaleString()} saves</p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="mb-8">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="text-gold" />
            <h3 className="font-serif text-2xl">Seasonal Edit</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full border px-5 py-3 text-sm font-semibold transition ${selectedCategory === category ? 'border-gold bg-champagne/20 text-gold' : 'border-line bg-white text-charcoal hover:bg-champagne/10'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>
        <div className="masonry">
          {posts.map((post) => <PostCard key={post.id} post={post} />)}
        </div>
      </div>
      <aside className="space-y-5">
        <Card className="p-5">
          <h3 className="font-serif text-2xl">Story Highlights</h3>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {highlights.map((item) => (
              <div key={item.id} className="text-center">
                <img src={item.image} alt={item.title} className="mx-auto h-16 w-16 rounded-full object-cover ring-2 ring-champagne" />
                <p className="mt-2 text-xs font-medium">{item.title}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-5">
          <h3 className="mb-4 flex items-center gap-2 font-serif text-2xl"><CalendarHeart className="text-gold" /> Suggested Designers</h3>
          <div className="space-y-4">
            {designers.slice(0, 3).map((designer) => <DesignerCard key={designer.id} designer={designer} />)}
          </div>
        </Card>
      </aside>
    </div>
  );
}
