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
  const [showDivision, setShowDivision] = useState(false);

  
  const isScrolled = scrollY > 50;

  const navLinks = [
    { href: "/", label: "Home", icon: <Home className="w-4 h-4 mr-1" /> },
    { href: "/about", label: "About", icon: <Info className="w-4 h-4 mr-1" /> },
    { href: "/naploo", label: "Naploo™", icon: <FaBed className="w-4 h-4 mr-1" /> },
    { href: "/beauty-care", label: "BeautyCare", icon: <FaSpa className="w-4 h-4 mr-1" /> },
    { href: "/cloud-drive", label: "CloudDrive™", icon: <FaCloudUploadAlt className="w-4 h-4 mr-1" /> },
    { href: "/oem-solutions", label: "OEMSolutions", icon: <FaIndustry className="w-4 h-4 mr-1" /> },
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
    {/* Static Home and About */}
    <Link href="/" className={cn("flex items-center text-foreground hover:text-secondary transition-colors py-2", location === "/" && "text-secondary font-semibold")}>
      <Home className="w-4 h-4 mr-2" />
      Home
    </Link>
    <Link href="/about" className={cn("flex items-center text-foreground hover:text-secondary transition-colors py-2", location === "/about" && "text-secondary font-semibold")}>
      <Info className="w-4 h-4 mr-2" />
      About
    </Link>

    {/* Division Dropdown */}
    <div>
      <button 
        onClick={() => setShowDivision(!showDivision)} 
        className="w-full flex justify-between items-center text-foreground font-medium py-2 focus:outline-none"
      >
        <div className="flex items-center">
          <FaIndustry className="w-4 h-4 mr-2" />
          Division
        </div>
        <span className="text-xl">{showDivision ? '-' : '+'}</span>
      </button>
      {showDivision && (
        <div className="pl-6 mt-1 space-y-2">
          <Link href="/naploo" className={cn("flex items-center text-foreground hover:text-secondary transition-colors", location === "/naploo" && "text-secondary font-semibold")}>
            <FaBed className="w-4 h-4 mr-2" />
            Naploo
          </Link>
          <Link href="/beauty-care" className={cn("flex items-center text-foreground hover:text-secondary transition-colors", location === "/beauty-care" && "text-secondary font-semibold")}>
            <FaSpa className="w-4 h-4 mr-2" />
            Beauty Care
          </Link>
          <Link href="/cloud-drive" className={cn("flex items-center text-foreground hover:text-secondary transition-colors", location === "/cloud-drive" && "text-secondary font-semibold")}>
            <FaCloudUploadAlt className="w-4 h-4 mr-2" />
            Cloud Drive
          </Link>
          <Link href="/oem-solutions" className={cn("flex items-center text-foreground hover:text-secondary transition-colors", location === "/oem-solutions" && "text-secondary font-semibold")}>
            <FaIndustry className="w-4 h-4 mr-2" />
            OEM Solutions
          </Link>
          <Link href="/it-connect" className={cn("flex items-center text-foreground hover:text-secondary transition-colors", location === "/it-connect" && "text-secondary font-semibold")}>
            <FaLaptopCode className="w-4 h-4 mr-2" />
            IT Connect
          </Link>
        </div>
      )}
    </div>

    {/* Invest and Contact Buttons */}
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
