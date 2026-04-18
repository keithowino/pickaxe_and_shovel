import React, { useState, useEffect } from "react";
import PickaxeAndShovelLogo from "./PickaxeAndShovelLogo";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
// import { Menu, X } from "lucide-react";
// import { useAuth } from "@/lib/AuthContext";

const BASE_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  //   const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  //   const location = useLocation();

  //   const { user } = useAuth();
  let user = false; // Placeholder for user authentication state

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    fn();
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  //   useEffect(() => {
  //     setOpen(false);
  //   }, [location.pathname]);

  const links = user
    ? [...BASE_LINKS, { to: "/admin", label: "Admin" }]
    : BASE_LINKS;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/90 backdrop-blur-md border-b border-border" : "bg-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <PickaxeAndShovelLogo className="h-9 w-9" />
            <div className="leading-tight">
              <div className="font-heading font-bold text-sm tracking-wider">
                PICKAXE & SHOVEL
              </div>
              <div className="serial-number text-muted-foreground">
                KE // EST. 2025
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm font-medium transition-colors ${isActive ? "text-primary" : "text-foreground/70 hover:text-foreground"}`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute bottom-0 left-2 right-2 h-[2px] bg-primary"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
            <div className="ml-4">
              <ThemeToggle />
            </div>
          </nav>
          {/* Mobile controls */}
          {/* <div className="flex lg:hidden items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="p-2 border border-border"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div> */}
        </div>
      </div>

      {/* Mobile drawer */}
      {/* <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-b border-border overflow-hidden"
          >
            <nav className="flex flex-col px-6 py-4 gap-1">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `px-4 py-3 text-sm font-medium border-l-2 ${isActive ? "border-primary text-primary bg-muted" : "border-transparent text-foreground/70"}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence> */}
    </header>
  );
};

export default Navbar;
