import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";

export default function PublicMarketingLayout({ children, mainClassName = "" }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      <main className={`flex-1 ${mainClassName}`}>{children}</main>
      <Footer />
    </div>
  );
}
