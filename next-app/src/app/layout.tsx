import type { Metadata } from "next";
import "./globals.css";
import HeaderComponent from "@/components/HeaderComponent";
import FooterComponent from "@/components/FooterComponent";
import MatomoInit from "@/components/MatomoInit";


export const metadata: Metadata = {
  title: "KIARVA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MatomoInit></MatomoInit>
        <HeaderComponent />
            {children}
        <FooterComponent />
      </body>
    </html>
  );
}
