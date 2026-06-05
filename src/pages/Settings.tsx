import { FormEvent, useState } from 'react';
import { PageTitle } from '../components/common/PageTitle';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useLuhStore } from '../store/useLuhStore';

export function Settings() {
  const { profile, settings, updateProfile, updateSettings } = useLuhStore();
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [website, setWebsite] = useState(profile.website);

  function submit(event: FormEvent) {
    event.preventDefault();
    updateProfile({ name, email, website });
  }

  return (
    <>
      <PageTitle title="Settings" subtitle="Manage account, privacy, notifications, preferences, and brand controls." />
      <div className="grid gap-5 xl:grid-cols-2">
        <Card className="p-6">
          <h3 className="font-serif text-2xl">Account</h3>
          <form onSubmit={submit} className="mt-5 grid gap-4">
            <label className="text-sm font-semibold">Full name<input value={name} onChange={(event) => setName(event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-line px-4 font-normal" /></label>
            <label className="text-sm font-semibold">Email<input value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-line px-4 font-normal" /></label>
            <label className="text-sm font-semibold">Website<input value={website} onChange={(event) => setWebsite(event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-line px-4 font-normal" /></label>
            <Button type="submit" className="justify-self-start">Save Changes</Button>
          </form>
        </Card>
        <Card className="p-6">
          <h3 className="font-serif text-2xl">Privacy</h3>
          <SettingToggle label="Private profile" value={settings.privateProfile} onChange={(value) => updateSettings({ privateProfile: value })} />
          <SettingToggle label="Allow messages from boutiques" value={settings.allowMessages} onChange={(value) => updateSettings({ allowMessages: value })} />
        </Card>
        <Card className="p-6">
          <h3 className="font-serif text-2xl">Notifications</h3>
          <SettingToggle label="Push alerts" value={settings.pushAlerts} onChange={(value) => updateSettings({ pushAlerts: value })} />
          <SettingToggle label="Email alerts" value={settings.emailAlerts} onChange={(value) => updateSettings({ emailAlerts: value })} />
        </Card>
        <Card className="p-6">
          <h3 className="font-serif text-2xl">Brand Controls</h3>
          <p className="mt-3 text-sm text-charcoal/70">Keep Luh Style in ivory, champagne gold, and charcoal for a consistent premium boutique identity.</p>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {['Ivory', 'Champagne', 'Charcoal'].map((item) => <div key={item} className="rounded-lg border border-line bg-ivory p-4 text-center text-sm font-semibold">{item}</div>)}
          </div>
        </Card>
      </div>
    </>
  );
}

function SettingToggle({ label, value, onChange }: { label: string; value: boolean; onChange: (value: boolean) => void }) {
  return (
    <div className="mt-5 flex items-center justify-between rounded-lg border border-line bg-white p-4">
      <span className="font-medium">{label}</span>
      <button onClick={() => onChange(!value)} className={`h-7 w-12 rounded-full p-1 transition ${value ? 'bg-gold' : 'bg-line'}`} aria-pressed={value}>
        <span className={`block h-5 w-5 rounded-full bg-white transition ${value ? 'translate-x-5' : ''}`} />
      </button>
    </div>
  );
}
