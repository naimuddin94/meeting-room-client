import {
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  PhoneIcon,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";
import Logo from "../ui/Logo";
import Container from "./Container";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <Container className="bg-gradient-to-b from-theme/10 border-t">
      <footer className="py-12 text-muted-foreground">
        <div className="mx-auto grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-start gap-4">
            <Link to="/" className="flex items-center gap-2">
              <Logo />
              <h3 className="text-lg font-bold">SpaceBooth</h3>
            </Link>
            <p className="text-sm">
              Join our community and never miss an update. Stay informed about
              our latest rooms, exclusive offers, and upcoming events.
            </p>
          </div>
          <div className="grid gap-2">
            <h4 className="text-sm font-semibold">Policies</h4>
            <a href="#" className="text-sm hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="text-sm hover:underline">
              Terms of Service
            </a>
            <a href="#" className="text-sm hover:underline">
              Refund Policy
            </a>
          </div>
          <div className="grid gap-2">
            <h4 className="text-sm font-semibold">About</h4>
            <a href="#" className="text-sm hover:underline">
              Our Story
            </a>
            <a href="#" className="text-sm hover:underline">
              Our Team
            </a>
            <a href="#" className="text-sm hover:underline">
              Careers
            </a>
          </div>
          <div className="grid gap-2">
            <h4 className="text-sm font-semibold">Contact</h4>
            <div className="flex items-center gap-2">
              <PhoneIcon className="h-4 w-4" />
              <a href="#" className="text-sm hover:underline">
                +1 (234) 567-890
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MailIcon className="h-4 w-4" />
              <a href="#" className="text-sm hover:underline">
                support@spacebooth.com
              </a>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <YoutubeIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-6 text-center text-xs">
          <p>&copy; 2024 Spacebooth. All rights reserved.</p>
        </div>
      </footer>
    </Container>
  );
}
