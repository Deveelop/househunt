'use client'
import Link from "next/link"
import Image from "next/image"
import { FaBars } from "react-icons/fa"
import { useState } from "react"
import { IoClose } from "react-icons/io5"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 bg-white text-black shadow z-50">
      {/* Desktop Navbar */}
      <div className="container hidden sm:flex flex-col sm:flex-row justify-between items-center mx-auto py-4 px-8">
        <Link href='/' className="flex items-center text-2xl">
          <div className="w-12 mr-3">
            <Image src="/logo.png" alt="logo" className="w-[500px]" width={500} height={500} />
          </div>
          Houseek
        </Link>
        <div className="flex mt-4 sm:mt-0">
          <a className="px-4" href="#features">Contact Us</a>
          <Link className="px-4" href="/property">Properties</Link>
          <a className="px-4" href="#testimonials">About Us</a>
        </div>
        <div className="hidden md:block">
          <button
            type="button"
            className="py-3 px-8 text-sm bg-teal-500 hover:bg-teal-600 rounded text-white"
          >
            Register
          </button>
        </div>
      </div>

      {/* Mobile hamburger */}
      <div className="sm:hidden flex justify-between items-center px-6 py-4">
        <Link href="/" className="text-xl font-bold">Houseek</Link>
        <FaBars className="text-2xl cursor-pointer" onClick={() => setIsOpen(true)} />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <span className="text-xl font-bold">Menu</span>
          <IoClose className="text-2xl cursor-pointer" onClick={() => setIsOpen(false)} />
        </div>
        <nav className="flex flex-col p-4 space-y-4">
          <a href="#features" onClick={() => setIsOpen(false)}>Contact Us</a>
          <Link href="/property" onClick={() => setIsOpen(false)}>Properties</Link>
          <a href="#testimonials" onClick={() => setIsOpen(false)}>About Us</a>
          <Link href="/register" onClick={() => setIsOpen(false)} className="text-white bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded text-center">Register</Link>
        </nav>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </header>
  )
}

export default Navbar
