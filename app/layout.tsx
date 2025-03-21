import type { Metadata } from "next";
import "./globals.css";
import { jost, merriweather, merriweatherSans, spaceGrotesk, bowlbyOneSC } from "./fonts";
import LayoutWrapper from "./LayoutWrapper";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jost.variable} ${merriweather.variable} ${merriweatherSans.variable} ${spaceGrotesk.variable} ${bowlbyOneSC.variable} antialiased`}
        suppressHydrationWarning
      >
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
