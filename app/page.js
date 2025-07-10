'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-[85vh] w-full bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-white text-center gap-10 px-4 py-32 sm:py-20">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl">Get Me A Chai</h1>
          <div className="w-16 sm:w-20 relative">
            <Image
              src="/tea.gif"
              alt="tea gif"
              width={80}
              height={80}
              className="relative top-[-6px] w-full"
            />
          </div>
        </div>
        <p className="text-sm sm:text-base max-w-md">
          A crowdfunding platform for creators. Get funded by fans and followers. Start now!
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href={"/Explore"}>
          
          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Explore Us
          </button>
          </Link>
          <Link href="/About">
            <button
              type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Read More
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-slate-800 w-full h-1"></div>

      {/* Feature Section */}
      <div className="text-white flex flex-col gap-10 px-6 py-10 items-center text-center">
        <h2 className="text-2xl sm:text-3xl font-bold">Your Fans can buy you a Chai</h2>

        <div className="flex flex-col md:flex-row gap-10 justify-center items-center w-full max-w-6xl">
          {[
            { img: '/fund3.gif', title: 'Fund Yourself', desc: 'Raise money easily and securely.' },
            { img: '/fund1.gif', title: 'Transfer Anywhere', desc: 'Receive funds globally with ease.' },
            { img: '/fund6.gif', title: 'Transfer Anytime', desc: 'No delays. Get paid instantly.' },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-3 w-full md:w-1/3">
              <div className="bg-white w-24 h-24 rounded-full overflow-hidden">
                <Image
                  src={item.img}
                  alt={item.title}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-lg font-bold">{item.title}</div>
              <div className="text-sm text-gray-300">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-800 w-full h-1 mt-8"></div>

      {/* Learn More Section */}
      <div className="text-white flex flex-col gap-10 px-6 py-10 items-center text-center">
        <h2 className="text-2xl sm:text-3xl font-bold">Learn more about Us</h2>

        <div className="w-full max-w-3xl aspect-video">
          <iframe
            className="w-full h-full rounded-lg"
            src="https://www.youtube.com/embed/NL1KZkS_xVU?si=Dt990cz0kKXjIFS8"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div className="bg-slate-800 w-full h-1 mb-4"></div>
    </div>
  );
}
