import { FormEvent, useState } from 'react';
import { Info, Phone, Send, Video } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { PageTitle } from '../components/common/PageTitle';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useLuhStore } from '../store/useLuhStore';
import { nowLabel } from '../lib/utils';

export function Messages() {
  const { threads, designers, profile, sendMessage } = useLuhStore();
  const [params] = useSearchParams();
  const [activeId, setActiveId] = useState(params.get('thread') ?? threads[0]?.id ?? '');
  const [body, setBody] = useState('');
  const active = threads.find((thread) => thread.id === activeId) ?? threads[0];
  const designer = designers.find((item) => item.id === active?.participantId);

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!active || !body.trim()) return;
    sendMessage(active.id, body.trim());
    setBody('');
  }

  return (
    <>
      <PageTitle title="Messages" subtitle="Chat with boutiques and designers without leaving your inspiration workflow." />
      <div className="grid h-[calc(100vh-190px)] min-h-[620px] gap-5 xl:grid-cols-[360px_1fr_320px]">
        <Card className="overflow-hidden">
          <div className="border-b border-line p-4">
            <input className="h-11 w-full rounded-full border border-line px-4 text-sm" placeholder="Search conversations..." />
          </div>
          <div className="gold-scroll h-full overflow-auto p-3">
            {threads.map((thread) => {
              const participant = designers.find((item) => item.id === thread.participantId)!;
              const last = thread.messages[thread.messages.length - 1];
              return (
                <button key={thread.id} onClick={() => setActiveId(thread.id)} className={`mb-2 flex w-full items-center gap-3 rounded-lg p-3 text-left ${active?.id === thread.id ? 'bg-champagne/15' : 'hover:bg-champagne/10'}`}>
                  <img src={participant.avatar} alt={participant.name} className="h-12 w-12 rounded-full object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">{participant.name}</p>
                    <p className="truncate text-sm text-charcoal/65">{last?.body}</p>
                  </div>
                  {thread.unread > 0 && <span className="rounded-full bg-gold px-2 py-0.5 text-xs text-white">{thread.unread}</span>}
                </button>
              );
            })}
          </div>
        </Card>
        <Card className="flex min-h-0 flex-col overflow-hidden">
          {designer && active && (
            <>
              <div className="flex items-center justify-between border-b border-line p-4">
                <div className="flex items-center gap-3">
                  <img src={designer.avatar} alt={designer.name} className="h-12 w-12 rounded-full object-cover" />
                  <div><h3 className="font-semibold">{designer.name}</h3><p className="text-sm text-gold">Active now</p></div>
                </div>
                <div className="flex gap-2"><Button variant="ghost" className="h-10 w-10 px-0"><Phone size={18} /></Button><Button variant="ghost" className="h-10 w-10 px-0"><Video size={18} /></Button><Button variant="ghost" className="h-10 w-10 px-0"><Info size={18} /></Button></div>
              </div>
              <div className="gold-scroll flex-1 space-y-4 overflow-auto p-5">
                {active.messages.map((message) => {
                  const mine = message.senderId === profile.id;
                  return (
                    <div key={message.id} className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] rounded-lg px-4 py-3 shadow-sm ${mine ? 'bg-gold text-white' : 'bg-white text-ink'}`}>
                        <p className="text-sm">{message.body}</p>
                        {message.attachments && <div className="mt-3 grid grid-cols-2 gap-2">{message.attachments.map((src) => <img key={src} src={src} alt="Shared media" className="h-24 rounded-md object-cover" />)}</div>}
                        <p className={`mt-2 text-right text-xs ${mine ? 'text-white/75' : 'text-charcoal/55'}`}>{nowLabel(message.createdAt)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <form onSubmit={submit} className="flex gap-3 border-t border-line p-4">
                <input value={body} onChange={(event) => setBody(event.target.value)} placeholder="Type a message..." className="h-11 min-w-0 flex-1 rounded-full border border-line px-4 text-sm" />
                <Button type="submit"><Send size={16} /> Send</Button>
              </form>
            </>
          )}
        </Card>
        {designer && <Card className="p-5"><img src={designer.avatar} alt={designer.name} className="mx-auto h-24 w-24 rounded-full object-cover ring-2 ring-champagne" /><h3 className="mt-3 text-center font-serif text-2xl">{designer.name}</h3><p className="text-center text-sm text-charcoal/65">{designer.location}</p><p className="mt-4 text-sm text-charcoal/75">{designer.specialty}</p><div className="mt-4 grid grid-cols-3 gap-2">{designer.portfolio.map((src) => <img key={src} src={src} alt="" className="h-24 rounded-md object-cover" />)}</div><Button className="mt-5 w-full" variant="outline">View Profile</Button></Card>}
      </div>
    </>
  );
}
