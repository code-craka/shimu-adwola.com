
import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Youtube, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1A2E] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <img src="/slazzer-preview-p3nef.png" alt="Adwola" className="h-10 w-auto" />
            <p className="mt-4 text-sm text-white/70">
              Transforming financial operations through intelligent automation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <span className="text-lg font-semibold text-white">Quick Links</span>
            <nav className="mt-4 space-y-2">
              <Link to="/" className="block text-sm text-white/70 hover:text-[#C5A23E] transition-colors">
                Home
              </Link>
              <Link to="/services" className="block text-sm text-white/70 hover:text-[#C5A23E] transition-colors">
                Services
              </Link>
              <Link to="/about" className="block text-sm text-white/70 hover:text-[#C5A23E] transition-colors">
                About
              </Link>
              <Link to="/case-studies" className="block text-sm text-white/70 hover:text-[#C5A23E] transition-colors">
                Case Studies
              </Link>
              <Link to="/blog" className="block text-sm text-white/70 hover:text-[#C5A23E] transition-colors">
                Blog
              </Link>
              <Link to="/contact" className="block text-sm text-white/70 hover:text-[#C5A23E] transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact Section */}
          <div>
            <span className="text-lg font-semibold text-white">Get in Touch</span>
            <div className="mt-4 space-y-3">
              <p className="text-sm text-white/70 font-semibold">LEVER N GEAR LTD.</p>
              <p className="text-sm text-white/70">
                Lane 5, House-336, Baridhara DOHS,<br />
                Dhaka Cantonment, Dhaka 1206
              </p>
              <a
                href="mailto:nahar@adwola.com"
                className="flex items-center space-x-2 text-sm text-white/70 hover:text-[#C5A23E] transition-colors"
              >
                <Mail size={16} />
                <span>nahar@adwola.com</span>
              </a>
              <div className="flex items-center space-x-4 mt-4">
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-[#C5A23E] transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-[#C5A23E] transition-colors"
                  aria-label="Twitter/X"
                >
                  <Twitter size={20} />
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-[#C5A23E] transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-sm text-white/60 text-center">
            © {currentYear} Adwola — Financial Automation Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
