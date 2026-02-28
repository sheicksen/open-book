"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const COMMUNITIES = [
  {
    id: 1,
    name: "Programming",
    members: "12.4k",
    posts: 340,
    description: "Collaborate on open source projects, share repos, and find contributors for your work.",
    gradient: "from-indigo-500 to-violet-600",
    icon: "⚙️",
    tags: ["Code", "Git", "OSS"],
  },
  {
    id: 2,
    name: "Guitar",
    members: "9.1k",
    posts: 218,
    description: "Welcome to all styles of playing. Start fromm the beginning, and learn to play like your idols.",
    gradient: "from-sky-500 to-blue-600",
    icon: "🌐",
    tags: ["Music", "Strings"],
  },
  {
    id: 3,
    name: "Design",
    members: "6.7k",
    posts: 175,
    description: "UI/UX, motion design, brand identity. A space for creators who care about craft.",
    gradient: "from-pink-500 to-rose-600",
    icon: "✦",
    tags: ["UI/UX", "Figma", "Motion"],
  },
  {
    id: 4,
    name: "Wood Working",
    members: "8.2k",
    posts: 290,
    description: "We enjoy shaping wood. Join us and build that thing you've been wanting for your house.",
    gradient: "from-emerald-500 to-teal-600",
    icon: "◈",
    tags: ["Hand tools", "Power tools", "Artisan Crafts"],
  },
  {
    id: 5,
    name: "Game Development",
    members: "4.3k",
    posts: 132,
    description: "We enjoy playing games, but we also want to make games. Join us in making visions come true.",
    gradient: "from-orange-500 to-amber-600",
    icon: "▲",
    tags: ["Gaming", "Godot", "UE5", "Unity"],
  },
  {
    id: 6,
    name: "Career & Growth",
    members: "7.8k",
    posts: 410,
    description: "Job hunting, interviews, mentorship. Build your career with people who've been there.",
    gradient: "from-violet-500 to-purple-700",
    icon: "◎",
    tags: ["Jobs", "Mentorship", "Growth"],
  },
];

const FEATURES = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Real Communities",
    body: "Join thousands of developers, designers, and makers in focused topic communities — not an endless feed.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "Share Your Work",
    body: "Post projects, write tutorials, and get genuine feedback from people who understand what you're building.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Track Progress",
    body: "Set goals, log contributions, and watch your skills grow with visual dashboards that keep you accountable.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    title: "Discover Projects",
    body: "Find open source projects looking for contributors, or post your own and build a team around your idea.",
  },
];

function useScrollReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function RevealSection({ children, delay = 0, className = "" }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function HomePage() {


  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Serif+Display:ital@0;1&display=swap');
        .font-display { font-family: 'DM Serif Display', serif; }
        .font-body { font-family: 'Sora', sans-serif; }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .anim-fade-up { animation: fadeUp 0.7s ease forwards; opacity: 0; }
        .anim-float   { animation: float 5s ease-in-out infinite; }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-500 { animation-delay: 500ms; }
        .delay-700 { animation-delay: 700ms; }
        .delay-900 { animation-delay: 900ms; }
        .hero-mesh {
          background:
            radial-gradient(ellipse 60% 50% at var(--mx) var(--my), rgba(99,102,241,0.35) 0%, transparent 70%),
            radial-gradient(ellipse 50% 60% at 80% 20%, rgba(168,85,247,0.25) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 20% 80%, rgba(236,72,153,0.2) 0%, transparent 60%),
            linear-gradient(135deg, #0f0c29 0%, #1a1040 40%, #24243e 100%);
        }
      `}</style>

      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden font-body">
        {/* Wordmark */}
        <h1 className="anim-fade-up delay-200 font-display text-7xl sm:text-8xl md:text-9xl leading-none tracking-tight bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent mb-4">
          Open<span className="italic text-teal-600">Book</span>
        </h1>

        {/* Slogan */}
        <p className="anim-fade-up delay-300 text-white/60 text-lg sm:text-xl font-light max-w-md leading-relaxed mb-10">
          Where builders share, connect, and grow — together, in the open.
        </p>

        {/* CTA Buttons */}
        <div className="anim-fade-up delay-500 flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/signup"
            className="group flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:bg-teal-600 text-white font-semibold text-sm px-7 py-3 rounded-full shadow-lg shadow-indigo-900/40 transition-all duration-200 hover:shadow-indigo-700/50 hover:scale-105"
          >
            Create Account
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href="/login"
            className="flex items-center gap-2 bg-teal-700 hover:bg-teal-700 backdrop-blur-sm border border-white/20 text-white font-semibold text-sm px-7 py-3 rounded-full transition-all duration-200 hover:scale-105"
          >
            Sign In
          </Link>
        </div>

        {/* Scroll cue */}
        <div className="anim-fade-up delay-900 absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-teal-600 text-xs">
          <span>Scroll to explore</span>
          <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── INFO SECTION ── */}
      <section className="bg-white py-24 px-6 font-body">
        <div className="max-w-6xl mx-auto">
          <RevealSection className="text-center mb-16">
            <p className="text-teal-700 text-xs font-semibold uppercase tracking-widest mb-3">Why OpenBook?</p>
            <h2 className="font-display text-4xl sm:text-5xl text-gray-900 leading-tight">
              A platform built for<br />
              <span className="italic text-emerald-600">people who make things</span>
            </h2>
            <p className="text-gray-500 mt-5 max-w-xl mx-auto text-base leading-relaxed">
              OpenBook is space to learn, grow, and help others to craft the world you want to see.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f, i) => (
              <RevealSection key={f.title} delay={i * 80}>
                <div className="group p-6 rounded-2xl border border-gray-100 hover:border-teal-200 hover:shadow-lg hover:shadow-indigo-50 transition-all duration-300 h-full">
                  <div className="w-11 h-11 rounded-xl bg-teal-50 group-hover:bg-teal-100 text-teal-600 flex items-center justify-center mb-4 transition-colors">
                    {f.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm">{f.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{f.body}</p>
                </div>
              </RevealSection>
            ))}
          </div>

          {/* Divider callout */}
          <RevealSection delay={100} className="mt-20">
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-600 to-teal-700 p-10 text-center">
              <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "28px 28px" }} />
              <p className="font-display text-3xl sm:text-4xl text-white mb-3 relative">
                The best place to share what you&apos;re building.
              </p>
              <p className="text-teal-200 text-sm relative">— OpenBook community member</p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── COMMUNITIES ── */}
      <section className="bg-gray-50 py-24 px-6 font-body">
        <div className="max-w-6xl mx-auto">
          <RevealSection className="text-center mb-14">
            <p className="text-teal-600 text-xs font-semibold uppercase tracking-widest mb-3">Browse Communities</p>
            <h2 className="font-display text-4xl sm:text-5xl text-gray-900">
              Find your people
            </h2>
            <p className="text-gray-500 mt-4 max-w-md mx-auto text-sm leading-relaxed">
              Explore new hobbies, or start your own space!
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {COMMUNITIES.map((c, i) => (
              <RevealSection key={c.id} delay={i * 70}>
                <div className="card-shine group bg-white rounded-2xl border border-gray-200 hover:border-transparent hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer hover:-translate-y-1">
                  {/* Top bar */}
                  <div className={`h-1.5 w-full bg-gradient-to-r ${c.gradient}`} />
                  <div className="p-6">
                    {/* Icon + title */}
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${c.gradient} flex items-center justify-center text-xl shadow-sm`}>
                        {c.icon}
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold text-gray-800">{c.members}</p>
                        <p className="text-xs text-gray-400">members</p>
                      </div>
                    </div>

                    <h3 className="font-semibold text-gray-900 text-base mb-1">{c.name}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed mb-4">{c.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {c.tags.map((t) => (
                        <span key={t} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full font-medium">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className="text-xs text-gray-400">{c.posts} posts this week</span>
                      <button className={`text-xs font-semibold bg-gradient-to-r ${c.gradient} text-white px-4 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm`}>
                        Join →
                      </button>
                    </div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <section className="bg-white border-t border-gray-100 py-16 px-6 text-center font-body">
        <RevealSection>
          <h2 className="font-display text-3xl sm:text-4xl text-gray-900 mb-3">
            Ready to start making?
          </h2>
          <p className="text-gray-400 text-sm mb-8 max-w-sm mx-auto">Join the OpenBook community to start realizing your goals!</p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm px-8 py-3 rounded-full shadow-lg shadow-indigo-200 transition-all hover:scale-105"
          >
            Get started for free →
          </Link>
        </RevealSection>
      </section>
    </div>
  );
}


