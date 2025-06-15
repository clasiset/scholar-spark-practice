import React from 'react';
import BackButton from './BackButton';
import { Target, Eye, Gem, BookOpen, HeartHandshake } from 'lucide-react';

const teamMembers = [
  {
    name: 'Abebe Bikila',
    role: 'Founder & CEO',
    avatar: 'https://i.pravatar.cc/150?u=abebe-bikila',
    bio: 'A passionate educator dedicated to making quality education accessible to all Ethiopian students.'
  },
  {
    name: 'Fatuma Roba',
    role: 'Head of Content',
    avatar: 'https://i.pravatar.cc/150?u=fatuma-roba',
    bio: 'Expert in curriculum design, ensuring all our materials meet the highest academic standards.'
  },
  {
    name: 'Haile Gebrselassie',
    role: 'Lead Developer',
    avatar: 'https://i.pravatar.cc/150?u=haile-g',
    bio: 'The brilliant mind behind our innovative and user-friendly platform.'
  }
];

const AboutPage = ({ goBack, previousPageName }: { goBack?: () => void, previousPageName?: string | null }) => {
  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BackButton onClick={goBack} previousPageName={previousPageName} />

        {/* Core Identity & Introduction */}
        <header className="text-center pt-8 pb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 animate-[fade-in_0.5s_ease-out]">About Zehulu.com</h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground animate-[fade-in_0.5s_ease-out_0.2s]">
            Your gateway to academic excellence. We are dedicated to empowering Ethiopian students to excel in their university entrance and exit examinations through comprehensive study materials and innovative learning tools.
          </p>
        </header>

        {/* Our Story / History */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold mb-4 text-foreground">Our Journey</h2>
              <p className="text-muted-foreground mb-4">
                Founded in 2018, Zehulu.com was born from a simple yet powerful idea: to level the playing field for all students in Ethiopia. Our founder saw firsthand the challenges students faced in accessing quality preparation materials for crucial national exams.
              </p>
              <p className="text-muted-foreground">
                What started as a small passion project has grown into a leading educational platform, serving thousands of students across the nation. We are proud of our journey and remain committed to our founding principles.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80" alt="Team working together" className="rounded-lg shadow-2xl aspect-video object-cover" />
            </div>
          </div>
        </section>
        
        {/* Mission, Vision, and Values */}
        <section className="bg-card text-card-foreground rounded-xl shadow-lg py-16 px-6 sm:px-8 my-16">
          <div className="max-w-5xl mx-auto">
             <h2 className="text-3xl font-bold mb-12 text-center text-card-foreground">Our Guiding Principles</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="flex items-start">
                  <Target className="h-10 w-10 text-accent mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-2xl font-semibold text-card-foreground">Our Mission</h3>
                    <p className="text-muted-foreground mt-2">To provide high-quality, affordable, and accessible online education that equips individuals with the knowledge and skills necessary to thrive.</p>
                  </div>
              </div>
              <div className="flex items-start">
                  <Eye className="h-10 w-10 text-accent mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-2xl font-semibold text-card-foreground">Our Vision</h3>
                    <p className="text-muted-foreground mt-2">To be the leading online educational platform in Ethiopia, fostering a community of lifelong learners and innovators who drive positive change.</p>
                  </div>
              </div>
            </div>
            <div className="mt-16">
              <h3 className="text-2xl font-semibold mb-8 text-center text-card-foreground">Our Core Values</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-accent/10 text-accent">
                      <Gem className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-card-foreground">Excellence</h4>
                    <p className="mt-1 text-base text-muted-foreground">Delivering the highest quality educational content.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-accent/10 text-accent">
                      <BookOpen className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-card-foreground">Accessibility</h4>
                    <p className="mt-1 text-base text-muted-foreground">Making education available to everyone.</p>
                  </div>
                </div>
                <div className="flex items-start">
                   <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-accent/10 text-accent">
                      <HeartHandshake className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-card-foreground">Community</h4>
                    <p className="mt-1 text-base text-muted-foreground">Fostering a supportive learning environment.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* The Team / Leadership */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Meet Our Team</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground mb-12">The passionate educators and developers dedicated to your success.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <div key={member.name} className="bg-card text-card-foreground p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
                  <img src={member.avatar} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-border" />
                  <h4 className="text-xl font-semibold mb-1 text-foreground">{member.name}</h4>
                  <p className="text-accent mb-2">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default AboutPage;
