
import React from 'react';
import { Mail, Phone, MapPin, Clock, Facebook, Twitter, Linkedin, Youtube, Instagram } from 'lucide-react';

const ContactDetails = () => {
  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'YouTube', icon: Youtube, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Contact Information</h2>
        <p className="text-muted-foreground">
          Reach out to us through any of the following channels. We're here to help!
        </p>
      </div>
      <div className="space-y-4 text-foreground">
        <div className="flex items-start">
          <MapPin className="mr-4 mt-1 size-5 text-primary shrink-0" />
          <span>123 Learning Lane, Knowledge City, Education State, 12345</span>
        </div>
        <div className="flex items-center">
          <Phone className="mr-4 size-5 text-primary shrink-0" />
          <a href="tel:+251912345678" className="hover:text-primary">+251 912 345 678</a>
        </div>
        <div className="flex items-center">
          <Mail className="mr-4 size-5 text-primary shrink-0" />
          <a href="mailto:support@zehulu.com" className="hover:text-primary">support@zehulu.com</a>
        </div>
        <div className="flex items-start">
          <Clock className="mr-4 mt-1 size-5 text-primary shrink-0" />
          <span>
            <strong className="font-semibold">Operating Hours:</strong><br />
            Monday - Friday: 9:00 AM - 5:00 PM<br />
            Saturday: 10:00 AM - 2:00 PM<br />
            Sunday: Closed
          </span>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-3">Follow Us</h3>
        <div className="flex space-x-4">
          {socialLinks.map(social => (
            <a key={social.name} href={social.href} aria-label={social.name} className="text-muted-foreground hover:text-primary transition duration-300">
              <social.icon size={22} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
