"use client";
import Index from './LandingPage/index'
import TopSpecialities from './LandingPage/TopSpecialities';
import FeaturedDocs from './LandingPage/FeaturedDocs';
import WhyChooseUs from './LandingPage/whyChooseUs';
import ChooseUsSection from './LandingPage/chooseUsSection';
import FAQs from './LandingPage/FAQs';
import Download from './LandingPage/Download';
import Blogs from './LandingPage/blogs';
import Footer from './LandingPage/footer';
import MedicalSpecialtiesCards from './LandingPage/new';
import ScrollingCarousel from './LandingPage/scrolling';
import Header from './LandingPage/header';

import React, { useState } from 'react';

export default function Home() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <Header
        showSearch={showSearch}
        setShowSearch={setShowSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
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
