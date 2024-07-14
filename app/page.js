import Nav from "@/components/modules/common/Nav";
import Footer from "@/components/modules/footer/Footer";
import Home from "@/components/modules/home/Home";

export default function page() {
  return (
    <div>
      <div className="mt-4 mx-20">
        <Nav />
        <Home />
      </div>

      <Footer />
    </div>
  );
}
