"use client";

import React, { useState, useEffect, useRef } from "react";
import { Community } from "../../types/community";

const ITEMS_PER_PAGE = 10;

export default function Communities() {
    const [query, setQuery] = useState("");
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
    const sentinelRef = useRef<HTMLDivElement>(null);

    var communities: Community[] = [
        {
            id: "1",
            name: "Tech Enthusiasts",
            description: "A community for people passionate about technology and innovation.",
            image: "",
            members: 1200
        },
        {
            id: "2",
            name: "Guitar Players",
            description: "A community for people passionate about playing guitar.",
            image: "",
            members: 50000
        }
    ];
    const filtered = communities.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
);
    const visible = filtered.slice(0, visibleCount);
    const hasMore = visibleCount < filtered.length;

    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
                }
            },
            { threshold: 1.0 }
        );

        observer.observe(sentinel);
        return () => observer.disconnect();
    }, [hasMore]);

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-12">
            <div className="max-w-2xl mx-auto">

                {/* Header */}
                <div className="mb-10 inline-block">
                    <h1 className="text-3xl font-bold text-teal-700 mb-1 tracking-tight">
                        Discover Communities
                    </h1>
                    <p className="text-gray-500 text-sm">Find your people and join the conversation.</p>
                </div>
                {/* Search Bar */}
                <div className="flex gap-2 mb-12">
                    <input
                        type="text"
                        placeholder="Find communities for your interests..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 placeholder-gray-400 shadow-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
                    />
                </div>

                <div className="float-right">
                <p className="text-gray-500 text-sm" >Cant find a community? <a href="/createCommunity" className="bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white text-sm font-semibold px-2 py-1 rounded-xl shadow-sm transition-colors">Create one</a></p>
                
                </div>
                {/* Recommended Section */}
                <div>
                    <h2 className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-4">
                        Recommended Communities
                    </h2>

                    <ul className="flex flex-col gap-4">
                        {visible.map((community) => (
                            <li
                                key={community.id}
                                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all p-5 cursor-pointer group"
                            >
                                {/* Avatar placeholder + name row */}
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                                        {community.name.charAt(0)}
                                    </div>
                                    <h3 className="text-base font-semibold text-teal-700 group-hover:text-emerald-600 transition-colors">
                                        {community.name}
                                    </h3>
                                </div>

                                <p className="text-sm text-gray-500 mb-3 leading-relaxed">
                                    {community.description}
                                </p>

                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-400">
                                        <span className="font-semibold text-teal-600">
                                            {community.members.toLocaleString()}
                                        </span>{" "}
                                        members
                                    </span>
                                    <span className="text-xs font-semibold text-emerald-500 group-hover:underline">
                                        Join →
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div ref={sentinelRef} className="h-1" />
                </div>
            </div>
        </div>
    );
}
