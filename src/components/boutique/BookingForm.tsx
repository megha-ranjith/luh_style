import { FormEvent, useState } from 'react';
import type { DesignerBoutique } from '../../types';
import { useLuhStore } from '../../store/useLuhStore';
import { Button } from '../ui/Button';

export function BookingForm({ boutique }: { boutique: DesignerBoutique }) {
  const createAppointment = useLuhStore((state) => state.createAppointment);
  const [service, setService] = useState(boutique.services[0] ?? 'Consultation');
  const [date, setDate] = useState(new Date(Date.now() + 2 * 86400000).toISOString().slice(0, 10));
  const [time, setTime] = useState('11:00');
  const [notes, setNotes] = useState('');
  const [saved, setSaved] = useState(false);

  function submit(event: FormEvent) {
    event.preventDefault();
    createAppointment({ boutiqueId: boutique.id, date, time, service, notes });
    setSaved(true);
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <label className="block text-sm font-semibold">Service
        <select value={service} onChange={(event) => setService(event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-line bg-white px-3 font-normal">
          {boutique.services.map((item) => <option key={item}>{item}</option>)}
        </select>
      </label>
      <div className="grid grid-cols-2 gap-3">
        <label className="block text-sm font-semibold">Date<input type="date" value={date} onChange={(event) => setDate(event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-line px-3 font-normal" /></label>
        <label className="block text-sm font-semibold">Time<input type="time" value={time} onChange={(event) => setTime(event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-line px-3 font-normal" /></label>
      </div>
      <label className="block text-sm font-semibold">Notes<textarea value={notes} onChange={(event) => setNotes(event.target.value)} rows={3} className="mt-2 w-full rounded-lg border border-line px-3 py-2 font-normal" placeholder="Share occasion, measurements, or fabric preference." /></label>
      <Button type="submit" className="w-full">{saved ? 'Appointment Requested' : 'Book Appointment'}</Button>
    </form>
  );
}
