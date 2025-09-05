
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="m-1 bg-gray-200 rounded-xs text-black pt-10 pb-6 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-sm">

        {/* About Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3">We're FoodorderNP</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/about" className="hover:underline">About Us</Link>
            </li>
            
            <li>
              <Link to="/delivery-charges" className="hover:underline">Delivery Charges
              </Link>
            </li>
          </ul>
        </div>

        {/* Help Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Get Help</h3>
          <ul className="space-y-2">
            <li>Service Hour: 08:00 AM to 9:00 PM (NST)</li>
            <li>
              <Link to="/how-to-order" className="hover:underline">How to Order?</Link>
            </li>
            <li>
              <Link to="/faqs" className="hover:underline">FAQs</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Call Us</h3>
          <p className="mb-2">Our helpline stays the same across all seven provinces for seamless support.</p>
          <p>Contact Numbers:</p>
          <ul className="space-y-1 mt-1">
            <li>9815895401</li>
            <li>9746803923</li>
            <li>9803301192</li>
          </ul>
        </div>

        {/* Connect Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Connect with Us</h3>
          <div className="flex space-x-4 mb-4">
            <a
              href="https://www.facebook.com/profile.php?id=61578910108826&mibextid=ZbWKwL"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-blue-500"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-blue-400"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.instagram.com/foodordernp?igsh=ZGUzMzM3NWJiOQ=="
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-pink-500"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-red-600"
              aria-label="YouTube"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-xs text-gray-400">
        Terms of Usage | Privacy Policy <br />
        © 2020 Foodmandu Pvt. Ltd. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
