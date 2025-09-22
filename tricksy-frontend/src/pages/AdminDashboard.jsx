export default function AdminDashboard() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#5e65ec] text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-4">
          <a href="/admin-dashboard" className="block hover:text-[#4fc3ee]">
            Dashboard
          </a>
          <a href="/admin-dashboard/services" className="block hover:text-[#4fc3ee]">
            Manage Services
          </a>
          <a href="/admin-dashboard/about" className="block hover:text-[#4fc3ee]">
            Manage About Us
          </a>
          <a href="/admin-dashboard/users" className="block hover:text-[#4fc3ee]">
            Users
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 bg-gray-50">
        <h1 className="text-3xl font-bold mb-4">Welcome Admin 👋</h1>
        <p className="text-gray-600">Here you can manage your website content and users.</p>
      </main>
    </div>
  );
}
