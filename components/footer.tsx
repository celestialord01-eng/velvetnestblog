import Link from "next/link"

import {
  Mail,
} from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

/* =========================================================
   FOOTER LINKS
========================================================= */

const footerLinks = {

  explore: [
    {
      href: "/blog",
      label: "Blog",
    },

    {
      href: "/amazon-finds",
      label: "Amazon Finds",
    },

    {
      href: "/blog?category=fashion",
      label: "Fashion",
    },

    {
      href: "/blog?category=home-decor",
      label: "Home Decor",
    },

    {
      href: "/blog?category=beauty",
      label: "Beauty",
    },
  ],

  company: [
    {
      href: "/about",
      label: "About",
    },

    {
      href: "/contact",
      label: "Contact",
    },

    {
      href: "/privacy-policy",
      label: "Privacy Policy",
    },

    {
      href: "/affiliate-disclosure",
      label: "Affiliate Disclosure",
    },
  ],
}

/* =========================================================
   FOOTER
========================================================= */

export function Footer() {

  return (

    <footer
      className="
        border-t
        border-border
        bg-background
      "
    >

      {/* NEWSLETTER */}

      <section
        className="
          border-b
          border-border
          py-24
        "
      >

        <div
          className="
            mx-auto
            max-w-3xl
            px-5
            text-center
          "
        >

          <p
            className="
              text-[11px]
              uppercase
              tracking-[0.28em]
              text-muted-foreground
            "
          >
            Join The Community
          </p>

          <h2
            className="
              mt-5
              font-serif
              text-[3rem]
              leading-[0.95]
              tracking-[-0.05em]
              text-foreground
              md:text-[4.8rem]
            "
          >
            Curated inspiration for beautiful living.
          </h2>

          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-[1.1rem]
              leading-9
              text-[#6c6058]
            "
          >
            Receive weekly fashion inspiration,
            cozy home decor ideas, beauty favorites,
            and elevated lifestyle finds directly in your inbox.
          </p>

          <form
            className="
              mx-auto
              mt-10
              flex
              max-w-xl
              flex-col
              gap-4
              sm:flex-row
            "
          >

            <Input
              type="email"
              required
              placeholder="Enter your email"
              className="
                h-14
                rounded-full
                border-border
                bg-card
                px-6
                text-base
                shadow-none
                focus-visible:ring-1
                focus-visible:ring-[#b89c83]
              "
            />

            <Button
              type="submit"
              className="
                h-14
                rounded-full
                bg-[#2c2623]
                px-8
                text-[12px]
                uppercase
                tracking-[0.18em]
                text-white
                hover:bg-black
              "
            >
              Subscribe
            </Button>

          </form>

          <p
            className="
              mt-5
              text-xs
              text-muted-foreground
            "
          >
            No spam. Unsubscribe anytime.

            {" "}

            <Link
              href="/privacy-policy"
              className="
                underline
                underline-offset-4
              "
            >
              Privacy Policy
            </Link>

          </p>

        </div>

      </section>

      {/* MAIN FOOTER */}

      <section className="py-20">

        <div
          className="
            mx-auto
            max-w-7xl
            px-5
          "
        >

          <div
            className="
              grid
              gap-16
              md:grid-cols-[1.3fr_0.7fr_0.7fr]
            "
          >

            {/* BRAND */}

            <div>

              <Link
                href="/"
                className="inline-block"
              >

                <h2
                  className="
                    font-serif
                    text-[3rem]
                    leading-none
                    tracking-[-0.05em]
                    text-foreground
                  "
                >
                  VelvetNest
                </h2>

              </Link>

              <p
                className="
                  mt-6
                  max-w-md
                  text-[1rem]
                  leading-8
                  text-[#6c6058]
                "
              >
                A cozy destination for curated fashion,
                elegant interiors, beauty rituals,
                and intentional living inspiration.
              </p>

              {/* SOCIALS */}

              <div
                className="
                  mt-8
                  flex
                  items-center
                  gap-5
                "
              >

                {/* PINTEREST */}

                <Link
                  href="https://www.pinterest.com/velvetnestworld/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Pinterest"
                  className="
                    text-muted-foreground
                    transition
                    hover:text-foreground
                  "
                >

                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >

                    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />

                  </svg>

                </Link>

                {/* EMAIL */}

                <Link
                  href="mailto:velvetnest.contact@gmail.com"
                  aria-label="Email"
                  className="
                    text-muted-foreground
                    transition
                    hover:text-foreground
                  "
                >

                  <Mail className="h-5 w-5" />

                </Link>

              </div>

            </div>

            {/* EXPLORE */}

            <div>

              <h4
                className="
                  text-[11px]
                  uppercase
                  tracking-[0.25em]
                  text-muted-foreground
                "
              >
                Explore
              </h4>

              <ul className="mt-6 space-y-4">

                {footerLinks.explore.map(
                  (link) => (

                    <li key={link.href}>

                      <Link
                        href={link.href}
                        className="
                          text-[15px]
                          text-[#6c6058]
                          transition
                          hover:text-foreground
                        "
                      >
                        {link.label}
                      </Link>

                    </li>

                  )
                )}

              </ul>

            </div>

            {/* COMPANY */}

            <div>

              <h4
                className="
                  text-[11px]
                  uppercase
                  tracking-[0.25em]
                  text-muted-foreground
                "
              >
                Company
              </h4>

              <ul className="mt-6 space-y-4">

                {footerLinks.company.map(
                  (link) => (

                    <li key={link.href}>

                      <Link
                        href={link.href}
                        className="
                          text-[15px]
                          text-[#6c6058]
                          transition
                          hover:text-foreground
                        "
                      >
                        {link.label}
                      </Link>

                    </li>

                  )
                )}

              </ul>

            </div>

          </div>

          {/* BOTTOM */}

          <div
            className="
              mt-20
              flex
              flex-col
              items-center
              justify-between
              gap-4
              border-t
              border-border
              pt-8
              text-sm
              text-muted-foreground
              md:flex-row
            "
          >

            <p>
              © {new Date().getFullYear()} VelvetNest.
              All rights reserved.
            </p>

            <p>
              Designed for slow, beautiful living.
            </p>

          </div>

        </div>

      </section>

    </footer>
  )
                }
