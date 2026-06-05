import { Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { Discover } from './pages/Discover';
import { FeedPage } from './pages/FeedPage';
import { Boards } from './pages/Boards';
import { Designers } from './pages/Designers';
import { Messages } from './pages/Messages';
import { Notifications } from './pages/Notifications';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Discover />} />
        <Route path="/trending" element={<FeedPage mode="Trending" />} />
        <Route path="/following" element={<FeedPage mode="Following" />} />
        <Route path="/saved" element={<FeedPage mode="Saved" />} />
        <Route path="/boards" element={<Boards />} />
        <Route path="/reels" element={<FeedPage mode="Reels" />} />
        <Route path="/lookbook" element={<FeedPage mode="Lookbook" />} />
        <Route path="/designers" element={<Designers />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  );
}
