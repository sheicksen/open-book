"use client";

import { useState } from "react";


export function PostTile({ post }) {
  const [liked, setLiked] = useState(false);
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
      {post.image && (
        <div className={`h-32 bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center`}>
          <img src={post.image}></img>
        </div>
      )}
      <div className="p-4 flex flex-col flex-1 gap-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-gray-900 leading-snug">{post.title}</h3>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex-none ${post.tagColor}`}>{post.tag}</span>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{post.body}</p>
        <div className="flex items-center gap-4 mt-auto pt-2 border-t border-gray-100">
          <button
            onClick={() => setLiked(!liked)}
            className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${liked ? "text-teal-600" : "text-gray-400 hover:text-teal-500"}`}
          >
            <svg className="w-4 h-4" fill={liked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {post.likes + (liked ? 1 : 0)}
          </button>
          <button className="flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {post.comments}
          </button>
          <span className="ml-auto text-xs text-gray-400">{post.time}</span>
        </div>
      </div>
    </div>
  );
}