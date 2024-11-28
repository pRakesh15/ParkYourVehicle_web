'use client'
import Link from 'next/link'
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-zinc-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-9">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Parking Hub</h2>
            <p className="text-gray-300 mb-4">
              Simplifying urban parking with smart, convenient booking solutions. Find and reserve your perfect spot with ease.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'About', 'Services', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase()}`} className="text-gray-300 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                <a href="mailto:info@parkinghub.com" className="text-gray-300 hover:text-white transition-colors">
                  info@parkinghub.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                <a href="tel:+1234567890" className="text-gray-300 hover:text-white transition-colors">
                  (+91) 6372700872
                </a>
              </li>
              <li className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                <span className="text-gray-300">752003 Paikanagar,Delta, City, Country</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media and Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
            {[Facebook, Twitter, Instagram].map((Icon, index) => (
              <a key={index} href="#" className="text-gray-300 hover:text-white transition-colors">
                <Icon className="w-6 h-6" />
                <span className="sr-only">Social Media Link</span>
              </a>
            ))}
          </div>
          <div className="text-gray-300 text-sm">
            © {new Date().getFullYear()} Parking Hub. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}

