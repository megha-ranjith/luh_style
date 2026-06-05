import { FormEvent, useState } from 'react';
import { Edit3, Share2 } from 'lucide-react';
import { PageTitle } from '../components/common/PageTitle';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { highlights } from '../data/mockData';
import { useLuhStore } from '../store/useLuhStore';
import { PostCard } from '../components/post/PostCard';

export function Profile() {
  const { profile, posts, savedPostIds, updateProfile } = useLuhStore();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(profile.name);
  const [bio, setBio] = useState(profile.bio);
  const gallery = posts.filter((post) => savedPostIds.includes(post.id)).slice(0, 6);

  function submit(event: FormEvent) {
    event.preventDefault();
    updateProfile({ name, bio });
    setEditing(false);
  }

  return (
    <>
      <PageTitle title="Profile" subtitle="Your public social presence, gallery, stats, and styling identity." />
      <Card className="mb-6 overflow-hidden">
        <img src={posts[0].image} alt="Profile cover" className="h-64 w-full object-cover" />
        <div className="-mt-14 flex flex-wrap items-end justify-between gap-4 p-6">
          <div className="flex items-end gap-4">
            <img src={profile.avatar} alt={profile.name} className="h-28 w-28 rounded-full object-cover ring-4 ring-pearl" />
            <div>
              <h2 className="font-serif text-4xl">{profile.name}</h2>
              <p className="text-sm text-charcoal/70">{profile.handle} · {profile.location}</p>
            </div>
          </div>
          <div className="flex gap-3"><Button variant="outline" onClick={() => setEditing((value) => !value)}><Edit3 size={16} /> Edit Profile</Button><Button><Share2 size={16} /> Share</Button></div>
        </div>
        <div className="grid gap-4 px-6 pb-6 md:grid-cols-[1fr_420px]">
          <div>
            <p className="text-charcoal/75">{profile.bio}</p>
            <div className="mt-5 flex flex-wrap gap-3">{highlights.map((item) => <div key={item.id} className="text-center"><img src={item.image} alt={item.title} className="h-16 w-16 rounded-full object-cover ring-2 ring-champagne" /><p className="mt-1 text-xs">{item.title}</p></div>)}</div>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {Object.entries(profile.stats).map(([key, value]) => <div key={key} className="rounded-lg border border-line bg-ivory p-4 text-center"><p className="font-serif text-2xl">{value}</p><p className="text-xs uppercase tracking-wide text-charcoal/55">{key}</p></div>)}
          </div>
        </div>
      </Card>
      {editing && <Card className="mb-6 p-5"><form onSubmit={submit} className="grid gap-4 md:grid-cols-2"><input value={name} onChange={(event) => setName(event.target.value)} className="rounded-lg border border-line px-4 py-3" /><textarea value={bio} onChange={(event) => setBio(event.target.value)} className="rounded-lg border border-line px-4 py-3 md:col-span-2" rows={3} /><Button type="submit">Save Changes</Button></form></Card>}
      <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">{gallery.map((post) => <PostCard key={post.id} post={post} dense />)}</div>
    </>
  );
}
