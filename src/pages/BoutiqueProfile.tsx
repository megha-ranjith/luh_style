import { FormEvent, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { CheckCircle2, Mail, MapPin, MessageCircle, Phone, Scissors, Star } from 'lucide-react';
import { BookingForm } from '../components/boutique/BookingForm';
import { PageTitle } from '../components/common/PageTitle';
import { PostCard } from '../components/post/PostCard';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useLuhStore } from '../store/useLuhStore';

export function BoutiqueProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { designers, posts, ensureThread, createStitchingRequest } = useLuhStore();
  const boutique = designers.find((item) => item.id === id);
  const [postId, setPostId] = useState(posts.find((post) => post.boutiqueId === id)?.id ?? posts[0]?.id ?? '');
  const [notes, setNotes] = useState('');
  const [sent, setSent] = useState(false);

  if (!boutique) return <Navigate to="/boutiques" replace />;
  const boutiquePosts = posts.filter((post) => post.boutiqueId === boutique.id);

  function messageBoutique() {
    if (!boutique) return;
    const threadId = ensureThread(boutique.id);
    navigate(`/messages?thread=${threadId}`);
  }

  function submitRequest(event: FormEvent) {
    event.preventDefault();
    if (!boutique) return;
    createStitchingRequest({
      postId,
      boutiqueId: boutique.id,
      service: 'Custom stitching from inspiration',
      measurements: 'Use saved profile measurements',
      budget: boutique.priceRange,
      eventDate: new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10),
      notes: notes || `Use inspiration ${postId} as the design reference.`,
    });
    setSent(true);
  }

  return (
    <>
      <PageTitle title={boutique.name} subtitle="Boutique profile, services, gallery, reviews, map, contact, appointments, and stitching requests." />
      <Card className="mb-6 overflow-hidden">
        <div className="relative h-80">
          <img src={boutique.cover} alt={`${boutique.name} cover`} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4 text-white">
            <div>
              <h2 className="flex items-center gap-2 font-serif text-5xl">{boutique.name} {boutique.verified && <CheckCircle2 size={24} />}</h2>
              <p className="mt-2">{boutique.specialty}</p>
              <p className="mt-2 flex items-center gap-2 text-sm text-white/85"><MapPin size={16} /> {boutique.location} · {boutique.distanceKm} km away</p>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" onClick={messageBoutique}><MessageCircle size={16} /> Message</Button>
              <Link to={`/stitch/${postId}`}><Button><Scissors size={16} /> Get This Stitched</Button></Link>
            </div>
          </div>
        </div>
        <div className="grid gap-4 p-6 md:grid-cols-4">
          <Stat label="Rating" value={`${boutique.rating} / 5`} />
          <Stat label="Reviews" value={boutique.reviewCount.toString()} />
          <Stat label="Turnaround" value={boutique.turnaround} />
          <Stat label="Price" value={boutique.priceRange} />
        </div>
      </Card>
      <div className="grid gap-6 2xl:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-serif text-2xl">Services</h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {boutique.services.map((service) => <span key={service} className="rounded-full bg-champagne/15 px-4 py-2 text-sm font-semibold text-gold">{service}</span>)}
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="font-serif text-2xl">Collections</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {boutique.collections.map((collection) => (
                <article key={collection.id} className="overflow-hidden rounded-lg border border-line bg-white">
                  <img src={collection.image} alt={collection.title} className="h-48 w-full object-cover" />
                  <div className="p-4">
                    <h4 className="font-semibold">{collection.title}</h4>
                    <p className="mt-1 text-sm text-charcoal/70">{collection.description}</p>
                    <p className="mt-3 text-sm font-semibold text-gold">From Rs {collection.priceFrom.toLocaleString('en-IN')}</p>
                  </div>
                </article>
              ))}
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="font-serif text-2xl">Gallery</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {boutique.portfolio.map((image) => <img key={image} src={image} alt="Boutique portfolio" className="h-48 rounded-lg object-cover" />)}
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="font-serif text-2xl">Reviews</h3>
            <div className="mt-4 space-y-4">
              {boutique.reviews.map((review) => (
                <article key={review.id} className="rounded-lg border border-line bg-white p-4">
                  <div className="flex items-center justify-between"><strong>{review.author}</strong><span className="flex items-center gap-1 text-gold"><Star size={15} fill="currentColor" /> {review.rating}</span></div>
                  <p className="mt-2 text-sm text-charcoal/70">{review.body}</p>
                </article>
              ))}
            </div>
          </Card>
          {boutiquePosts.length > 0 && (
            <section>
              <h3 className="mb-4 font-serif text-2xl">Inspirations from {boutique.name}</h3>
              <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
                {boutiquePosts.map((post) => <PostCard key={post.id} post={post} dense />)}
              </div>
            </section>
          )}
        </div>
        <aside className="space-y-5">
          <Card className="p-5">
            <h3 className="font-serif text-2xl">Contact</h3>
            <div className="mt-4 space-y-3 text-sm text-charcoal/75">
              <p className="flex items-center gap-2"><Phone size={16} /> {boutique.phone}</p>
              <p className="flex items-center gap-2"><Mail size={16} /> {boutique.email}</p>
              <p className="flex items-center gap-2"><MapPin size={16} /> {boutique.location}</p>
            </div>
          </Card>
          <Card className="p-5">
            <h3 className="font-serif text-2xl">Book Appointment</h3>
            <div className="mt-4"><BookingForm boutique={boutique} /></div>
          </Card>
          <Card className="p-5">
            <h3 className="font-serif text-2xl">Request Stitching</h3>
            <form onSubmit={submitRequest} className="mt-4 space-y-4">
              <select value={postId} onChange={(event) => setPostId(event.target.value)} className="h-11 w-full rounded-lg border border-line bg-white px-3">
                {posts.map((post) => <option key={post.id} value={post.id}>{post.title}</option>)}
              </select>
              <textarea value={notes} onChange={(event) => setNotes(event.target.value)} rows={3} className="w-full rounded-lg border border-line px-3 py-2" placeholder="Describe sleeve, fabric, budget, or event date." />
              <Button type="submit" className="w-full">{sent ? 'Request Sent' : 'Send Request'}</Button>
            </form>
          </Card>
          <Card className="overflow-hidden p-5">
            <h3 className="font-serif text-2xl">Map</h3>
            <div className="relative mt-4 h-52 overflow-hidden rounded-lg border border-line bg-ivory">
              <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#eadfca 1px, transparent 1px), linear-gradient(90deg, #eadfca 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
              <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold text-white"><MapPin /></div>
            </div>
          </Card>
        </aside>
      </div>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return <div className="rounded-lg border border-line bg-ivory p-4 text-center"><p className="font-serif text-2xl">{value}</p><p className="text-xs uppercase text-charcoal/55">{label}</p></div>;
}
