import { useState } from "react";
import { useGetServicesQuery, useCreateBookingMutation } from "../features/api/apiSlice";

export default function BookingPage() {
  const { data: services, isLoading } = useGetServicesQuery();
  const [createBooking] = useCreateBookingMutation();
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", date: "", time: "", address: "", notes: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createBooking(form);
    alert("Booking created!");
    setForm({ name: "", email: "", phone: "", service: "", date: "", time: "", address: "", notes: "" });
  };

  if (isLoading) return <p>Loading services...</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-4 border rounded">
      <input placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
      <input placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
      <input placeholder="Phone" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} required />
      <select value={form.service} onChange={e => setForm({...form, service: e.target.value})} required>
        <option value="">Select Service</option>
        {services.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
      </select>
      <input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} required />
      <input type="time" value={form.time} onChange={e => setForm({...form, time: e.target.value})} />
      <input placeholder="Address" value={form.address} onChange={e => setForm({...form, address: e.target.value})} />
      <textarea placeholder="Notes" value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Book</button>
    </form>
  );
}
