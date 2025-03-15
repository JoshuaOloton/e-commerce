'use client';

import Categories from "@/components/Categories";
import Hero from "@/components/Hero";
import { useRef } from 'react';
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  console.log(session);
  console.log(status);

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
