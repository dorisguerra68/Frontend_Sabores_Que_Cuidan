import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";

export default function RegisterLayout({ children }) {
  return (
    <>
      <Navbar />

      <main className="layout-container">
        {children}
      </main>

      <Footer />
    </>
  );
}