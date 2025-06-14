
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Zehulu.com</h3>
            <p className="text-gray-300">
              Your gateway to academic excellence.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">Courses</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">About</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Exams</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">Mathematics</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">Physics</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">Chemistry</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">Biology</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">Help Center</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">&copy; 2024 Zehulu.com. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
