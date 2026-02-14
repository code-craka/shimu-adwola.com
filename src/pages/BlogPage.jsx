
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const blogPosts = [
  {
    id: 'automate-invoice-processing',
    title: 'How to Automate Invoice Processing and Save 20+ Hours Per Week',
    excerpt: 'Manual invoice processing is one of the biggest time drains in financial operations. Learn how automation can eliminate data entry, reduce errors by 90%, and free your team to focus on strategic work.',
    category: 'Automation',
    date: '2026-02-10',
    readTime: '6 min read',
    image: null,
  },
  {
    id: 'make-vs-zapier',
    title: 'Make.com vs Zapier: Which Automation Tool Is Right for Your Finance Team?',
    excerpt: 'Both Make.com and Zapier are powerful automation platforms, but they excel in different areas. We break down the key differences to help you choose the right tool for your financial workflows.',
    category: 'Tools',
    date: '2026-02-03',
    readTime: '8 min read',
    image: null,
  },
  {
    id: 'financial-reconciliation-guide',
    title: 'The Complete Guide to Automating Financial Reconciliation',
    excerpt: 'Payment reconciliation doesn\'t have to be a monthly headache. Discover how businesses are matching thousands of transactions automatically with zero manual effort.',
    category: 'Guides',
    date: '2026-01-25',
    readTime: '10 min read',
    image: null,
  },
];

const categories = ['All', 'Automation', 'Tools', 'Guides'];

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? blogPosts
    : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <>
      <Helmet>
        <title>Blog - Adwola Financial Automation Insights</title>
        <meta name="description" content="Expert insights on financial automation, workflow optimization, and tools like Make.com and Zapier. Tips and guides from Adwola's automation specialists." />
        <meta property="og:title" content="Blog - Adwola Financial Automation Insights" />
        <meta property="og:description" content="Expert insights on financial automation, workflow optimization, and tools like Make.com and Zapier." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://adwola.com/blog" />
        <meta property="og:image" content="https://adwola.com/slazzer-preview-p3nef.png" />
      </Helmet>

      <div className="bg-[#FAFAF7] min-h-screen pt-20">
        {/* Header */}
        <section className="bg-gradient-to-br from-[#1A1A2E] via-[#2A2A4E] to-[#1A1A2E] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">Blog</h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Insights, guides, and tips on financial automation and workflow optimization.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeCategory === cat
                      ? 'bg-[#C5A23E] text-[#1A1A2E]'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col"
                >
                  {/* Placeholder image area */}
                  <div className="bg-gradient-to-br from-[#1A1A2E] to-[#2A2A4E] h-48 flex items-center justify-center">
                    <img src="/slazzer-preview-p3nef.png" alt="Adwola" className="h-12 w-auto opacity-30" />
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#C5A23E] bg-[#C5A23E]/10 px-3 py-1 rounded-full">
                        <Tag className="w-3 h-3" />
                        {post.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-[#1A1A2E] mb-3 leading-tight">
                      {post.title}
                    </h2>

                    <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                      <time className="text-sm text-gray-400">
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                      <span className="text-[#C5A23E] font-medium text-sm flex items-center gap-1 cursor-default">
                        Coming Soon
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">No posts in this category yet. Check back soon!</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-br from-[#1A1A2E] via-[#2A2A4E] to-[#1A1A2E] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Ready to Automate Your Finances?
              </h2>
              <p className="text-xl text-white/80 mb-8">
                Book a free strategy call and see how automation can transform your operations.
              </p>
              <Link to="/contact">
                <Button className="bg-[#C5A23E] hover:bg-[#B39235] text-[#1A1A2E] font-semibold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  Book a Free Strategy Call
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BlogPage;
