import React from "react";
import { useState } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";


export default function CreateCommunity() {
    let [form, setForm] = useState({name: "", description: ""})
    let [formError, setError] = useState("");
    const valid =
    form.name.length >= 3 &&
    form.description.length >= 5;

    const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = async () => {
        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({name: form.name, description: form.description }),
        });
        if (!res.ok){
            const { error } = await res.json();
            setError(error);
            return;
        }
        redirect("/dashboard");
    };
    return (
        <div className="min-h-screen bg-gray-50 px-4 py-12">
            <div className="max-w-2xl mx-auto">

                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-teal-700 mb-1 tracking-tight">
                        Create a Community
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Bring people together around a shared interest.
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                    <form className="flex flex-col gap-6">

                        {/* Community Name */}
                        <div className="flex flex-col gap-1.5">
                            <label
                                htmlFor="name"
                                className="text-xs font-semibold uppercase tracking-widest text-teal-600"
                            >
                                Community Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                onChange={update}
                                required
                                placeholder="e.g. Fullstack Web Devs"
                                className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
                            />
                        </div>

                        {/* Description */}
                        <div className="flex flex-col gap-1.5">
                            <label
                                htmlFor="description"
                                className="text-xs font-semibold uppercase tracking-widest text-teal-600"
                            >
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                 onChange={update}
                                required
                                rows={4}
                                placeholder="What is this community about?"
                                className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition resize-none"
                            />
                        </div>
                        <div>
                            <label htmlFor="communityImg" className="text-xs font-semibold uppercase tracking-widest text-teal-600">Insert an image URL for your community header</label>
                            <input type="text" id="communityImg" name="communityImg" className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition w-full"/>
                        </div>
                        {formError != "" && 
                            <span>Something went wrong with your submission. Try again later.</span>
                        }
                        {/* Submit */}
                        <div className="flex justify-end pt-2">
                            <button
                                onClick={handleSubmit}
                                disabled={!valid}
                                type="submit"
                                className="bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white text-sm font-semibold px-6 py-3 rounded-xl shadow-sm transition-colors"
                            >
                                Create Community
                            </button>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    );
}
