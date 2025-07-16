import React from "react";

const About = () => {
  return (
    <div className="bg-black text-white min-h-screen py-12">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-blue-400 mb-4">
            About Get Me a Chai
          </h1>
          <p className="text-lg text-gray-300">
            Empowering creators to turn their dreams into reality, one chai at a
            time.
          </p>
        </div>

       
        <div className="bg-gradient-to-r from-blue-800 to-blue-600 p-8 rounded-lg shadow-lg mb-12">
          <h2 className="text-3xl font-semibold text-white mb-4">Our Mission</h2>
          <p className="text-lg text-gray-200">
            At Get Me a Chai, we believe in the power of community and
            creativity. Our mission is to provide creators with a platform where
            their passion meets the support of their fans. Whether you're an
            artist, writer, musician, or innovator, every chai shared brings you
            closer to your dreams.
          </p>
        </div>

      
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-blue-400 mb-6">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <img
                src="/group.gif"
                alt="Collaborate"
                className="w-24 h-24 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-white mb-2">
                Collaborate
              </h3>
              <p className="text-gray-300">
                Work with your fans to bring your creative ideas to life.
              </p>
            </div>
            <div className="text-center">
              <img
                src="/coin.gif"
                alt="Support"
                className="w-24 h-24 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-white mb-2">
                Get Support
              </h3>
              <p className="text-gray-300">
                Receive financial support from your fans through chai
                contributions.
              </p>
            </div>
            <div className="text-center">
              <img
                src="/tea.gif"
                alt="Grow"
                className="w-24 h-24 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-white mb-2">Grow</h3>
              <p className="text-gray-300">
                Expand your reach and achieve your creative goals.
              </p>
            </div>
          </div>
        </div>

      
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-blue-400 mb-6">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="text-xl font-semibold text-white mb-4">
                For Creators
              </h3>
              <ul className="list-disc pl-6 text-gray-300">
                <li className="mb-2">
                  Direct financial support from your fanbase.
                </li>
                <li className="mb-2">
                  Engage with your fans on a personal level.
                </li>
                <li className="mb-2">
                  Access to a platform tailored for creative projects.
                </li>
              </ul>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="text-xl font-semibold text-white mb-4">
                For Fans
              </h3>
              <ul className="list-disc pl-6 text-gray-300">
                <li className="mb-2">
                  Directly contribute to the success of your favorite creators.
                </li>
                <li className="mb-2">
                  Enjoy exclusive rewards and perks for your support.
                </li>
                <li className="mb-2">
                  Be part of the creative process and connect with creators.
                </li>
              </ul>
            </div>
          </div>
        </div>

       
        <div className="bg-gradient-to-r from-blue-800 to-blue-600 p-8 rounded-lg shadow-lg mb-12">
          <h2 className="text-3xl font-semibold text-white mb-4">
            Join Our Community
          </h2>
          <p className="text-lg text-gray-200 mb-6">
            Become part of a vibrant community of creators and fans who share a
            passion for creativity and collaboration. Together, we can make
            amazing things happen.
          </p>
          <div className="text-center">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300 shadow-md hover:shadow-lg">
              Join Now
            </button>
          </div>
        </div>

       
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-blue-400 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-300 mb-6">
            Whether you're a creator looking for support or a fan eager to help,
            Get Me a Chai is the perfect platform for you.
          </p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 shadow-md hover:shadow-lg">
            Start Your Journey
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;

export const metadata = {
  title: "About - Get Me A Chai",
};