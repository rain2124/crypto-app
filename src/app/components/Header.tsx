"use client";
import { useContext, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import LogoutButton from "@/app/components/LogoutButton";
import { AuthContext } from "../contexts/AuthContext";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { session } = useContext(AuthContext);
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-bold">
          Crypto News
        </Link>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="text-white w-6 h-6" /> : <Menu className="text-white w-6 h-6" />}
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-white items-center">
          <li>
            <Link href="/">Home</Link>
          </li>
          {session ? <></> : <li><Link href="/signin">SignIn</Link></li> }
          <li>
            <Link href="/signup">SignUp</Link>
          </li>
          <li>
            <Link href="/calender">Calender</Link>
          </li>
          {session ? <li><LogoutButton /></li> : <></> }
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden bg-blue-700 text-white flex flex-col space-y-4 p-4 mt-[10px]">
          <li>
            <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
          </li>
          {session ? <></> : <li><Link href="/signin" onClick={() => setIsOpen(false)}>SignIn</Link></li> }
          <li>
            <Link href="/signup" onClick={() => setIsOpen(false)}>SignUp</Link>
          </li>
          <li>
            <Link href="/calender" onClick={() => setIsOpen(false)}>calender</Link>
          </li>
          {session ? <li><LogoutButton /></li> : <></> }
        </ul>
      )}
    </nav>
  );
}