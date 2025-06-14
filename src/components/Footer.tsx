
import React from 'react';
import { Facebook, Twitter, Linkedin, Youtube, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Column 1: About */}
          <div>
            <h3 className="text-xl font-bold mb-4">Zehulu.com</h3>
            <p className="text-gray-300 mb-6 text-sm">
              Your gateway to academic excellence. Empowering learners with comprehensive study materials and exam preparation tools.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white transition duration-300"><Facebook size={22} /></a>
              <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white transition duration-300"><Twitter size={22} /></a>
              <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-white transition duration-300"><Linkedin size={22} /></a>
              <a href="#" aria-label="YouTube" className="text-gray-400 hover:text-white transition duration-300"><Youtube size={22} /></a>
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white transition duration-300"><Instagram size={22} /></a>
            </div>
          </div>

          {/* Column 2: Company */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">Courses</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">Blog</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">Careers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">Contact Us</a></li>
            </ul>
          </div>

          {/* Column 3: Exams */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Exams</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">Mathematics</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">Physics</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">Chemistry</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">Biology</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">Testimonials</a></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Join Our Newsletter</h4>
             <p className="text-gray-400 mb-4 text-sm">
              Get updates on new courses, tips, and promotions.
            </p>
            <form>
              <div className="flex items-center">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-gray-700 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-sm"
                  aria-label="Email for newsletter"
                />
                <button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-r-md transition duration-300"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">&copy; 2018 - {currentYear} Zehulu.com. All Rights Reserved.</p>
            <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition duration-300">Terms of Service</a>
              <a href="#" className="hover:text-white transition duration-300">Privacy Policy</a>
              <a href="#" className="hover:text-white transition duration-300">Cookie Policy</a>
              <a href="#" className="hover:text-white transition duration-300">Disclaimer</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
