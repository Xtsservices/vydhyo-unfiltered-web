
const blogs = [
    {
        id: 1,
        date: { day: "15", month: "May" },
        category: "Ayurveda",
        title: "Ancient Ayurvedic Remedies for Modern Digestive Issues",
        desc: "Discover how traditional Indian medicine can help with common digestive problems...",
        image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
    },
    {
        id: 2,
        date: { day: "18", month: "May" },
        category: "Yoga",
        title: "Yoga Asanas to Improve Heart Health and Circulation",
        desc: "Learn 5 essential yoga poses recommended by Indian cardiologists for better heart health...",
        image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
    },
    {
        id: 3,
        date: { day: "21", month: "Apr" },
        category: "Dental",
        title: "Traditional Indian Practices for Oral Hygiene",
        desc: "From neem twigs to oil pulling - time-tested Indian methods for dental care...",
        image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
    },
    {
        id: 4,
        date: { day: "22", month: "Jan" },
        category: "Monsoon Care",
        title: "Staying Healthy During Indian Monsoon Season",
        desc: "Doctor-approved tips to prevent common monsoon illnesses in India...",
        image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
    },
];

const categoryColors: Record<string, string> = {
    Ayurveda: "#00BCD4",
    Yoga: "#00BCD4",
    Dental: "#00BCD4",
    "Monsoon Care": "#00BCD4",
};

export default function Blogs() {
    return (
        <div className="w-full flex flex-col items-center bg-white py-12">
            <div className="mb-2">
                <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Recent Blogs
                </span>
            </div>
            <h2 className="text-4xl font-bold text-center mb-10">
                Stay Updated With Our Latest Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
                {/* Left Column */}
                <div className="flex flex-col gap-8">
                    {blogs
                        .filter((_, i) => i % 2 === 0)
                        .map((blog) => (
                            <div
                                key={blog.id}
                                className="flex bg-[#F8FAFC] rounded-2xl shadow-md overflow-hidden"
                            >
                                <div className="relative w-48 min-w-[192px] h-48">
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="object-cover w-full h-full"
                                    />
                                    <div className="absolute top-3 left-3 bg-white rounded-xl px-4 py-2 flex flex-col items-center shadow">
                                        <span className="text-blue-700 font-bold text-xl leading-none">
                                            {blog.date.day}
                                        </span>
                                        <span className="text-gray-500 text-sm">{blog.date.month}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center px-6 py-4">
                                    <span
                                        className="inline-block mb-2 px-3 py-1 rounded-full text-white text-xs font-semibold"
                                        style={{ background: categoryColors[blog.category] }}
                                    >
                                        {blog.category}
                                    </span>
                                    <h3 className="font-bold text-lg mb-1">{blog.title}</h3>
                                    <p className="text-gray-600 text-sm">{blog.desc}</p>
                                </div>
                            </div>
                        ))}
                </div>
                {/* Right Column */}
                <div className="flex flex-col gap-8">
                    {blogs
                        .filter((_, i) => i % 2 === 1)
                        .map((blog) => (
                            <div
                                key={blog.id}
                                className="flex bg-[#F8FAFC] rounded-2xl shadow-md overflow-hidden"
                            >
                                <div className="relative w-48 min-w-[192px] h-48">
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="object-cover w-full h-full"
                                    />
                                    <div className="absolute top-3 left-3 bg-white rounded-xl px-4 py-2 flex flex-col items-center shadow">
                                        <span className="text-blue-700 font-bold text-xl leading-none">
                                            {blog.date.day}
                                        </span>
                                        <span className="text-gray-500 text-sm">{blog.date.month}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center px-6 py-4">
                                    <span
                                        className="inline-block mb-2 px-3 py-1 rounded-full text-white text-xs font-semibold"
                                        style={{ background: categoryColors[blog.category] }}
                                    >
                                        {blog.category}
                                    </span>
                                    <h3 className="font-bold text-lg mb-1">{blog.title}</h3>
                                    <p className="text-gray-600 text-sm">{blog.desc}</p>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            <button className="mt-10 bg-blue-900 text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-blue-800 transition">
                View All Articles
                <svg
                    className="w-5 h-5 ml-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </button>
        </div>
    );
}