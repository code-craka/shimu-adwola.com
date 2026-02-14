
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, CheckCircle, Shield, Target, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AboutPage = () => {
  const credentials = [
    { icon: <Award className="w-6 h-6" />, text: 'Make.com Certified Expert' },
    { icon: <CheckCircle className="w-6 h-6" />, text: 'Zapier Verified Partner' },
    { icon: <Shield className="w-6 h-6" />, text: 'Ex-Audit Professional' },
    { icon: <Target className="w-6 h-6" />, text: '5+ Years in Financial Operations' }
  ];

  return (
    <>
      <Helmet>
        <title>About Nahar Shimu - Adwola Financial Automation</title>
        <meta name="description" content="Meet Nahar Shimu, founder of Adwola. From audit professional to automation expert, bringing financial excellence through intelligent workflow automation." />
        <meta property="og:title" content="About Nahar Shimu - Adwola Financial Automation" />
        <meta property="og:description" content="Meet Nahar Shimu, founder of Adwola. From audit professional to automation expert, bringing financial excellence through intelligent workflow automation." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://adwola.com/about" />
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
                About Adwola
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Where financial expertise meets automation excellence
              </p>
            </motion.div>
          </div>
        </section>

        {/* Founder Story Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-gradient-to-br from-[#1A1A2E] to-[#2A2A4E] rounded-2xl p-8 h-96 flex items-center justify-center relative overflow-hidden border-4 border-[#C5A23E]">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-[#C5A23E] rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-5xl font-bold text-[#1A1A2E]">NS</span>
                    </div>
                    <p className="text-white text-lg font-semibold">Nahar Shimu</p>
                    <p className="text-[#C5A23E] text-sm">Founder & Lead Automation Expert</p>
                  </div>
                  <div className="absolute inset-0 opacity-5">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id="grid-pattern" width="30" height="30" patternUnits="userSpaceOnUse">
                          <path d="M 30 0 L 0 0 0 30" fill="none" stroke="white" strokeWidth="0.5"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                    </svg>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A2E] mb-6">
                  From Audit to Automation
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    I spent years working in audit and finance, watching talented professionals waste countless hours on repetitive, manual tasks. Every day, I saw the same pattern: smart people doing mindless data entry, reconciling transactions by hand, and building endless spreadsheets.
                  </p>
                  <p>
                    I knew there had to be a better way. That's when I discovered automation tools like Make.com and Zapier. I started small—automating my own workflows, then helping colleagues, and eventually building complete automation systems for entire departments.
                  </p>
                  <p>
                    The results were transformative. Tasks that took hours were reduced to minutes. Error rates dropped dramatically. Teams could finally focus on analysis and strategy instead of data entry.
                  </p>
                  <p>
                    Today, as a <span className="font-semibold text-[#1A1A2E]">certified Make.com expert</span> and <span className="font-semibold text-[#1A1A2E]">Zapier verified partner</span>, I bring my financial background and automation expertise together to help businesses transform their operations. I understand your pain points because I've lived them—and I know exactly how to solve them.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-8">
                  {credentials.map((credential, index) => (
                    <div key={index} className="flex items-center space-x-2 text-[#1A1A2E]">
                      <div className="text-[#C5A23E]">{credential.icon}</div>
                      <span className="text-sm font-medium">{credential.text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Brand Story Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A2E] mb-6">
                Why <span className="text-[#C5A23E]">Adwola</span>?
              </h2>
              <div className="bg-gradient-to-br from-[#1A1A2E] to-[#2A2A4E] rounded-2xl p-8 text-white">
                <p className="text-xl leading-relaxed mb-4">
                  <span className="text-[#C5A23E] font-bold text-2xl">Adwola</span> means <span className="italic">"Crown of Wealth"</span> in Yoruba, representing the pinnacle of financial excellence.
                </p>
                <p className="text-lg text-white/90 leading-relaxed">
                  Just as a crown symbolizes achievement and mastery, we bring that philosophy to modern businesses through intelligent automation. We don't just build workflows—we create systems that elevate your entire financial operation to its highest potential.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#FAFAF7] rounded-xl p-8"
            >
              <h3 className="text-2xl font-bold text-[#1A1A2E] mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                To empower financial professionals and business owners with automation that eliminates manual work, reduces errors, and unlocks strategic thinking.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We believe your team's time is too valuable to waste on repetitive tasks. Every automation we build is designed to give you back hours of your day while improving accuracy and efficiency.
              </p>
            </motion.div>
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
                Ready to Work Together?
              </h2>
              <p className="text-xl text-white/80 mb-8">
                Let's discuss how automation can transform your financial operations.
              </p>
              <Link to="/contact">
                <Button className="bg-[#C5A23E] hover:bg-[#B39235] text-[#1A1A2E] font-semibold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  Get in Touch
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

export default AboutPage;
