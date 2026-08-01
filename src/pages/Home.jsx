import Hero from "../components/home/Hero";
import ServicesSection from "../components/home/ServicesSection";
import WhyChooseUs from "../components/home/WhyChooseUs";
import ShopGallery from "../components/home/ShopGallery";
import CTASection from "../components/home/CTASection";
import ContactInfo from "../components/home/ContactInfo";
import GoogleMapSection from "../components/home/GoogleMapSection";
import "../styles/Home.css";

function Home() {
  return (
<>
  <Hero />
  <ServicesSection />
  <WhyChooseUs />
  <ShopGallery />
  <CTASection />
  <ContactInfo />
  <GoogleMapSection />
</>
  );
}

export default Home;