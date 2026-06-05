import { Bell, Bookmark, Heart, MessageCircle, Send, UserPlus } from 'lucide-react';
import { PageTitle } from '../components/common/PageTitle';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useLuhStore } from '../store/useLuhStore';
import { nowLabel } from '../lib/utils';

const icons = { like: Heart, comment: MessageCircle, follow: UserPlus, save: Bookmark, order: Send, mention: Bell };

export function Notifications() {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useLuhStore();
  return (
    <>
      <PageTitle title="Notifications" subtitle="Track likes, comments, follows, saves, mentions, and boutique inquiries." action={<Button variant="outline" onClick={markAllNotificationsRead}>Mark all read</Button>} />
      <Card className="divide-y divide-line">
        {notifications.map((item) => {
          const Icon = icons[item.type];
          return (
            <button key={item.id} onClick={() => markNotificationRead(item.id)} className="flex w-full items-center gap-4 p-5 text-left hover:bg-champagne/10">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-champagne/15 text-gold"><Icon size={20} /></span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold">{item.title}</span>
                <span className="block text-sm text-charcoal/70">{item.body}</span>
              </span>
              <span className="text-sm text-charcoal/55">{nowLabel(item.createdAt)}</span>
              {!item.read && <span className="h-2.5 w-2.5 rounded-full bg-gold" />}
            </button>
          );
        })}
      </Card>
    </>
  );
}
