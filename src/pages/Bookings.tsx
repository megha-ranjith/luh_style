import { Link } from 'react-router-dom';
import { CalendarDays, Scissors } from 'lucide-react';
import { PageTitle } from '../components/common/PageTitle';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useLuhStore } from '../store/useLuhStore';

export function Bookings() {
  const { appointments, stitchingRequests, designers, posts } = useLuhStore();

  return (
    <>
      <PageTitle title="Bookings" subtitle="Appointments and stitching requests created from your discovery journey." action={<Link to="/stitching"><Button>Request Custom Design</Button></Link>} />
      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="p-6">
          <h3 className="flex items-center gap-2 font-serif text-2xl"><CalendarDays className="text-gold" /> Appointments</h3>
          <div className="mt-5 space-y-4">
            {appointments.map((booking) => {
              const boutique = designers.find((item) => item.id === booking.boutiqueId);
              return (
                <article key={booking.id} className="rounded-lg border border-line bg-white p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div><h4 className="font-semibold">{boutique?.name}</h4><p className="text-sm text-charcoal/65">{booking.service} · {booking.date} at {booking.time}</p></div>
                    <Badge>{booking.status}</Badge>
                  </div>
                  <p className="mt-3 text-sm text-charcoal/70">{booking.notes || 'No extra notes added.'}</p>
                </article>
              );
            })}
            {!appointments.length && <p className="text-sm text-charcoal/65">No appointments yet.</p>}
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="flex items-center gap-2 font-serif text-2xl"><Scissors className="text-gold" /> Stitching Requests</h3>
          <div className="mt-5 space-y-4">
            {stitchingRequests.map((request) => {
              const boutique = designers.find((item) => item.id === request.boutiqueId);
              const post = posts.find((item) => item.id === request.postId);
              return (
                <article key={request.id} className="rounded-lg border border-line bg-white p-4">
                  <div className="flex gap-4">
                    {post && <img src={post.image} alt={post.title} className="h-24 w-20 rounded-md object-cover" />}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div><h4 className="font-semibold">{post?.title}</h4><p className="text-sm text-charcoal/65">{boutique?.name} · {request.budget}</p></div>
                        <Badge>{request.status}</Badge>
                      </div>
                      <p className="mt-2 text-sm text-charcoal/70">{request.notes}</p>
                    </div>
                  </div>
                </article>
              );
            })}
            {!stitchingRequests.length && <p className="text-sm text-charcoal/65">No stitching requests yet.</p>}
          </div>
        </Card>
      </div>
    </>
  );
}
