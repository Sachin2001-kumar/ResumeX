import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-300 border-t">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col sm:flex-row justify-between gap-12">
          <div>
            <h3 className="text-lg font-semibold mb-6">Get started</h3>
            <ul className="space-y-4 text-gray-600">
              <li className="text-green-600 font-medium cursor-pointer hover:underline">
                <a href="/upload">Upload</a>
              </li>
              <li className="hover:text-black cursor-pointer">Pricing</li>
              <li className="hover:text-black cursor-pointer">
                Terms of Service
              </li>
              <li className="hover:text-black cursor-pointer">
                Privacy Policy
              </li>
              <li className="hover:text-black cursor-pointer">
                Cookie Preferences
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Resources</h3>
            <ul className="space-y-4 text-gray-600">
              <li>Blog</li>
              <li>Resume Guides</li>
              <li>Cover Letter Guides</li>
              <li>Job Interview Guides</li>
              <li>Job Interview Questions</li>
              <li>Career Resources</li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t mt-16 pt-6 text-sm text-gray-800 text-center">
          © {new Date().getFullYear()} ResumeX. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
