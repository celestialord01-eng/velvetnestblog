                "use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Search, Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/amazon-finds", label: "Amazon Finds" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

const categories = [
  "Fashion",
  "Outfit Ideas",
  "Home Decor",
  "Beauty",
  "Self Care",
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-white/80 backdrop-blur-md">
      
      <div className="mx-auto max-w-7xl px-4">
        
        <div className="flex h-16 items-center justify-between md:h-20">
          
          {/* Mobile Menu Button */}
          <button
            className="transition-all duration-300 active:scale-90 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="transition-all duration-300 hover:opacity-80"
          >
            <div className="flex items-center gap-2">
              
              <Image
                src="/logo.png"
                alt="VelvetNest Logo"
                width={40}
                height={40}
                className="transition-transform duration-500 hover:scale-105"
              />

              <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
                VelvetNest
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            
            {navLinks.map((link) => (
              
              <Link
                key={link.href}
                href={link.href}
                className="
                  relative
                  text-sm
                  font-medium
                  uppercase
                  tracking-[0.2em]
                  text-foreground/80
                  transition-all
                  duration-300
                  hover:text-foreground
                  after:absolute
                  after:left-0
                  after:-bottom-1
                  after:h-[1px]
                  after:w-0
                  after:bg-current
                  after:transition-all
                  after:duration-300
                  hover:after:w-full
                "
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center gap-4">
            
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="
                text-foreground/80
                transition-all
                duration-300
                hover:text-foreground
                hover:scale-110
                active:scale-95
              "
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Pinterest */}
            <Link
              href="https://pinterest.com/velvetnestworld/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                hidden
                text-foreground/80
                transition-all
                duration-300
                hover:text-foreground
                hover:scale-110
                active:scale-95
                md:block
              "
              aria-label="Pinterest"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="animate-fade-in border-t border-border py-4">
            
            <form className="mx-auto flex max-w-md gap-2">
              
              <Input
                type="search"
                placeholder="Search articles, products..."
                className="
                  flex-1
                  border-border
                  bg-card
                  transition-all
                  duration-300
                  focus:shadow-lg
                "
              />

              <Button type="submit" variant="default">
                Search
              </Button>
            </form>
          </div>
        )}

        {/* Categories */}
        <div className="hidden border-t border-border/50 py-3 md:block">
          
          <div className="flex items-center justify-center gap-8">
            
            {categories.map((category) => (
              
              <Link
                key={category}
                href={`/blog?category=${category.toLowerCase().replace(" ", "-")}`}
                className="
                  relative
                  text-xs
                  font-medium
                  uppercase
                  tracking-[0.2em]
                  text-muted-foreground
                  transition-all
                  duration-300
                  hover:text-foreground
                  after:absolute
                  after:left-0
                  after:-bottom-1
                  after:h-[1px]
                  after:w-0
                  after:bg-current
                  after:transition-all
                  after:duration-300
                  hover:after:w-full
                "
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        
        <div className="animate-fade-in border-t border-border bg-background/95 backdrop-blur-md md:hidden">
          
          <nav className="flex flex-col px-4 py-4">
            
            {navLinks.map((link) => (
              
              <Link
                key={link.href}
                href={link.href}
                className="
                  border-b
                  border-border
                  py-3
                  text-sm
                  font-medium
                  uppercase
                  tracking-widest
                  transition-all
                  duration-300
                  hover:pl-2
                "
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-4 flex flex-wrap gap-2">
              
              {categories.map((category) => (
                
                <Link
                  key={category}
                  href={`/blog?category=${category.toLowerCase().replace(" ", "-")}`}
                  className="
                    rounded-full
                    border
                    border-border
                    bg-secondary
                    px-3
                    py-1
                    text-xs
                    font-medium
                    uppercase
                    tracking-wider
                    transition-all
                    duration-300
                    hover:scale-105
                    hover:shadow-md
                    active:scale-95
                  "
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
      }
