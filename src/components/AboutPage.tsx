
import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">About EduPlatform</h1>
        <div className="max-w-3xl mx-auto">
          <p className="text-xl text-gray-600 mb-6">
            EduPlatform is dedicated to helping Ethiopian students excel in their university entrance and exit examinations.
          </p>
          <p className="text-lg text-gray-600">
            Our platform provides comprehensive practice tests, AI-powered feedback, and personalized learning experiences 
            to ensure students are well-prepared for their academic challenges.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
