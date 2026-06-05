import { categories } from './helpers';
import { useFilteredContent } from '../hooks/useFilteredContent';
import { useLuhStore } from '../store/useLuhStore';
import { PostCard } from '../components/post/PostCard';
import { PageTitle } from '../components/common/PageTitle';
import { Button } from '../components/ui/Button';

export function FeedPage({ mode }: { mode: 'Trending' | 'Following' | 'Saved' | 'Reels' | 'Lookbook' }) {
  const { posts: allPosts } = useFilteredContent();
  const { savedPostIds, followedDesignerIds, selectedCategory, setSelectedCategory } = useLuhStore();
  const posts = allPosts.filter((post) => {
    if (mode === 'Saved') return savedPostIds.includes(post.id);
    if (mode === 'Following') return followedDesignerIds.includes(post.boutiqueId);
    if (mode === 'Reels') return post.type === 'reel';
    if (mode === 'Lookbook') return post.type === 'lookbook';
    return true;
  });

  return (
    <>
      <PageTitle
        title={mode}
        subtitle={mode === 'Saved' ? 'Everything you saved and pinned is kept here.' : 'Filter, sort, and explore fashion content from the Luh Style community.'}
        action={<Button variant="outline">Most Recent</Button>}
      />
      <div className="mb-6 flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition ${selectedCategory === category ? 'border-gold bg-champagne/20 text-gold' : 'border-line bg-white text-charcoal hover:bg-champagne/10'}`}
          >
            {category}
          </button>
        ))}
      </div>
      {posts.length ? (
        <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-4">
          {posts.map((post) => <PostCard key={post.id} post={post} dense />)}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-champagne bg-white p-12 text-center">
          <h3 className="font-serif text-2xl">No pieces here yet</h3>
          <p className="mt-2 text-charcoal/70">Try another category or save a post from Discover.</p>
        </div>
      )}
    </>
  );
}
