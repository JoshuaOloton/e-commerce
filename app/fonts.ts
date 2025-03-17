import {
  Jost,
  Merriweather,
  Merriweather_Sans,
  Space_Grotesk,
  Bowlby_One_SC
} from "next/font/google";

export const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

export const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const merriweatherSans = Merriweather_Sans({
  variable: "--font-merriweather-sans",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const bowlbyOneSC = Bowlby_One_SC({
  variable: "--font-bowlby-one-sc",
  subsets: ["latin"],
  weight: ["400"],
});
