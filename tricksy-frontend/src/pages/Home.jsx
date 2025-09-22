import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  const { accessToken, user } = useSelector((s) => s.auth);
  const navigate = useNavigate();

  function handleBookService(serviceName) {
    if (!accessToken) {
      navigate("/login");
    } else if (user?.roles?.includes("admin")) {
      navigate("/admin-dashboard");
    } else {
      alert(`Booking ${serviceName} for ${user.name}`);
    }
  }

  const services = [
    { name: "Cleaning", description: "Professional cleaning services." },
    { name: "Staffing", description: "Hire staff quickly and easily." },
    { name: "Caregiving", description: "Reliable caregiving services." },
  ];

  return (
    <>
      <Header />
      <main className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#5e65ec] to-[#4fc3ee] text-white py-20 px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to Tricksy{user ? `, ${user.name}` : ""}
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Simplifying service booking with trust and ease. Choose from Cleaning, Staffing, or Caregiving services today.
          </p>
          {!accessToken && (
            <button
              onClick={() => navigate("/login")}
              className="bg-white text-[#5e65ec] font-semibold px-6 py-3 rounded-lg shadow hover:scale-105 transition"
            >
              Login to Get Started
            </button>
          )}
        </section>

        {/* Services Section */}
        <section className="max-w-6xl mx-auto py-12 px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s) => (
              <div
                key={s.name}
                className="bg-white rounded-xl shadow-md p-6 text-center border hover:shadow-xl transition"
              >
                <h3 className="text-2xl font-semibold mb-2">{s.name}</h3>
                <p className="text-gray-600 mb-4">{s.description}</p>
                <button
                  onClick={() => handleBookService(s.name)}
                  className="bg-gradient-to-r from-[#5e65ec] to-[#4fc3ee] text-white px-6 py-2 rounded-lg shadow hover:scale-105 transition"
                >
                  {accessToken ? "Book Now" : "Login to Book"}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Featured / Recommendations Section */}
        {accessToken && !user?.roles?.includes("admin") && (
          <section className="bg-white py-12 px-6 mt-12 shadow-inner">
            <h2 className="text-3xl font-bold mb-8 text-center">Recommended for You</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s, idx) => (
                <div
                  key={`rec-${idx}`}
                  className="bg-gray-100 rounded-xl p-6 text-center hover:shadow-lg transition"
                >
                  <h3 className="text-xl font-semibold mb-2">{s.name}</h3>
                  <p className="text-gray-700 mb-4">{s.description}</p>
                  <button
                    onClick={() => handleBookService(s.name)}
                    className="bg-[#5e65ec] text-white px-4 py-2 rounded-lg hover:bg-[#4fc3ee] transition"
                  >
                    Book Now
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
