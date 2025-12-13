import {
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
  FaWhatsapp,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-12 text-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="flex flex-col items-start gap-4">
            <img
              src="https://i.ibb.co.com/99p8zDNg/Asset-Verse-Logo-2.png"
              alt="AssetVerse"
              width="100"
              height="100"
            />
            <p className="text-sm text-gray-600 max-w-xs">
              AssetVerse — a simple, secure asset management platform for teams.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">
              Quick Links
            </h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>
                <a href="/" className="hover:text-blue-600">
                  Home
                </a>
              </li>
              <li>
                <a href="/assets" className="hover:text-blue-600">
                  Assets
                </a>
              </li>
              <li>
                <a href="/dashboard" className="hover:text-blue-600">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-blue-600">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">
              Contact
            </h4>
            <ul className="text-sm text-gray-600 space-y-3">
              <li>
                <a
                  href="mailto:devmrbrafi@gmail.com"
                  className="flex items-center gap-3 hover:text-blue-600"
                >
                  <MdEmail className="text-lg text-blue-500" aria-hidden />
                  <span className="underline-offset-2">
                    devmrbrafi@gmail.com
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+8801971789176"
                  className="flex items-center gap-3 hover:text-blue-600"
                >
                  <FiPhone className="text-lg text-blue-500" aria-hidden />
                  <span>+8801971789176</span>
                </a>
              </li>
              <li>
                <a
                  href="http://Wa.me/+8801971789176"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 hover:text-blue-600"
                >
                  <FaWhatsapp className="text-lg text-green-500" aria-hidden />
                  <span>WhatsApp</span>
                </a>
              </li>

              <li className="pt-2">
                <div className="flex items-center gap-4">
                  <a
                    href="https://www.facebook.com/m.r.b.rafi.2025"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    <FaFacebookF className="text-lg" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/mrbrafi2005"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    <FaLinkedinIn className="text-lg" />
                  </a>
                  <a
                    href="https://github.com/MRBRAFI"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    <FaGithub className="text-lg" />
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} AssetVerse. All rights reserved.
          </p>
          <div className="text-sm text-gray-500">
            Made with care •{" "}
            <a
              href="mailto:devmrbrafi@gmail.com"
              className="hover:text-blue-600"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
