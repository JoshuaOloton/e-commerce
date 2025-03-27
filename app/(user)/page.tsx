'use client';

import Categories from "@/components/Categories";
import Hero from "@/components/Hero";
import { useRef } from 'react';

export default function Home() {

  const categoriesRef = useRef<HTMLDivElement>(null);

  const scrollToSection = () => {
    categoriesRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  return (
    <div>
      <Hero scrollToSection={scrollToSection} />
      <Categories sectionRef={categoriesRef} />
    </div>
  );
}
