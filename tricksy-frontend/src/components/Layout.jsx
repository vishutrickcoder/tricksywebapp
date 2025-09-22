// import React from "react";
// import Header from "./Header";
// import Footer from "./Footer";

// export default function Layout({ children }) {
//   return (
//     <div className="flex flex-col min-h-screen">
//       <Header />
//       <main className="flex-1 pt-20">{children}</main>
//       <Footer />
//     </div>
//   );
// }

import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const NO_LAYOUT_PATHS = ["/login", "/signup", "/verify-otp"];

export default function Layout({ children }) {
  const location = useLocation();
  const hideLayout = NO_LAYOUT_PATHS.includes(location.pathname);

  if (hideLayout) return <>{children}</>; // Render only children for login/signup/otp

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
    </div>
  );
}
