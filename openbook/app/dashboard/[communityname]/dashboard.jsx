"use client";

import { PostTile } from "../../components/posttile"
import { useRef } from "react";
import Link from "next/link";

// --- Mock Data ---
const NEWS_ITEMS = [
  { id: 1, title: "Getting Started with Next.js 14", tag: "Tutorial", color: "from-slate-500 to-slate-600" },
  { id: 2, title: "Building REST APIs with Node", tag: "News", color: "from-blue-500 to-blue-700" },
  { id: 3, title: "Tailwind CSS Tips & Tricks", tag: "Tutorial", color: "from-teal-500 to-teal-700" },
  { id: 4, title: "Open Source Spotlight: shadcn/ui", tag: "News", color: "from-indigo-500 to-indigo-700" },
  { id: 5, title: "TypeScript for Beginners", tag: "Tutorial", color: "from-violet-500 to-violet-700" },
  { id: 6, title: "Community Hackathon Results", tag: "News", color: "from-rose-500 to-rose-700" },
];

const COMMUNITY_POSTS = [
  {
    id: 1,
    author: "alex_dev",
    avatar: "A",
    avatarColor: "bg-indigo-500",
    time: "2h ago",
    title: "My first open-source contribution!",
    body: "Just merged my first PR into a major open source project. Here's what I learned from the process and how you can get started too.",
    image: false,
    tag: "Post",
    tagColor: "bg-indigo-100 text-indigo-700",
    likes: 42,
    comments: 8,
  },
  {
    id: 2,
    author: "sarah_builds",
    avatar: "S",
    avatarColor: "bg-pink-500",
    time: "4h ago",
    title: "Deployed my portfolio — feedback welcome!",
    body: "Finally launched my new portfolio site using Next.js + Framer Motion. Would love some honest feedback from the community.",
    image: true,
    imageBg: "from-pink-400 to-rose-500",
    tag: "Project",
    tagColor: "bg-pink-100 text-pink-700",
    likes: 87,
    comments: 23,
  },
  {
    id: 3,
    author: "code_ninja",
    avatar: "C",
    avatarColor: "bg-teal-500",
    time: "6h ago",
    title: "TIL: CSS has a :has() selector",
    body: "The :has() pseudo-class is a game changer. You can now style parent elements based on their children — no JavaScript needed.",
    image: false,
    tag: "Post",
    tagColor: "bg-teal-100 text-teal-700",
    likes: 134,
    comments: 17,
  },
  {
    id: 4,
    author: "byte_wrangler",
    avatar: "B",
    avatarColor: "bg-amber-500",
    time: "Yesterday",
    title: "Built a CLI tool in Rust",
    body: "After a month of learning Rust I shipped a small CLI tool for managing dotfiles. Here's the repo and a quick demo.",
    image: true,
    imageBg: "from-amber-400 to-orange-500",
    tag: "Project",
    tagColor: "bg-amber-100 text-amber-700",
    likes: 61,
    comments: 11,
  },
  {
    id: 5,
    author: "mira_codes",
    avatar: "M",
    avatarColor: "bg-violet-500",
    time: "Yesterday",
    title: "How I study: Pomodoro + Obsidian",
    body: "Sharing my personal system for deep work sessions. Combining time-blocking with linked notes has doubled my retention.",
    image: false,
    tag: "Post",
    tagColor: "bg-violet-100 text-violet-700",
    likes: 29,
    comments: 6,
  },
  {
    id: 6,
    author: "juno_dev",
    avatar: "J",
    avatarColor: "bg-sky-500",
    time: "2 days ago",
    title: "Real-time chat with WebSockets",
    body: "Built a simple real-time chat app to learn WebSockets. It was way simpler than I expected. Full walkthrough inside.",
    image: true,
    imageBg: "from-sky-400 to-blue-600",
    tag: "Tutorial",
    tagColor: "bg-sky-100 text-sky-700",
    likes: 95,
    comments: 31,
  },
];

// --- Goal Progress Ring ---
function ProgressRing({ percent = 1 }) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const dash = (percent / 100) * circ;
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <svg width="130" height="130" viewBox="0 0 130 130">
        <circle cx="65" cy="65" r={r} fill="none" stroke="#e5e7eb" strokeWidth="12" />
        <circle
          cx="65" cy="65" r={r}
          fill="none"
          stroke="#2e735b"
          strokeWidth="12"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          transform="rotate(-90 65 65)"
        />
        <text x="65" y="70" textAnchor="middle" className="text-2xl font-bold" fill="#1f2937" fontSize="22" fontWeight="bold">
          {percent}%
        </text>
      </svg>
      <div className="text-center">
        <p className="text-sm font-semibold text-gray-700">Monthly Goal</p>
        <p className="text-xs text-gray-400"> / 20 tasks complete</p>
      </div>
      <div className="w-full space-y-1">
        {[["Contributions", 0], ["Posts", 0], ["Reviews", 0]].map(([label, val]) => (
          <div key={label} className="flex items-center gap-2">
            <span className="text-xs text-gray-500 w-20">{label}</span>
            <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${val}%` }} />
            </div>
            <span className="text-xs text-gray-400">{val}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- News Carousel ---
function NewsCarousel() {
  const ref = useRef(null);
  const scroll = (dir) => {
    if (ref.current) ref.current.scrollBy({ left: dir * 280, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Left Arrow */}
      <button
        onClick={() => scroll(-1)}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 bg-white border border-gray-200 shadow-md rounded-full w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition"
      >
        ‹
      </button>

      {/* Scrollable Track */}
      <div
        ref={ref}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {NEWS_ITEMS.map((item) => (
          <div
            key={item.id}
            className="flex-none w-64 h-44 rounded-xl overflow-hidden relative cursor-pointer group shadow-sm hover:shadow-md transition-shadow"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${item.color}`} />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <span className="text-xs font-semibold bg-white/20 text-white px-2 py-0.5 rounded-full backdrop-blur-sm">
                {item.tag}
              </span>
              <p className="mt-1.5 text-sm font-semibold text-white leading-snug">{item.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll(1)}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 bg-white border border-gray-200 shadow-md rounded-full w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition"
      >
        ›
      </button>
    </div>
  );
}

// --- Main Dashboard ---
export default function CommunityDashboard({content}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-lg font-bold text-gray-800">
          <span className="text-gray-400 font-normal">{content.name}</span> — News & Tutorials
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

        {/* Carousel Section */}
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Latest News & Tutorials</h2>
            <button className="text-xs text-indigo-500 hover:text-indigo-700 font-medium">View all →</button>
          </div>
          <NewsCarousel />
        </section>

        {/* Bottom Section: Goal Progress + Posts */}
        <div className="flex gap-6 items-start">

          {/* Goal Progress */}
          <aside className="w-64 flex-none bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">Goal Progress</h2>
            <ProgressRing percent={1} />
          </aside>

          {/* Community Posts */}
          <section className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Community Projects / Posts</h2>
              <Link href={`/createpost/${content.name}`} className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-3 py-1.5 rounded-lg transition-colors">
                + New Post
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {content.posts.map((post) => (
                <PostTile key={post.id} post={post} />
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
