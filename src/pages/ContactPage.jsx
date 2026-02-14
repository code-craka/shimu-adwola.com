
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail, Clock, Send, Loader2, AlertCircle, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';

const ContactPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }
    
    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: 'Please Fix Form Errors',
        description: 'Please fill in all required fields correctly.',
        variant: 'destructive',
        duration: 4000,
      });
      return;
    }

    setIsSubmitting(true);
    console.log('🚀 Starting form submission...');

    try {
      // Attempt to insert data into Supabase
      const { data, error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            company: formData.company,
            service_interest: formData.service,
            message: formData.message,
          }
        ])
        .select();

      // Handle Supabase specific errors
      if (error) {
        console.error('❌ Supabase Error:', error);
        throw new Error(error.message || 'Database insertion failed');
      }

      console.log('✅ Form submission successful:', data);

      // Success feedback
      toast({
        title: 'Message Sent Successfully! 🚀',
        description: 'Thank you for reaching out. We\'ll respond within 24 hours.',
        duration: 5000,
        variant: 'default',
        className: 'bg-[#1A1A2E] text-white border-[#C5A23E]'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        service: '',
        message: ''
      });

    } catch (error) {
      console.error('❌ Submission Exception:', error);
      
      let errorMessage = 'There was a problem sending your message. Please try again later.';
      
      // Provide more specific error messages if possible
      if (error.message.includes('fetch')) {
        errorMessage = 'Network error: Please check your internet connection.';
      } else if (error.code === '42501') {
        errorMessage = 'Permission denied. Please try again later.';
      }

      toast({
        title: 'Submission Failed',
        description: errorMessage,
        variant: 'destructive',
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Adwola - Book Your Free Strategy Call</title>
        <meta name="description" content="Get in touch with Adwola for financial automation solutions. Book a free 30-minute strategy call or send us a message. We respond within 24 hours." />
        <meta property="og:title" content="Contact Adwola - Book Your Free Strategy Call" />
        <meta property="og:description" content="Get in touch with Adwola for financial automation solutions. Book a free 30-minute strategy call or send us a message. We respond within 24 hours." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://adwola.com/contact" />
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
                Let's Talk Automation
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Ready to transform your financial operations? Get in touch and let's discuss your automation needs.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-white rounded-xl shadow-lg p-8 h-full">
                  <h2 className="text-2xl font-bold text-[#1A1A2E] mb-6">Send Us a Message</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-[#1A1A2E] mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-[#C5A23E] text-gray-900 bg-white`}
                        placeholder="John Doe"
                        disabled={isSubmitting}
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-[#1A1A2E] mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-[#C5A23E] text-gray-900 bg-white`}
                        placeholder="john@company.com"
                        disabled={isSubmitting}
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-[#1A1A2E] mb-2">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.company ? 'border-red-500' : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-[#C5A23E] text-gray-900 bg-white`}
                        placeholder="Your Company Ltd."
                        disabled={isSubmitting}
                      />
                      {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
                    </div>

                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-[#1A1A2E] mb-2">
                        Service Interest *
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.service ? 'border-red-500' : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-[#C5A23E] text-gray-900 bg-white`}
                        disabled={isSubmitting}
                      >
                        <option value="">Select a service</option>
                        <option value="essentials">Essentials ($397)</option>
                        <option value="professional">Professional ($997)</option>
                        <option value="retainer">Retainer ($697/month)</option>
                        <option value="enterprise">Enterprise ($2,500+)</option>
                        <option value="other">Other / Not Sure</option>
                      </select>
                      {errors.service && <p className="text-red-500 text-sm mt-1">{errors.service}</p>}
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-[#1A1A2E] mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.message ? 'border-red-500' : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-[#C5A23E] text-gray-900 bg-white resize-none`}
                        placeholder="Tell us about your automation needs..."
                        disabled={isSubmitting}
                      />
                      {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                    </div>

                    <Button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#C5A23E] hover:bg-[#B39235] text-[#1A1A2E] font-semibold py-3 rounded-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          Sending...
                          <Loader2 className="ml-2 w-4 h-4 animate-spin" />
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                {/* Contact Information */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-[#1A1A2E] mb-6">Contact Information</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-3">
                      <Mail className="w-6 h-6 text-[#C5A23E] mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-[#1A1A2E]">Email</p>
                        <a href="mailto:nahar@adwola.com" className="text-gray-600 hover:text-[#C5A23E] transition-colors">
                          nahar@adwola.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Clock className="w-6 h-6 text-[#C5A23E] mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-[#1A1A2E]">Response Time</p>
                        <p className="text-gray-600">We respond within 24 hours</p>
                      </div>
                    </div>

                     <div className="flex items-start space-x-3">
                      <Calendar className="w-6 h-6 text-[#C5A23E] mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-[#1A1A2E]">Strategy Calls</p>
                        <p className="text-gray-600">Book a slot using the calendar below to speak directly with our automation experts.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Direct Call to Action */}
                <div className="bg-gradient-to-br from-[#1A1A2E] to-[#2A2A4E] rounded-xl shadow-lg p-8 text-white">
                  <h2 className="text-2xl font-bold mb-4">Prefer a Direct Call?</h2>
                  <p className="text-white/80 mb-6">
                    Skip the email tag and book a time directly on our calendar below.
                  </p>
                  <Button 
                    onClick={() => document.getElementById('calendly-section').scrollIntoView({ behavior: 'smooth' })}
                    className="w-full bg-[#C5A23E] hover:bg-[#B39235] text-[#1A1A2E] font-semibold py-3"
                  >
                    Go to Calendar
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Calendly Section */}
        <section id="calendly-section" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
               <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A2E] mb-4">
                 Schedule Your <span className="text-[#C5A23E]">Strategy Call</span>
               </h2>
               <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                 Select a time that works for you. In this 30-minute session, we'll analyze your current workflows and identify automation opportunities.
               </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="rounded-xl overflow-hidden shadow-2xl border border-gray-100 bg-white"
            >
              {/* Calendly Inline Widget */}
              <div 
                className="calendly-inline-widget w-full" 
                data-url="https://calendly.com/nahar-adwola/30min?hide_gdpr_banner=1&primary_color=c5a23e" 
                style={{ minWidth: '320px', height: '700px' }} 
              />
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactPage;
