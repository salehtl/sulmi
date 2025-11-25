import { Link } from '@tanstack/react-router'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigationItems = [
    { label: 'Home', to: '/' },
    { label: 'Simple Form', to: '/demo/form/simple' },
    { label: 'Address Form', to: '/demo/form/address' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="relative">
        <ul
          data-orientation="horizontal"
          className="m-0 hidden list-none grid-cols-3 px-4 py-3 lg:gap-2 lg:p-4 min-[1200px]:grid"
          dir="ltr"
        >
          {/* Left Navigation */}
          <li
            className="mr-auto flex flex-1 items-center"
            data-ga-section="left-nav"
          >
            <div style={{ position: 'relative' }}>
              <ul
                data-orientation="horizontal"
                className="m-0 flex list-none gap-2 p-0"
                dir="ltr"
              >
                {/* Desktop Navigation Menu */}
                <NavigationMenu.Root>
                  <NavigationMenu.List className="m-0 flex list-none gap-2 p-0">
                    {navigationItems.map((item) => (
                      <NavigationMenu.Item key={item.to}>
                        <NavigationMenu.Link asChild>
                          <Link
                            to={item.to}
                            className="flex h-full w-full cursor-pointer items-center justify-center border-none px-4 py-2 no-underline transition-all duration-300 ease-in hover:bg-gray-100 text-sm font-semibold rounded-2xl bg-white text-gray-900"
                            activeProps={{
                              className:
                                'flex h-full w-full cursor-pointer items-center justify-center border-none px-4 py-2 no-underline transition-all duration-300 ease-in hover:bg-gray-100 text-sm font-semibold rounded-2xl bg-white text-gray-900 underline',
                            }}
                          >
                            <p className="my-0 font-semibold text-sm leading-none">
                              {item.label}
                            </p>
                          </Link>
                        </NavigationMenu.Link>
                      </NavigationMenu.Item>
                    ))}
                  </NavigationMenu.List>
                </NavigationMenu.Root>
              </ul>
            </div>
          </li>

          {/* Center Navigation - Logo */}
          <li
            className="flex items-center justify-center"
            data-ga-section="center-nav"
          >
            <Link to="/" className="flex items-center">
              <img
                src="/logo-dark.svg"
                alt="Sulmi Performance Electric Bikes"
                className="h-5 w-auto"
              />
            </Link>
          </li>

          {/* Right Navigation */}
          <li
            className="mr-auto w-full flex-1 justify-end lg:flex"
            data-ga-section="right-nav"
          >
            <div style={{ position: 'relative' }}>
              <ul
                data-orientation="horizontal"
                className="m-0 flex h-full list-none items-center gap-2 p-0"
                dir="ltr"
              >
                <li
                  data-testid="Demo Drive"
                  data-ga-id="Demo Drive"
                  className="duration-300 ease transition-all opacity-100 visible bg-transparent h-full"
                >
                  <a
                    href="/demo-drive/book"
                    className="flex h-full w-full cursor-pointer items-center justify-center border-none px-4 py-2 no-underline transition-all duration-300 ease-in text-sm font-medium rounded-2xl bg-yellow-400 text-gray-900 hover:bg-yellow-500"
                  >
                    <p className="my-0 text-sm leading-[18px] tracking-[-0.035px]">
                      Demo Drive
                    </p>
                  </a>
                </li>
                <li
                  data-ga-section="account"
                  className="duration-300 ease transition-all opacity-100 visible bg-transparent w-fit h-full"
                >
                  <a
                    href="/account"
                    data-ga-id="gn-account"
                    data-testid="gn-account"
                    className="flex h-full w-full cursor-pointer items-center justify-center border-none px-4 py-2 no-underline transition-all duration-300 ease-in hover:bg-gray-100 text-sm font-medium rounded-2xl bg-white text-gray-900"
                  >
                    <p className="my-0 text-sm leading-[18px] tracking-[-0.035px]">
                      Sign In
                    </p>
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>

        {/* Mobile Layout */}
        <div className="flex items-center justify-between px-4 py-3 lg:hidden">
          <Dialog.Root
            open={isMobileMenuOpen}
            onOpenChange={setIsMobileMenuOpen}
          >
            <Dialog.Trigger asChild>
              <button
                aria-label="hamburger"
                className="flex h-[40px] w-[40px] cursor-pointer flex-col justify-center rounded-2xl border-none p-[10px] transition-colors duration-300 active:bg-gray-100 bg-white"
                aria-expanded={isMobileMenuOpen}
              >
                <div
                  className={`ease my-[2px] h-[2px] w-[20px] transition duration-300 ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-1' : 'rotate-0'
                  } bg-gray-900`}
                ></div>
                <div
                  className={`ease my-[2px] h-[2px] w-[20px] transition duration-300 ${
                    isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  } bg-gray-900`}
                ></div>
                <div
                  className={`ease my-[2px] h-[2px] w-[20px] transition duration-300 ${
                    isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'rotate-0'
                  } bg-gray-900`}
                ></div>
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
              <Dialog.Content className="fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 flex flex-col">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900">
                    Navigation
                  </h2>
                  <Dialog.Close asChild>
                    <button
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      aria-label="Close menu"
                    >
                      <X size={24} className="text-gray-900" />
                    </button>
                  </Dialog.Close>
                </div>
                <nav className="flex-1 p-4 overflow-y-auto">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors mb-2 text-gray-900"
                      activeProps={{
                        className:
                          'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2 text-white',
                      }}
                    >
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ))}
                </nav>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>

          <Link to="/" className="flex items-center">
            <img
              src="/logo-dark.svg"
              alt="Sulmi Performance Electric Bikes"
              className="h-12 w-auto"
            />
          </Link>

          <div className="flex items-center gap-2">
            <a
              href="/demo-drive/book"
              className="px-3 py-2 text-xs font-medium rounded-2xl bg-yellow-400 text-gray-900 hover:bg-yellow-500 transition-colors"
            >
              Demo Drive
            </a>
            <a
              href="/account"
              className="px-3 py-2 text-xs font-medium rounded-2xl bg-white text-gray-900 hover:bg-gray-100 transition-colors"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
