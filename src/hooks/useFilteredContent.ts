import { useMemo } from 'react';
import { useLuhStore } from '../store/useLuhStore';

export function useFilteredContent() {
  const { posts, designers, boards, searchQuery, selectedCategory } = useLuhStore();

  return useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const matchesQuery = (text: string) => text.toLowerCase().includes(query);
    const filteredPosts = posts.filter((post) => {
      const designer = designers.find((item) => item.id === post.boutiqueId);
      const categoryMatch = selectedCategory === 'All' || post.category === selectedCategory;
      const queryMatch =
        !query ||
        [post.title, post.description, post.location, post.category, designer?.name ?? '', ...post.tags].some(matchesQuery);
      return categoryMatch && queryMatch;
    });
    const filteredDesigners = designers.filter(
      (designer) =>
        !query ||
        [
          designer.name,
          designer.location,
          designer.area,
          designer.specialty,
          designer.handle,
          ...designer.services,
          ...designer.collections.flatMap((collection) => [collection.title, collection.description, ...collection.tags]),
        ].some(matchesQuery),
    );
    const filteredBoards = boards.filter((board) => !query || [board.name, board.description].some(matchesQuery));

    return { posts: filteredPosts, designers: filteredDesigners, boards: filteredBoards };
  }, [boards, designers, posts, searchQuery, selectedCategory]);
}
