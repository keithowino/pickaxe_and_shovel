import React from "react";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { IoLogoGithub, IoLogoLinkedin, IoLogoTwitter } from "react-icons/io5";
import PickaxeAndShovelLogo from "./PickaxeAndShovelLogo";
import { socialLinks } from "../lib/DynamicData";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/40 mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <PickaxeAndShovelLogo className="h-10 w-10" />
              <div>
                <div className="font-heading font-bold tracking-wider">
                  PICKAXE & SHOVEL
                </div>
                <div className="serial-number text-muted-foreground">
                  DIGGING DEEP // BUILDING THE FUTURE
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              Keith Owino — self-taught web developer transitioning into
              mechatronics engineering. Building automated systems, IoT
              solutions, and robotics in East Africa.
            </p>
            <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" /> Nairobi, Kenya 🇰🇪
            </div>
          </div>

          <div>
            <h4 className="serial-number mb-4 text-foreground">Navigate</h4>
            <ul className="space-y-2 text-sm">
              {[
                ["/", "Home"],
                ["/about", "About"],
                ["/services", "Services"],
                ["/portfolio", "Portfolio"],
                ["/contact", "Contact"],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="serial-number mb-4 text-foreground">Connect</h4>
            <div className="flex gap-3">
              {[
                {
                  href: socialLinks.github,
                  label: "GitHub",
                  Icon: IoLogoGithub,
                },
                {
                  href: socialLinks.linkedin,
                  label: "LinkedIn",
                  Icon: IoLogoLinkedin,
                },
                {
                  href: socialLinks.twitter,
                  label: "Twitter",
                  Icon: IoLogoTwitter,
                },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="p-2 border border-border hover:border-primary hover:text-primary transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-2 text-xs text-muted-foreground">
          <span>
            © {new Date().getFullYear()} Keith Owino — All systems synthesized.
          </span>
          <span>Made with Pickaxe & Shovel in Nairobi 🇰🇪</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
