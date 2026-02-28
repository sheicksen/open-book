import React from "react";
import { Community } from "../../types/community";
// export default function CreateCommunity() {
//     return (
//         <div>
//             <div>
//                 <h1>Create a Community</h1>
//             </div>
//             <div>
//                 <form>
//                     <label htmlFor="name">Community Name:</label>
//                     <input type="text" id="name" name="name" required /> 
//                     <label htmlFor="descirption">Description</label>
//                     <input type="text" id="description" name="description" required />
//                 </form>
//             </div>
//         </div>
//     );
// }
export default function CreateCommunity() {
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
                                required
                                rows={4}
                                placeholder="What is this community about?"
                                className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition resize-none"
                            />
                        </div>

                        {/* Submit */}
                        <div className="flex justify-end pt-2">
                            <button
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
async function createCommunity(name: string, description: string) {
    var community = {
        name : name,
        description : description,
        image : "",
        members : 0
    }
}