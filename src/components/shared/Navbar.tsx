import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { currentUser, removeUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { MenuIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Logo from "../ui/Logo";
import { toast } from "../ui/use-toast";
import Container from "./Container";
import NavMenus from "./NavMenus";
import { ThemeToggle } from "./ThemeToggle";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const user = useAppSelector(currentUser);
  const dispatch = useAppDispatch();

  const [logoutFn] = useLogoutMutation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    try {
      dispatch(removeUser());
      const res = await logoutFn(undefined).unwrap();
      toast({
        title: res?.message,
        duration: 2000,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <header
      className={`sticky top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-glass-white backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <Container className="py-2 lg:py-0 flex justify-between">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="lg:hidden">
            <nav className="flex flex-col justify-between">
              <Link to="/" className="cursor-pointer">
                <div className="flex items-center">
                  <Logo />
                  <h3 className="text-lg font-bold">SpaceBooth</h3>
                </div>
              </Link>
              <div>
                <NavMenus />
              </div>
              <div className="flex items-center gap-5">
                {user ? (
                  <>
                    <Button onClick={handleLogout} variant="outline">
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <Button variant="outline">Login</Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </SheetContent>
          <div className="lg:hidden flex items-center gap-5">
            {user ? (
              <>
                <ThemeToggle />
                <Avatar>
                  <AvatarImage src={user?.image} alt="user" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </>
            ) : (
              <>
                <ThemeToggle />
              </>
            )}
          </div>
        </Sheet>
      </Container>
      <Container>
        <nav className="hidden lg:flex justify-between items-center">
          <Link to="/" className="cursor-pointer">
            <div className="flex items-center">
              <Logo />
              <h3 className="text-lg font-bold">SpaceBooth</h3>
            </div>
          </Link>
          <div>
            <NavMenus />
          </div>
          <div className="flex items-center gap-5">
            {user ? (
              <>
                <ThemeToggle />
                <Button onClick={handleLogout} variant="outline">
                  Logout
                </Button>
                <Avatar>
                  <AvatarImage src={user?.image} alt="user" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <ThemeToggle />
              </>
            )}
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Navbar;
