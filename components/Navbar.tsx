"use client";

import clsx from "clsx";
import Link from "next/link";
import { Button } from "./ui/button";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logOut = () => {
    signOut({
      redirect: false,
    }); // signout redirects to / home page by default
    // pass redirect: false to signOut to prevent redirection
    toast.info("Logout successful");
    router.replace("/");
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
            <ul className="flex flex-col gap-3 items-center absolute top-full right-2 p-4 rounded-lg border border-gray-700 w-52">
              <li>
                <Link href="/" className="font-medium hover:animate-pulse">Home</Link>
              </li>
              <li>
                <Link href="/products" className="font-medium hover:animate-pulse">Shop</Link>
              </li>
              {session ? (
                <>
                  <li>
                    <Link href="/profile" className="font-medium hover:animate-pulse">Profile</Link>
                  </li>
                  <li>
                    <Button className="cursor-pointer" onClick={logOut}>Logout</Button>
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
        <ul className="hidden sm:flex space-x-4 items-center h-14">
          <li>
            <Link href="/" className="transition-all duration-300 hover:text-gray-600">Home</Link>
          </li>
          <li>
            <Link href="/products" className="transition-all duration-300 hover:text-gray-600">Shop</Link>
          </li>
          {session ? (
            <>
              <li>
                <Link href="/profile" className="transition-all duration-300 hover:text-gray-600">Profile</Link>
              </li>
              <li>
                <Button className="cursor-pointer" onClick={logOut}>Logout</Button>
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
        {/* <div></div> */}
      </div>
    </header>
  );
};

export default Navbar;
