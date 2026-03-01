import Link from "next/link";
import { PostTile } from "../../components/posttile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

const USER = {
  name: "John Doe",
  username: "john_doe",
  bio: "Full-stack developer. Open source contributor. Building things in public.",
  avatarColor: "from-slate-500 to-slate-600",
  initials: "JD",
  posts: 38,
  followers: 412,
  following: 198,
  achievements: [
    { icon: "⚙️", label: "10 projects", sub: "shipped" },
    { icon: "✦",  label: "4 new hobbies", sub: "explored" },
    { icon: "📖", label: "5 tutorials", sub: "posted" },
  ],
  communities: [
    { name: "Open Source", gradient: "from-teal-500 to-violet-600", icon: "⚙️" },
    { name: "Web Dev",     gradient: "from-sky-500 to-blue-600",      icon: "🌐" },
    { name: "DevOps",      gradient: "from-orange-500 to-amber-600",  icon: "▲" },
    { name: "Design",      gradient: "from-pink-500 to-rose-600",     icon: "✦" },
  ],
};

const POSTS = [
  {
    id: 1,
    time: "2h ago",
    title: "Shipped: my open source CLI tool",
    body: "After two months of weekends I finally published my Rust CLI tool for managing dotfiles. Here's what I learned and what's next.",
    image: true,
    imageBg: "from-teal-400 to-violet-600",
    tag: "Project",
    tagColor: "bg-teal-100 text-teal-700",
    likes: 74,
    comments: 18,
  },
  {
    id: 2,
    time: "3 days ago",
    title: "Why I switched from Webpack to Vite",
    body: "Build times went from 45s to under 2s. Here's a practical migration guide and the gotchas I ran into along the way.",
    image: null,
    tag: "Tutorial",
    tagColor: "bg-teal-100 text-teal-700",
    likes: 130,
    comments: 29,
  },
  {
    id: 3,
    time: "1 week ago",
    title: "My Docker + GitHub Actions setup",
    body: "A minimal CI/CD pipeline that builds, tests, and deploys a containerized Next.js app on every push to main.",
    image: true,
    imageBg: "from-orange-400 to-amber-500",
    tag: "Project",
    tagColor: "bg-amber-100 text-amber-700",
    likes: 55,
    comments: 12,
  },
  {
    id: 4,
    time: "2 weeks ago",
    title: "TIL: CSS @layer changes everything",
    body: "Cascade layers let you control specificity without hacks. I refactored our entire design system around this and it's so much cleaner.",
    image: null,
    tag: "Post",
    tagColor: "bg-pink-100 text-pink-700",
    likes: 92,
    comments: 21,
  },
  {
    id: 5,
    time: "3 weeks ago",
    title: "Getting started with Rust — a JS dev's take",
    body: "Coming from TypeScript, Rust felt alien at first. Here's the mental model shift that finally made the borrow checker click for me.",
    image: true,
    imageBg: "from-rose-400 to-pink-600",
    tag: "Tutorial",
    tagColor: "bg-rose-100 text-rose-700",
    likes: 211,
    comments: 47,
  },
  {
    id: 6,
    time: "1 month ago",
    title: "Reflections on my first year of open source",
    body: "12 months, 9 repos, 3 meaningful collaborations. What I'd tell myself at the start and what actually moved the needle.",
    image: null,
    tag: "Post",
    tagColor: "bg-violet-100 text-violet-700",
    likes: 168,
    comments: 33,
  },
];


export default async function ProfilePage({name}) {
  const [session, profileUser] = await Promise.all([
    getServerSession(authOptions),
    prisma.user.findUnique({
      where: { OR:[{ username: name}, {username: "Bob"}]},
      include: {
        posts: { orderBy: { createdAt: "desc" } },
        communities: { include: { community: true } },
        _count: { select: { followers: true, following: true } },
      },
    }),
  ]);
  if (!profileUser) notFound();
  const isOwnProfile = session?.user.id === profileUser.id;
  return (
    <div className="min-h-screen bg-gray-100">

      {/* ── HEADER CARD ── */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row items-start gap-6">

            {/* Avatar */}
            <div className="relative flex-none">
              <div className={`w-28 h-28 rounded-full bg-gradient-to-br from-slate-500 to-slate-600 flex items-center justify-center shadow-md`}>
                <span className="text-white font-bold text-3xl">{profileUser.name[0]}</span>
              </div>
            </div>

            {/* Name + stats */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{profileUser.name}</h1>
                  <p className="text-sm text-gray-400 font-medium">@{profileUser.username}</p>

                  {/* Stats row */}
                  <div className="flex items-center gap-5 mt-4">
                    {[
                      ["Posts", profileUser.posts.length],
                      ["Followers", profileUser.followers],
                      ["Following", profileUser.following],
                    ].map(([label, val]) => (
                      <button key={label} className="text-center group">
                        <p className="text-base font-bold text-gray-900 group-hover:text-teal-600 transition-colors">{val}</p>
                        <p className="text-xs text-gray-400">{label}</p>
                      </button>
                    ))}
                  </div>
                </div>

                Action buttons
                <div className="flex items-center gap-2">
                  <button className="bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors shadow-sm">
                    Follow
                  </button>
                  <button className="border border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-800 text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                    Message
                  </button>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="flex-none bg-gray-50 rounded-2xl border border-gray-200 p-5 min-w-48">
              <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Achievements</p>
              <div className="space-y-2.5">
                {USER.achievements.map((a) => (
                  <div key={a.label} className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-white border border-gray-200 shadow-sm flex items-center justify-center text-sm">
                      {a.icon}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-800">{a.label}</p>
                      <p className="text-xs text-gray-400">{a.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col lg:flex-row gap-6 items-start">

        {/* Communities sidebar */}
        <aside className="w-full lg:w-64 flex-none">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
            <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-4">
              {profileUser.name}&apost;s Communities
            </p>
            <div className="space-y-2">
              {profileUser.communities.map((c) => (
                <Link
                  key={c.name}
                  href={`/communities/${c.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors group"
                >
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${c.gradient} flex items-center justify-center text-sm shadow-sm`}>
                    {c.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-teal-600 transition-colors">{c.name}</span>
                  <svg className="w-3.5 h-3.5 text-gray-300 group-hover:text-teal-400 ml-auto transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
            {isOwnProfile && 
              <button className="w-full mt-3 text-xs text-teal-500 hover:text-teal-700 font-medium py-2 border border-dashed border-teal-200 rounded-xl hover:border-teal-400 transition-colors">
              + Join a community
              </button>
            }
          </div>
        </aside>

        {/* Posts grid */}
        <section className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm font-semibold text-gray-700 capitalize">{activeTab}</p>
            <span className="text-xs text-gray-400">{profileUser.posts.length} total</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {POSTS.map((post) => (
              <PostTile key={post.id} post={post} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
