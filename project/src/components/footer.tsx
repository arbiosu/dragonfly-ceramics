import Link from "next/link"
import SocialMediaLinksComponent from "@/components/socialmedia"

export default function Footer() {
    const currentYear = new Date().getFullYear()
    return (
        <footer className="bg-df-bg text-df-text py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand and Copyright */}
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center mb-4">
                <span className="text-2xl">dragonfly ceramics</span>
              </Link>
              <p className="text-sm">&copy; {currentYear} dragonfly ceramics. all rights reserved.</p>
            </div>
  
            {/* Quick Links */}
            <div>
              <ul className="space-y-2">
                <li>
                    <Link href="/shop" className="transition-colors">
                        shop
                    </Link>
                </li>
                <li>
                    <Link href="/about" className="transition-colors">
                        about
                    </Link>
                </li>
                <li>
                    <Link href="/contact" className="transition-colors">
                        contact
                    </Link>
                </li>
              </ul>
            </div>
  
            {/* Social Media */}
            <div className="">
              <SocialMediaLinksComponent />
            </div>
          </div>
  
          {/* Bottom Bar add github? */}
          <div className="mt-8 pt-8 border-t border-gray-200 text-sm text-center">
          </div>
        </div>
      </footer>
    )
}