import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const initialPosts = [
  {
    id: 1,
    title: "5 Strategies to Grow Your Business Blog",
    excerpt: "Learn the top content marketing strategies to expand your reach and authority...",
    content: "<p>Full blog post about strategies to grow your business blog.</p>",
    date: "Aug 24, 2025",
    image: null,
    category: "Marketing",
  },
  {
    id: 2,
    title: "How to Monetize Your Blog in 2025",
    excerpt: "Different revenue streams like ads, affiliate marketing, and digital products explained...",
    content: "<p>Detailed explanation about monetization methods in 2025.</p>",
    date: "Aug 20, 2025",
    image: null,
    category: "Monetization",
  },
  {
    id: 3,
    title: "SEO Basics for Business Owners",
    excerpt: "Simple SEO tips to help your business rank higher on Google and attract customers...",
    content: "<p>Step-by-step SEO guide for business owners.</p>",
    date: "Aug 15, 2025",
    image: null,
    category: "SEO",
  },
];

const author = {
  name: "John Doe",
  bio: "Business strategist & blogger helping entrepreneurs grow online.",
  photo: "https://via.placeholder.com/80",
  socials: {
    twitter: "https://twitter.com/",
    linkedin: "https://linkedin.com/",
  },
};

export default function BusinessBlog() {
  const [email, setEmail] = useState("");
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState(initialPosts);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isWriting, setIsWriting] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [newCategory, setNewCategory] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [viewShop, setViewShop] = useState(false);
  const [viewAbout, setViewAbout] = useState(false);
  const [viewContact, setViewContact] = useState(false);

  const postsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handleSubscribe = () => {
    alert(`Thanks for subscribing, ${email}!`);
    setEmail("");
  };

  const handlePublish = () => {
    if (!newTitle || !newContent || !newCategory) return alert("Please fill in all fields");

    const newPost = {
      id: posts.length + 1,
      title: newTitle,
      excerpt: newContent.replace(/<[^>]+>/g, "").slice(0, 100) + "...",
      content: newContent,
      date: new Date().toLocaleDateString(),
      image: newImage,
      category: newCategory,
    };

    setPosts([newPost, ...posts]);
    setNewTitle("");
    setNewContent("");
    setNewImage(null);
    setNewCategory("");
    setIsWriting(false);
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filterCategory === "All" || post.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", ...new Set(posts.map((p) => p.category))];
  const popularPosts = posts.slice(0, 3);

  const paginatedPosts = filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Header */}
      <header className="bg-white shadow-md p-6 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-3xl font-extrabold text-blue-700 tracking-tight">BizBlog</h1>
        <nav className="space-x-6 text-lg font-medium">
          <button onClick={() => { setViewShop(false); setSelectedPost(null); setIsWriting(false); setViewAbout(false); setViewContact(false); }} className="hover:text-blue-600 transition">Home</button>
          <button onClick={() => { setViewAbout(true); setViewShop(false); setViewContact(false); setSelectedPost(null); setIsWriting(false); }} className="hover:text-blue-600 transition">About</button>
          <button onClick={() => { setViewShop(false); setViewAbout(false); setViewContact(false); setSelectedPost(null); setIsWriting(false); }} className="hover:text-blue-600 transition">Blog</button>
          <button onClick={() => { setViewContact(true); setViewAbout(false); setViewShop(false); setSelectedPost(null); setIsWriting(false); }} className="hover:text-blue-600 transition">Contact</button>
          <button onClick={() => setViewShop(true)} className="hover:text-blue-600 transition">Shop</button>
          <Button onClick={() => setIsWriting(true)} className="ml-6">Write</Button>
        </nav>
      </header>

      {/* Single Post with Author Bio */}
      {selectedPost && !isWriting && !viewShop && !viewAbout && !viewContact && (
        <section className="max-w-4xl mx-auto py-12 px-4">
          <h2 className="text-4xl font-bold mb-4">{selectedPost.title}</h2>
          <p className="text-gray-500 mb-6">{selectedPost.date} • {selectedPost.category}</p>
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: selectedPost.content }}></div>

          {/* Author Bio */}
          <div className="mt-12 p-6 bg-white rounded-xl shadow-md flex items-center space-x-4">
            <img src={author.photo} alt="Author" className="w-20 h-20 rounded-full" />
            <div>
              <h3 className="text-xl font-semibold">{author.name}</h3>
              <p className="text-gray-600">{author.bio}</p>
              <div className="flex space-x-4 mt-2">
                <a href={author.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Twitter</a>
                <a href={author.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">LinkedIn</a>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-4">Related Posts</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {posts
                .filter((p) => p.category === selectedPost.category && p.id !== selectedPost.id)
                .slice(0, 3)
                .map((p) => (
                  <Card key={p.id} className="cursor-pointer hover:shadow-lg transition" onClick={() => setSelectedPost(p)}>
                    <CardContent className="p-5">
                      <h4 className="font-semibold mb-2 line-clamp-2">{p.title}</h4>
                      <p className="text-sm text-gray-600 line-clamp-3">{p.excerpt}</p>
                      <Button className="mt-3" variant="outline">Read More</Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
            {posts.filter((p) => p.category === selectedPost.category && p.id !== selectedPost.id).length === 0 && (
              <p className="text-gray-600">No related posts yet. Check back soon!</p>
            )}
          </div>

          <Button className="mt-10" onClick={() => setSelectedPost(null)}>Back to Blog</Button>
        </section>
      )}

      {/* Blog Page */}
      {!selectedPost && !isWriting && !viewShop && !viewAbout && !viewContact && (
        <section className="max-w-6xl mx-auto py-12 px-4 grid grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="col-span-3">
            <div className="flex items-center mb-6">
              <Input
                type="text"
                placeholder="Search posts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mr-4"
              />
              <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="p-2 border rounded-lg">
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {paginatedPosts.map((post) => (
              <Card key={post.id} className="mb-6 p-6 cursor-pointer hover:shadow-lg transition" onClick={() => setSelectedPost(post)}>
                <h3 className="text-2xl font-bold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-2">{post.excerpt}</p>
                <p className="text-sm text-gray-500">{post.date} • {post.category}</p>
              </Card>
            ))}

            {/* Pagination */}
            <div className="flex justify-center items-center mt-8 space-x-4">
              <Button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Prev</Button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded-lg ${currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                >
                  {i + 1}
                </button>
              ))}
              <Button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</Button>
            </div>
          </div>

          {/* Sidebar */}
          <aside>
            <h3 className="text-xl font-bold mb-4">Popular Posts</h3>
            <ul className="space-y-2">
              {popularPosts.map((p) => (
                <li key={p.id} className="text-blue-600 hover:underline cursor-pointer" onClick={() => setSelectedPost(p)}>{p.title}</li>
              ))}
            </ul>

            <h3 className="text-xl font-bold mt-8 mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat} className="text-gray-700 cursor-pointer hover:text-blue-600" onClick={() => setFilterCategory(cat)}>{cat}</li>
              ))}
            </ul>
          </aside>
        </section>
      )}
    </div>
  );
}
