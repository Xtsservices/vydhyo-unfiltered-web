"use client";
import Index from './components/index'
import TopSpecialities from './components/TopSpecialities';
import FeaturedDocs from './components/FeaturedDocs';
import WhyChooseUs from './components/whyChooseUs';
import ChooseUsSection from './components/chooseUsSection';
import FAQs from './components/FAQs';
import Download from './components/Download';
import Blogs from './components/blogs';
import Footer from './components/footer';
import MedicalSpecialtiesCards from './components/new';
import ScrollingCarousel from './components/scrolling';
import Header from './components/header';

export default function Home() {
  return (
    <>
      <Header />
      <Index />
      <TopSpecialities />
      <ScrollingCarousel/>
      <MedicalSpecialtiesCards />
      <FeaturedDocs />
      <WhyChooseUs />
      <ChooseUsSection />
      <FAQs />
      <Download />
      <Blogs />
      <Footer />
    </>
  );
}
