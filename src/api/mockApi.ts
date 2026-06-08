import type { DesignerBoutique, Post } from '../types';

export interface UnifiedSearchResults {
  posts: Post[];
  reels: Post[];
  designers: DesignerBoutique[];
  boutiques: DesignerBoutique[];
  stitchingProviders: DesignerBoutique[];
  collections: Array<DesignerBoutique['collections'][number] & { boutiqueId: string; boutiqueName: string }>;
}

const includes = (value: string, query: string) => value.toLowerCase().includes(query.toLowerCase());

export function searchEcosystem(query: string, posts: Post[], boutiques: DesignerBoutique[]): UnifiedSearchResults {
  const q = query.trim().toLowerCase();
  const matchesPost = (post: Post) => {
    const boutique = boutiques.find((item) => item.id === post.boutiqueId);
    return !q || [post.title, post.description, post.category, post.location, boutique?.name ?? '', ...post.tags].some((value) => includes(value, q));
  };
  const matchesBoutique = (boutique: DesignerBoutique) =>
    !q ||
    [
      boutique.name,
      boutique.handle,
      boutique.location,
      boutique.area,
      boutique.specialty,
      ...boutique.services,
      ...boutique.collections.flatMap((collection) => [collection.title, collection.description, ...collection.tags]),
    ].some((value) => includes(value, q));

  const matchedPosts = posts.filter(matchesPost);
  const matchedBoutiques = boutiques.filter(matchesBoutique).sort((a, b) => a.distanceKm - b.distanceKm);
  const collections = boutiques.flatMap((boutique) =>
    boutique.collections
      .filter((collection) => !q || [collection.title, collection.description, ...collection.tags].some((value) => includes(value, q)))
      .map((collection) => ({ ...collection, boutiqueId: boutique.id, boutiqueName: boutique.name })),
  );

  return {
    posts: matchedPosts.filter((post) => post.type !== 'reel'),
    reels: matchedPosts.filter((post) => post.type === 'reel'),
    designers: matchedBoutiques.filter((boutique) => boutique.followers !== '0'),
    boutiques: matchedBoutiques,
    stitchingProviders: matchedBoutiques.filter((boutique) => boutique.services.some((service) => includes(service, 'stitch'))),
    collections,
  };
}

export function boutiqueCapabilityScore(post: Post, boutique: DesignerBoutique) {
  const haystack = [...boutique.services, boutique.specialty, ...boutique.collections.flatMap((collection) => collection.tags)].join(' ').toLowerCase();
  const categoryScore = haystack.includes(post.category.toLowerCase()) ? 30 : 0;
  const tagScore = post.tags.reduce((score, tag) => score + (haystack.includes(tag.toLowerCase()) ? 10 : 0), 0);
  const ratingScore = boutique.rating * 10;
  const distanceScore = Math.max(0, 20 - boutique.distanceKm);
  return Math.round(categoryScore + tagScore + ratingScore + distanceScore);
}

export function capableBoutiquesForPost(post: Post, boutiques: DesignerBoutique[]) {
  return boutiques
    .filter((boutique) => boutique.services.some((service) => service.toLowerCase().includes('stitch')))
    .map((boutique) => ({ boutique, score: boutiqueCapabilityScore(post, boutique) }))
    .sort((a, b) => b.score - a.score);
}
