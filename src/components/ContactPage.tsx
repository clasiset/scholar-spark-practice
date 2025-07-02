import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import ContactDetails from './ContactDetails';
import ContactMap from './ContactMap';
import BreadcrumbNav from './BreadcrumbNav';

interface HistoryEntry {
  page: string;
  data: any | null;
}

interface ContactPageProps {
  addTestimonial: (testimonial: any) => void;
  history: HistoryEntry[];
  navigateToHistory: (index: number) => void;
  navigate: (page: string, data?: any) => void;
  openModal: (type: string, data?: any) => void;
}

const ContactPage = ({ addTestimonial, history, navigateToHistory, navigate, openModal }: ContactPageProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    testimonial: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.testimonial) {
      addTestimonial({
        quote: formData.message,
        name: formData.name,
        role: 'Student',
        avatar: `https://i.pravatar.cc/150?u=${formData.email}`
      });
    }
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      testimonial: false
    });
    alert('Thank you for your message! We\'ll get back to you soon.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-background py-12 text-foreground">
      <div className="container mx-auto px-6">
        <BreadcrumbNav history={history} navigateToHistory={navigateToHistory} />
        
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Get in Touch</h1>
            <p className="text-xl text-muted-foreground">
              We're here to help you on your learning journey
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      id="testimonial"
                      name="testimonial"
                      type="checkbox"
                      checked={formData.testimonial}
                      onChange={handleChange}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="testimonial" className="text-sm text-muted-foreground">
                      This is a testimonial/review that can be featured on the website
                    </label>
                  </div>
                  
                  <Button type="submit" size="lg" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <ContactDetails />
              <ContactMap />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
