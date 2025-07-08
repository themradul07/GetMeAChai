'use client';
import Head from 'next/head';
import React, { useEffect } from 'react';

const AboutPage = () => {
  useEffect(() => {
    document.title = "About - Get Me A Chai";
  }, []);

  return (
    <>
      <div className="max-w-3xl mx-auto mt-20 px-4 py-8 text-gray-800 dark:text-gray-200 text-justify">
        <h1 className="text-3xl font-bold mb-4 text-center">About Get Me A Chai ☕</h1>

        <p className="mb-4 text-lg">
          <strong>Get Me A Chai</strong> is a simple, heartfelt platform built for creators, developers, and anyone who wants to raise funds in an easy and transparent way. Whether you&apos;re working on a passion project, building open-source tools, or just need support, this platform helps you connect with people who believe in what you&apos;re doing.
        </p>

        <p className="mb-4">
          Inspired by the phrase &quot;Buy me a coffee&quot;, we chose chai because it&apos;s something that connects deeply with our culture. A small donation — the cost of a cup of chai — can go a long way in showing appreciation and supporting someone&apos;s journey.
        </p>

        <p className="mb-4">
          We keep things minimal, fast, and personal. Just share your profile, receive funds directly, and keep doing what you love. No middlemen. No complications.
        </p>

        <p className="mb-6">
          Thank you for being part of this community. If you&apos;d like to contribute or have suggestions, feel free to reach out. Together, let&apos;s empower more creators — one chai at a time. ☕❤️
        </p>

        <div className="text-sm text-gray-500 dark:text-gray-400">
          Made with 💖 by the Get Me A Chai team
        </div>
      </div>
    </>
  );
};

export default AboutPage;
