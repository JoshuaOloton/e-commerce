"use client";

import clsx from "clsx";
import Link from "next/link";
import NotificationsPane from "./NotificationsPane";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { data: session } = useSession();
  console.log(session);
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logOut = () => {
    if (!session) return;
    // if session is not available, do nothing
    signOut({
      redirect: false,
    }); // signout redirects to / home page by default
    // pass redirect: false to signOut to prevent redirection
    toast.info("Logout successful");

    if (session.user.role === 'user') {
      router.replace("/") 
    } else {
      router.replace("/home");
    }
  };

  return (
    <header>
      <div className="flex justify-between items-center px-4 relative border border-gray-400 font-jost">
        <div className="logo font-bold tracking-wider uppercase">
          <Link href={"/"}>Daniel&rsquo;s Empire</Link>
        </div>

        {/* Mobile Nav */}
        <div className="sm:hidden h-10 flex items-center">
          <User
            size={26}
            onClick={() => setIsMenuOpen((prevState) => !prevState)}
            className={clsx("cursor-pointer rounded-full p-0.5", {
              "bg-gray-300": isMenuOpen,
            })}
          />
          {isMenuOpen && (
            <ul className="flex flex-col gap-3 items-center absolute top-full right-2 p-4 rounded-lg border border-gray-700 w-52 bg-gray-200 shadow-lg z-10">
              <li>
                <Link href="/" className="font-medium hover:animate-pulse">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="font-medium hover:animate-pulse"
                >
                  Shop
                </Link>
              </li>
              {session ? (
                <>
                  <li>
                    <Link
                      href="/profile"
                      className="font-medium hover:animate-pulse"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Button className="cursor-pointer" onClick={logOut}>
                      Logout
                    </Button>
                  </li>
                </>
              ) : (
                <li>
                  <Link href="/login">
                    <Button className="cursor-pointer">Login</Button>
                  </Link>
                </li>
              )}
            </ul>
          )}
        </div>

        {/* Desktop Nav */}
        <ul className="hidden sm:flex space-x-4 items-center h-16 py-2">
          <li>
            <Link
              href="/"
              className="transition-all duration-300 hover:text-gray-600"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/products"
              className="transition-all duration-300 hover:text-gray-600"
            >
              Shop
            </Link>
          </li>
          {session ? (
            <>
              <li>
                <Link
                  href="/profile"
                  className="transition-all duration-300 hover:text-gray-600"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Button className="cursor-pointer" onClick={logOut}>
                  Logout
                </Button>
              </li>
              <Separator orientation="vertical" className="bg-gray-500" />
              <li>
                <NotificationsPane />
              </li>
            </>
          ) : (
            <li>
              <Button className="cursor-pointer" asChild>
                <Link href="/login">Login</Link>
              </Button>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
