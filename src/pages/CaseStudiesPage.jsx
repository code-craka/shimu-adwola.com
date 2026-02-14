
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, Clock, DollarSign, CheckCircle, ArrowRight, RotateCcw, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabaseClient';

const CaseStudiesPage = () => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCaseStudies = async () => {
    setLoading(true);
    setError(null);
    console.log('🔄 Fetching case studies from Supabase...');

    try {
      const { data, error: supabaseError } = await supabase
        .from('case_studies')
        .select('*')
        .order('created_at', { ascending: false });

      if (supabaseError) {
        console.error('❌ Supabase Error Details:', supabaseError);
        throw new Error(supabaseError.message);
      }

      if (!data) {
        throw new Error('No data returned from database');
      }

      console.log(`✅ Successfully fetched ${data.length} case studies`);
      setCaseStudies(data);

    } catch (err) {
      console.error('❌ Error fetching case studies:', err);
      setError(err.message || 'Failed to load case studies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  // Icon mapping helper
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Clock': return <Clock className="w-8 h-8" />;
      case 'DollarSign': return <DollarSign className="w-8 h-8" />;
      case 'TrendingUp': return <TrendingUp className="w-8 h-8" />;
      default: return <CheckCircle className="w-8 h-8" />; // Default fallback
    }
  };

  return (
    <>
      <Helmet>
        <title>Case Studies - Adwola Financial Automation Success Stories</title>
        <meta name="description" content="Real results from businesses that transformed their financial operations with Adwola's automation solutions. See how we saved hundreds of hours and eliminated errors." />
        <meta property="og:title" content="Case Studies - Adwola Financial Automation Success Stories" />
        <meta property="og:description" content="Real results from businesses that transformed their financial operations with Adwola's automation solutions. See how we saved hundreds of hours and eliminated errors." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://adwola.com/case-studies" />
        <meta property="og:image" content="https://adwola.com/slazzer-preview-p3nef.png" />
      </Helmet>

      <div className="bg-[#FAFAF7] min-h-screen pt-20">
        {/* Header Section */}
        <section className="bg-gradient-to-br from-[#1A1A2E] via-[#2A2A4E] to-[#1A1A2E] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                Case Studies
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Real businesses, real results. See how automation transformed their financial operations.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Case Studies List */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            {loading && (
              <div className="space-y-12">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                    <div className="bg-gray-200 h-24 w-full"></div>
                    <div className="p-8 space-y-4">
                      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                      <div className="grid grid-cols-2 gap-8">
                        <div className="h-32 bg-gray-200 rounded"></div>
                        <div className="h-32 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {error && !loading && (
              <div className="text-center py-12 bg-white rounded-xl shadow-lg border border-red-100">
                <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Something went wrong</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">{error}</p>
                <Button 
                  onClick={fetchCaseStudies}
                  className="bg-[#1A1A2E] text-white hover:bg-[#2A2A4E] transition-colors"
                >
                  <RotateCcw className="mr-2 h-4 w-4" /> Try Again
                </Button>
              </div>
            )}

            {!loading && !error && caseStudies.length === 0 && (
              <div className="text-center py-16 bg-white rounded-xl shadow-lg">
                <p className="text-gray-500 text-lg">No case studies found. Check back soon!</p>
              </div>
            )}

            {!loading && !error && caseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Header */}
                <div className="bg-[#1A1A2E] text-white p-6 sm:p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-[#C5A23E]">{getIcon(study.icon_name)}</div>
                    <span className="text-sm bg-[#C5A23E]/20 text-[#C5A23E] px-3 py-1 rounded-full border border-[#C5A23E]/30">
                      {study.industry}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold">{study.title}</h2>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Problem */}
                    <div>
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center mr-3 border border-red-100">
                          <span className="text-red-600 font-bold">!</span>
                        </div>
                        <h3 className="text-xl font-bold text-[#1A1A2E]">The Challenge</h3>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{study.problem}</p>
                    </div>

                    {/* Solution */}
                    <div>
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center mr-3 border border-green-100">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold text-[#1A1A2E]">Our Solution</h3>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{study.solution}</p>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="border-t border-gray-100 pt-8">
                    <h3 className="text-xl font-bold text-[#1A1A2E] mb-6">Key Results</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {study.metrics && study.metrics.map((result, idx) => (
                        <div key={idx} className="bg-gradient-to-br from-[#1A1A2E] to-[#2A2A4E] rounded-lg p-4 text-white hover:scale-[1.02] transition-transform duration-300">
                          <div className="text-2xl font-bold text-[#C5A23E] mb-2">{result.metric}</div>
                          <p className="text-sm text-white/80">{result.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-[#1A1A2E] via-[#2A2A4E] to-[#1A1A2E] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Ready for Your Success Story?
              </h2>
              <p className="text-xl text-white/80 mb-8">
                Let's discuss how automation can deliver similar results for your business.
              </p>
              <Link to="/contact">
                <Button className="bg-[#C5A23E] hover:bg-[#B39235] text-[#1A1A2E] font-semibold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  Start Your Transformation
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

export default CaseStudiesPage;
