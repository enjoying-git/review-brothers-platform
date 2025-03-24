import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/hooks/use-auth";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import Logo from "./navbar/Logo";
import DesktopNav from "./navbar/DesktopNav";
import UserMenu from "./navbar/UserMenu";
import MobileMenu from "./navbar/MobileMenu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  const { isAuthenticated, logout, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header
      className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-[#232F3E]/95 dark:bg-[#232F3E]/95 backdrop-blur-lg shadow-sm"
          : "py-5 bg-[#232F3E] dark:bg-[#232F3E]"
      }`}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        <Logo />

        {/* Desktop Navigation */}
        <DesktopNav />

        <div className="hidden md:flex items-center space-x-4">
          {/* <ThemeToggle /> */}
          <UserMenu
            isAuthenticated={isAuthenticated}
            isAdmin={isAdmin}
            logout={logout}
          />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-2 md:hidden">
          {/* <ThemeToggle /> */}
          <button
            className="text-white"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && (
        <MobileMenu
          isOpen={isMenuOpen}
          toggleMenu={toggleMenu}
          isAdmin={isAdmin}
          logout={logout}
          isAuthenticated={isAuthenticated}
        />
      )}
    </header>
  );
};

export default Navbar;
