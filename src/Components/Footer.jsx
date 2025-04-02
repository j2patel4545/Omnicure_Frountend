import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaPinterest } from "react-icons/fa";
import {Link} from 'react-router-dom'

const SocialIcons = () => (
  <div className="flex space-x-4">
    <FaFacebook className="text-blue-600 bg-white rounded-full text-2xl cursor-pointer hover:opacity-80" />
    <FaInstagram className=" text-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-2xl cursor-pointer hover:opacity-80" />
    <FaLinkedin className="text-blue-600 rounded-sm object-cover p-0 bg-white text-2xl cursor-pointer hover:opacity-80" />
    <FaYoutube className="text-red-500 text-2xl rounded-full cursor-pointer hover:opacity-80" />
    <FaPinterest className="text-red-600 bg-white rounded-full text-2xl cursor-pointer hover:opacity-80" />
  </div>
);

const Footer = () => {
  return (
    <footer className="bg-[#28574E] text-white py-10 px-5 md:px-20">
      <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-400 pb-4">
        {/* Logo Section */}
        <div className="flex object-contain items-center space-x-2">
           <Link to='/'>  <img src="Group.png" className=" h-1/2 w-[80%]"  alt="" /> </Link>
          {/* <span className="text-white text-2xl font-semibold">Omnicure</span> */}
        </div>

        {/* Social Icons */}
        <div className="mt-4 md:mt-0">
          <SocialIcons />
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 mt-8">
        {/* About Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Omnicure</h2>
          <p className="text-sm leading-relaxed">
            MediPocket is a cross-border care INDIA'S platform bridging the gap in
            specialty care by connecting patients worldwide to top hospitals and specialists in the INDIA.
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
          <ul className="space-y-2 text-sm">
            {[
              "Home",
              "Second Opinion",
              "Treatment in USA",
              "Clinical Trial",
              "USA Hospital",
              "About Us",
              "Blogs",
              "Contact Us",
              "Medical Intake Form",
            ].map((link) => (
              <li key={link} className="hover:text-gray-300 cursor-pointer">
                {link}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
          {[
            { country: "India", location: "Gurugram, Haryana", flag: "🇮🇳" },
            { country: "Singapore", location: "68 Circular Rd., Singapore", flag: "🇸🇬" },
            { country: "UAE", location: "Dubai, UAE", flag: "🇦🇪" },
            { country: "USA", location: "Los Angeles, California, US", flag: "🇺🇸" },
          ].map(({ country, location, flag }) => (
            <div key={country} className="flex items-center space-x-2 mb-2">
              <span className="text-xl">{flag}</span>
              <div>
                <p className="font-medium">{country} Office:</p>
                <p className="text-sm text-gray-300">{location}</p>
              </div>
            </div>
          ))}
          <button className="mt-4 flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-md text-sm hover:bg-gray-600 backdrop-blur-20 transition">
            ✉️ <span>health@omnicure.com</span>
          </button>
        </div>

        {/* Legal Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Legal</h3>
          <ul className="space-y-2 text-sm">
            {[
              "Privacy Policies",
              "Terms & Conditions",
              "License",
              "Resources",
              "Downloads",
            ].map((item) => (
              <li key={item} className="hover:text-gray-300 cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Social Media & Copyright */}
      <div className="flex flex-col items-center mt-10 border-t border-gray-600 pt-5">
        <SocialIcons />
        <p className="text-sm mt-4">© {new Date().getFullYear()} Omnicure USA. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
