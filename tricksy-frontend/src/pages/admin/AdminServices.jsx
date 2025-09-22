import { useState } from "react";
import {
  useGetServicesQuery,
  useAddServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} from "../../features/api/apiSlice";

export default function AdminServices() {
  const { data: services, isLoading } = useGetServicesQuery();
  const [addService] = useAddServiceMutation();
  const [updateService] = useUpdateServiceMutation();
  const [deleteService] = useDeleteServiceMutation();

  const [form, setForm] = useState({ name: "", description: "" });
  const [editingId, setEditingId] = useState(null);
    console.log(services);
    
  const handleSubmit = async (e) => {
    console.log(e);
    
    e.preventDefault();
    if (editingId) {
      await updateService({ id: editingId, ...form });
      setEditingId(null);
    } else {
      await addService(form);
    }
    setForm({ name: "", description: "" });
  };

  const handleEdit = (service) => {
    setForm({ name: service.name, description: service.description });
    setEditingId(service._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this service?")) {
      await deleteService(id);
    }
  };

  if (isLoading) return <p>Loading services...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Services</h2>

      {/* Add/Edit Form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <input
          type="text"
          placeholder="Service Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded w-full"
          required
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {editingId ? "Update Service" : "Add Service"}
        </button>
      </form>

      {/* Services List */}
      <div className="space-y-2">
        {services.map((s) => (
          <div key={s._id} className="flex justify-between items-center border p-2 rounded">
            <div>
              <h3 className="font-semibold">{s.name}</h3>
              <p className="text-gray-600">{s.description}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(s)}
                className="px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(s._id)}
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
