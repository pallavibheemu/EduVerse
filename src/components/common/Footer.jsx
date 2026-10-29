import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
  FaDiscord,
} from "react-icons/fa";

const footerLinks = {
  Explore: [
    "Home",
    "Courses",
    "Learning Paths",
    "Skill Tracks",
    "Certifications",
    "Projects",
    "Coding Challenges",
    "Career Roadmaps",
    "Blog",
  ],

  "Popular Subjects": [
    "Web Development",
    "MERN Stack",
    "React.js",
    "Java",
    "C++",
    "SQL",
    "DSA",
    "System Design",
    "AI & ML",
    "Cloud Computing",
  ],

  Career: [
    "Placement Preparation",
    "Resume Builder",
    "Mock Interviews",
    "Interview Prep",
    "Career Guidance",
    "Internships",
    "Freelancing",
    "Company-wise Questions",
  ],

  Resources: [
    "Articles",
    "Notes",
    "Cheat Sheets",
    "Roadmaps",
    "Practice Problems",
    "Coding Playground",
    "Community Forum",
    "FAQs",
  ],

  Company: [
    "About EduVerse",
    "Our Team",
    "Contact Us",
    "Careers",
    "Become an Instructor",
    "Partners",
    "Privacy Policy",
    "Terms & Conditions",
  ],

 
};

const Footer = () => {
  return (
    <footer className="bg-richblack-900 border-t border-richblack-700 text-richblack-300 mt-24">

      <div className="w-11/12 max-w-[1200px] mx-auto py-16">

        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-10">

          {/* Logo */}
          <div className="lg:col-span-2">

            <h2 className="text-4xl font-bold text-white">
              Edu<span className="text-blue-400">Verse</span>
            </h2>

            <p className="mt-5 text-sm leading-7">
              Learn industry-ready skills through
              interactive courses, real-world projects,
              and placement-focused learning.
            </p>

            <div className="flex gap-5 mt-8 text-2xl">

              <FaGithub className="hover:text-white cursor-pointer duration-300" />

              <FaLinkedin className="hover:text-[#0A66C2] cursor-pointer duration-300" />

              <FaInstagram className="hover:text-brown-400 cursor-pointer duration-300" />

              <FaYoutube className="hover:text-pink-700 cursor-pointer duration-300" />

              <FaDiscord className="hover:text-blue-700 cursor-pointer duration-300" />

            </div>

          </div>

          {/* Dynamic Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (

            <div key={title}>

              <h3 className="text-white font-semibold text-lg mb-5">
                {title}
              </h3>

              <ul className="space-y-3">

                {links.map((link) => (

                  <li
                    key={link}
                    className="text-sm hover:text-blue-400 cursor-pointer transition-all duration-300"
                  >
                    {link}
                  </li>

                ))}

              </ul>

            </div>

          ))}

        </div>

        {/* Divider */}

        <div className="border-t border-richblack-700 my-12"></div>

        {/* Bottom */}

        <div className="flex flex-col lg:flex-row justify-between items-center gap-5">

          <div className="flex flex-wrap gap-6 text-sm">

            <p className="hover:text-white cursor-pointer">
              Privacy Policy
            </p>

            <p className="hover:text-white cursor-pointer">
              Cookie Policy
            </p>

            <p className="hover:text-white cursor-pointer">
              Terms of Service
            </p>

            <p className="hover:text-white cursor-pointer">
              Refund Policy
            </p>

            <p className="hover:text-white cursor-pointer">
              Contact Us
            </p>

          </div>

          <p className="text-sm text-richblack-400">
            Made with ❤️ by EduVerse © {new Date().getFullYear()} All Rights Reserved.
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;