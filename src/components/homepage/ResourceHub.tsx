
import React from 'react';

const ResourceHub = () => {
  const resources = [
    { 
      name: 'Free Webinars', 
      icon: '🎥', 
      description: 'Weekly expert sessions',
      color: 'from-purple-500 to-pink-500'
    },
    { 
      name: 'Student Forums', 
      icon: '💬', 
      description: 'Connect with peers',
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      name: 'Career Services', 
      icon: '🚀', 
      description: 'Job placement support',
      color: 'from-green-500 to-emerald-500'
    },
    { 
      name: 'Resource Library', 
      icon: '📚', 
      description: 'Extensive learning materials',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const communityFeed = [
    { user: 'Alex M.', achievement: 'Completed AI Fundamentals', time: '2 hours ago' },
    { user: 'Sarah K.', achievement: 'Started Digital Marketing Pro', time: '4 hours ago' },
    { user: 'Mike R.', achievement: 'Earned Leadership Certificate', time: '6 hours ago' }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Resource Hub & 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Community</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Access a wealth of resources and connect with a thriving learning community
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Resource Bubbles */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Learning Resources</h3>
            <div className="grid grid-cols-2 gap-6">
              {resources.map((resource, index) => (
                <div
                  key={resource.name}
                  className="group relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${resource.color.split(' ')[0].replace('from-', '')} 0%, ${resource.color.split(' ')[1].replace('to-', '')} 100%)`
                  }}
                >
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
                  <div className="relative z-10">
                    <div className="text-4xl mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                      {resource.icon}
                    </div>
                    <h4 className="text-xl font-bold mb-2">{resource.name}</h4>
                    <p className="text-white/90">{resource.description}</p>
                  </div>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>

          {/* Community Feed */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Community Activity</h3>
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="space-y-4">
                {communityFeed.map((activity, index) => (
                  <div 
                    key={index} 
                    className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors duration-200"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {activity.user.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{activity.user}</p>
                      <p className="text-gray-600 text-sm">{activity.achievement}</p>
                      <p className="text-gray-400 text-xs">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200">
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                  Join Our Community
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourceHub;
