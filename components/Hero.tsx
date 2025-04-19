"use client";

import { merriweather } from "@/app/fonts";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

const Hero = ({ scrollToSection }: { scrollToSection: () => void }) => {
  return (
    <section
      className={`${merriweather.className} w-full h-[calc(100vh-3.5rem)] flex items-center`}
    >
      <div className="relative w-full h-full flex items-center before:w-full before:h-full before:absolute before:inset-0 before:bg-[url(/assets/images/hero.png)] before:bg-cover before:bg-center before:bg-no-repeat before:-z-10 before:opacity-40">
        <div className="w-4/5 max-w-4xl mx-auto">
          <motion.h4 
            className="font-bold text-3xl md:text-4xl lg:text-5xl my-3"
            initial={{ opacity: 0, x: '-100%', scale: 0 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            Your Multilingual Marketplace Awaits
          </motion.h4>
          <p className="text-lg">Shop smarter, offer better — no language barrier.</p>
          <Button
            className="my-6 py-5 text-base md:text-lg cursor-pointer"
            onClick={scrollToSection}
          >
            Explore our Collection
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
