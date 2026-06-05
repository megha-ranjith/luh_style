import { FormEvent, useState } from 'react';
import { MoreHorizontal, Plus, Trash2 } from 'lucide-react';
import { PageTitle } from '../components/common/PageTitle';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useLuhStore } from '../store/useLuhStore';
import { PostCard } from '../components/post/PostCard';

export function Boards() {
  const { boards, posts, createBoard, deleteBoard } = useLuhStore();
  const [activeBoardId, setActiveBoardId] = useState(boards[0]?.id ?? '');
  const [name, setName] = useState('');
  const activeBoard = boards.find((board) => board.id === activeBoardId) ?? boards[0];
  const boardPosts = activeBoard ? posts.filter((post) => activeBoard.postIds.includes(post.id)) : [];

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!name.trim()) return;
    createBoard(name.trim());
    setName('');
  }

  return (
    <>
      <PageTitle title="Boards" subtitle="Create moodboards, pin inspirations, and organize your boutique workflow." />
      <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
        <div className="space-y-4">
          <Card className="p-5">
            <form onSubmit={submit} className="flex gap-2">
              <input value={name} onChange={(event) => setName(event.target.value)} placeholder="New board name" className="min-w-0 flex-1 rounded-full border border-line px-4 text-sm" />
              <Button type="submit"><Plus size={16} /> Create</Button>
            </form>
          </Card>
          {boards.map((board) => {
            const covers = posts.filter((post) => board.coverPostIds.includes(post.id)).slice(0, 3);
            return (
              <button key={board.id} onClick={() => setActiveBoardId(board.id)} className={`w-full rounded-lg border p-4 text-left transition ${activeBoard?.id === board.id ? 'border-gold bg-champagne/15' : 'border-line bg-white hover:bg-champagne/10'}`}>
                <div className="grid h-28 grid-cols-3 gap-1 overflow-hidden rounded-md">
                  {covers.length ? covers.map((post) => <img key={post.id} src={post.image} alt="" className="h-full w-full object-cover" />) : <div className="col-span-3 flex items-center justify-center bg-ivory text-gold"><Plus /></div>}
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{board.name}</h3>
                    <p className="text-sm text-charcoal/65">{board.postIds.length} pins</p>
                  </div>
                  <MoreHorizontal size={18} className="text-charcoal/50" />
                </div>
              </button>
            );
          })}
        </div>
        <section>
          {activeBoard && (
            <div className="mb-5 flex items-center justify-between rounded-lg border border-line bg-pearl p-5 shadow-soft">
              <div>
                <h3 className="font-serif text-3xl">{activeBoard.name}</h3>
                <p className="text-sm text-charcoal/70">{activeBoard.description}</p>
              </div>
              <Button variant="outline" onClick={() => deleteBoard(activeBoard.id)}><Trash2 size={16} /> Delete</Button>
            </div>
          )}
          {boardPosts.length ? <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">{boardPosts.map((post) => <PostCard key={post.id} post={post} dense />)}</div> : <Card className="p-12 text-center"><p className="font-serif text-2xl">Pin posts from Discover into this board.</p></Card>}
        </section>
      </div>
    </>
  );
}
