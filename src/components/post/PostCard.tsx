import { Bookmark, Heart, MessageCircle, Pin, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { Post } from '../../types';
import { compactNumber } from '../../lib/utils';
import { useLuhStore } from '../../store/useLuhStore';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export function PostCard({ post, dense = false }: { post: Post; dense?: boolean }) {
  const { designers, likedPostIds, savedPostIds, toggleLike, toggleSave, pinToBoard, boards } = useLuhStore();
  const designer = designers.find((item) => item.id === post.boutiqueId)!;
  const liked = likedPostIds.includes(post.id);
  const saved = savedPostIds.includes(post.id);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-4 break-inside-avoid overflow-hidden rounded-lg border border-line bg-pearl shadow-soft"
    >
      <div className="relative">
        <img src={post.image} alt={post.title} className={dense ? 'h-56 w-full object-cover' : 'h-[360px] w-full object-cover'} />
        <button
          onClick={() => toggleSave(post.id)}
          className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-gold shadow"
          aria-label={saved ? 'Unsave post' : 'Save post'}
        >
          <Bookmark size={18} fill={saved ? 'currentColor' : 'none'} />
        </button>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
          <Badge className="mb-2 bg-white/85 text-gold">{post.type}</Badge>
          <h3 className="text-lg font-semibold">{post.title}</h3>
          <p className="text-sm text-white/85">{designer.name} · {post.location}</p>
        </div>
      </div>
      <div className="space-y-4 p-4">
        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs font-medium text-gold">#{tag}</span>
          ))}
        </div>
        <p className="text-sm text-charcoal/75">{post.description}</p>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 text-sm text-charcoal/70">
            <button onClick={() => toggleLike(post.id)} className="flex items-center gap-1" aria-label={liked ? 'Unlike' : 'Like'}>
              <Heart size={17} className={liked ? 'text-gold' : ''} fill={liked ? 'currentColor' : 'none'} /> {compactNumber(post.likes + (liked ? 1 : 0))}
            </button>
            <span className="flex items-center gap-1"><Bookmark size={16} /> {compactNumber(post.saves + (saved ? 1 : 0))}</span>
            <span className="flex items-center gap-1"><MessageCircle size={16} /> {post.comments}</span>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" className="h-9 w-9 px-0" aria-label="Share"><Send size={16} /></Button>
            <Link to={`/stitch/${post.id}`}>
              <Button className="h-9 px-3">Get This Stitched</Button>
            </Link>
            <Button
              variant="outline"
              className="h-9 px-3"
              onClick={() => boards[0] && pinToBoard(post.id, boards[0].id)}
            >
              <Pin size={15} /> Pin
            </Button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
