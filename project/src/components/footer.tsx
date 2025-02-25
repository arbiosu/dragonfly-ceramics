import Link from "next/link"

export default function Footer() {
    const currentYear = new Date().getFullYear()
    return (
        <footer className="bg-white text-gray-600 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand and Copyright */}
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center mb-4">
                <span className="text-2xl font-bold text-gray-800">Dragonfly Ceramics</span>
              </Link>
              <p className="text-sm">&copy; {currentYear} Dragonfly Ceramics. All rights reserved.</p>
            </div>
  
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                    <Link href="/shop" className="hover:text-gray-800 transition-colors">
                        Shop
                    </Link>
                </li>
                <li>
                    <Link href="/about" className="hover:text-gray-800 transition-colors">
                        About
                    </Link>
                </li>
                <li>
                    <Link href="/contact" className="hover:text-gray-800 transition-colors">
                        Contact
                    </Link>
                </li>
              </ul>
            </div>
  
            {/* Social Media */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                    href="https://open.spotify.com/show/4ffm2AA2kGffaH6TbMzilZ?si=2bnAUAW_TVicae7kjhTE-Q&nd=1&dlsi=93f75f140fc34b37"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-800 transition-colors"
                >
                    <span className="sr-only">Spotify</span>
                </a>
                <a
                    href="https://www.youtube.com/@AthletesResilienceCenter"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-800 transition-colors"
                >
                    <span className="sr-only">Youtube</span>
                </a>
                <a
                    href="https://www.instagram.com/athletesresiliencecenter/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-800 transition-colors"
                >
                    <span className="sr-only">Instagram</span>
                </a>
              </div>
            </div>
          </div>
  
          {/* Bottom Bar add github? */}
          <div className="mt-8 pt-8 border-t border-gray-200 text-sm text-center">
          </div>
        </div>
      </footer>
    )
}