import { useGetUsersQuery, useMakeAdminMutation } from "../../features/auth/authApi";

export default function ManageUsers() {
  const { data: users, isLoading } = useGetUsersQuery();
  const [makeAdmin] = useMakeAdminMutation();

  if (isLoading) return <p>Loading users...</p>;

  const handleMakeAdmin = async (id) => {
    try {
      await makeAdmin(id).unwrap();
      alert("User promoted to Admin!");
    } catch (err) {
      console.error("Failed to promote:", err);
      alert("Error promoting user");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((u) => (
            <tr key={u._id} className="text-center">
              <td className="border p-2">{u.email}</td>
              <td className="border p-2">{u.roles.join(", ")}</td>
              <td className="border p-2">
                {u.roles.includes("admin") ? (
                  <span className="text-green-600 font-semibold">Admin</span>
                ) : (
                  <button
                    onClick={() => handleMakeAdmin(u._id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Make Admin
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
