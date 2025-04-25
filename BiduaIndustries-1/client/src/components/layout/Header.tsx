import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks/use-scroll";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, Phone, DollarSign, Info } from "lucide-react";
import { FaSpa, FaCloudUploadAlt, FaIndustry, FaLaptopCode, FaBed } from "react-icons/fa";
import BiduaLogo from '@/assets/bidua-logo.png';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { scrollY } = useScroll();
  
  const isScrolled = scrollY > 50;

  const navLinks = [
    { href: "/", label: "Home", icon: <Home className="w-4 h-4 mr-1" /> },
    { href: "/naploo", label: "Naploo™", icon: <FaBed className="w-4 h-4 mr-1" /> },
    { href: "/beauty-care", label: "Beauty Care", icon: <FaSpa className="w-4 h-4 mr-1" /> },
    { href: "/cloud-drive", label: "CloudDrive™", icon: <FaCloudUploadAlt className="w-4 h-4 mr-1" /> },
    { href: "/oem-solutions", label: "OEM Solutions", icon: <FaIndustry className="w-4 h-4 mr-1" /> },
    { href: "/it-connect", label: "IT Connect", icon: <FaLaptopCode className="w-4 h-4 mr-1" /> },
  ];

  // Close mobile menu when location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300", 
        isScrolled || mobileMenuOpen ? "bg-background shadow-md" : "bg-background/80 backdrop-blur-md"
      )}
    >
      <nav className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img 
            src={BiduaLogo} 
            alt="BIDUA Industries Logo" 
            className="h-14 mr-2" 
          />
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className={cn(
                "flex items-center text-foreground hover:text-secondary transition-colors",
                location === link.href && "text-secondary font-semibold"
              )}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
          <Link href="/investor">
            <Button variant="secondary" className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              Invest in Naploo™
            </Button>
          </Link>
          <Link href="/#contact">
            <Button className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              Contact Us
            </Button>
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden text-foreground focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </nav>
      
      {/* Mobile Menu */}
      <div 
        className={cn(
          "lg:hidden bg-background shadow-lg w-full absolute top-full left-0 py-4 px-4 border-t border-primary transition-all duration-300",
          mobileMenuOpen ? "block" : "hidden"
        )}
      >
        <div className="flex flex-col space-y-4">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className={cn(
                "flex items-center text-foreground hover:text-secondary transition-colors py-2",
                location === link.href && "text-secondary font-semibold"
              )}
            >
              {link.icon}
              <span className="ml-2">{link.label}</span>
            </Link>
          ))}
          <Link href="/investor" className="py-2">
            <Button variant="secondary" className="w-full flex items-center justify-center gap-2">
              <DollarSign className="w-4 h-4" />
              Invest in Naploo™
            </Button>
          </Link>
          <Link href="/#contact" className="py-2">
            <Button className="w-full flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" />
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
