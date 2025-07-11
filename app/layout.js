import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SessionWrapper from "./components/SessionWrapper";
import { Toaster } from "sonner";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Get Me A Chai -A website to fund your project with chai",
  description: "This website is crowdfunding platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <link rel="icon" href="/favicon_io/favicon.ico" />
        
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
      
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased text-white`}>
        <div className="min-h-screen z-[-2] h-auto w-[100%] bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] ">
          <SessionWrapper>

            <Navbar />

            <div className="min-h-screen">

              {children}
            </div>
            <Footer />
          </SessionWrapper>
        </div>
         <Toaster />
      </body>
    </html>
  );
}
