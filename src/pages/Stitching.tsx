import { FormEvent, useMemo, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { capableBoutiquesForPost } from '../api/mockApi';
import { BoutiqueCard } from '../components/boutique/BoutiqueCard';
import { PageTitle } from '../components/common/PageTitle';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useLuhStore } from '../store/useLuhStore';

export function Stitching({ generic = false }: { generic?: boolean }) {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { posts, designers, createStitchingRequest, ensureThread } = useLuhStore();
  const post = posts.find((item) => item.id === postId) ?? posts.find((item) => item.category === 'Kurtis') ?? posts[0];
  const [boutiqueId, setBoutiqueId] = useState('');
  const [service, setService] = useState('Custom stitching');
  const [budget, setBudget] = useState('Rs 4,000 - Rs 8,000');
  const [eventDate, setEventDate] = useState(new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10));
  const [measurements, setMeasurements] = useState('Use saved profile measurements');
  const [notes, setNotes] = useState('');
  const matches = useMemo(() => capableBoutiquesForPost(post, designers), [designers, post]);
  const selectedBoutiqueId = boutiqueId || matches[0]?.boutique.id || '';

  if (!post) return <Navigate to="/" replace />;

  function submit(event: FormEvent) {
    event.preventDefault();
    createStitchingRequest({
      postId: post.id,
      boutiqueId: selectedBoutiqueId,
      service,
      measurements,
      budget,
      eventDate,
      notes: notes || `Please recreate this inspiration with boutique guidance: ${post.title}.`,
    });
    ensureThread(selectedBoutiqueId);
    navigate('/bookings');
  }

  return (
    <div className="grid gap-6 2xl:grid-cols-[1fr_420px]">
      <div>
        <PageTitle
          title={generic ? 'Custom Stitching' : 'Get This Stitched'}
          subtitle="See a design, find a capable boutique, and convert the inspiration into a stitching request."
        />
        <Card className="mb-6 overflow-hidden">
          <div className="grid md:grid-cols-[360px_1fr]">
            <img src={post.image} alt={post.title} className="h-full min-h-96 w-full object-cover" />
            <div className="p-6">
              <p className="text-sm font-semibold text-gold">Inspiration reference</p>
              <h2 className="mt-2 font-serif text-4xl">{post.title}</h2>
              <p className="mt-3 text-charcoal/70">{post.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">{post.tags.map((tag) => <span key={tag} className="rounded-full bg-champagne/15 px-3 py-1 text-xs font-semibold text-gold">#{tag}</span>)}</div>
              <Link to={`/search?q=${encodeURIComponent(post.category)}`}><Button variant="outline" className="mt-6">Find similar inspiration</Button></Link>
            </div>
          </div>
        </Card>
        <h3 className="mb-4 font-serif text-2xl">Best boutiques for this design</h3>
        <div className="space-y-4">
          {matches.map(({ boutique, score }) => (
            <div key={boutique.id} className={selectedBoutiqueId === boutique.id ? 'rounded-lg ring-2 ring-gold' : ''}>
              <button onClick={() => setBoutiqueId(boutique.id)} className="mb-2 rounded-full bg-champagne/15 px-3 py-1 text-sm font-semibold text-gold">Match score {score}</button>
              <BoutiqueCard boutique={boutique} />
            </div>
          ))}
        </div>
      </div>
      <aside>
        <Card className="sticky top-24 p-6">
          <h3 className="font-serif text-2xl">Request Details</h3>
          <form onSubmit={submit} className="mt-5 space-y-4">
            <label className="block text-sm font-semibold">Boutique
              <select value={selectedBoutiqueId} onChange={(event) => setBoutiqueId(event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-line bg-white px-3 font-normal">
                {matches.map(({ boutique }) => <option key={boutique.id} value={boutique.id}>{boutique.name}</option>)}
              </select>
            </label>
            <label className="block text-sm font-semibold">Service<input value={service} onChange={(event) => setService(event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-line px-3 font-normal" /></label>
            <label className="block text-sm font-semibold">Budget<input value={budget} onChange={(event) => setBudget(event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-line px-3 font-normal" /></label>
            <label className="block text-sm font-semibold">Event date<input type="date" value={eventDate} onChange={(event) => setEventDate(event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-line px-3 font-normal" /></label>
            <label className="block text-sm font-semibold">Measurements<input value={measurements} onChange={(event) => setMeasurements(event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-line px-3 font-normal" /></label>
            <label className="block text-sm font-semibold">Notes<textarea value={notes} onChange={(event) => setNotes(event.target.value)} rows={4} className="mt-2 w-full rounded-lg border border-line px-3 py-2 font-normal" /></label>
            <Button type="submit" className="w-full">Send Stitching Request</Button>
          </form>
        </Card>
      </aside>
    </div>
  );
}
