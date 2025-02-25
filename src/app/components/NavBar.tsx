"use client";

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { myProfile } from "../lib/getData";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { IUser } from "../interfaces/user.interface";

const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
  { name: "Reports", href: "#", current: false },
];

const userNavigation = [
  { name: "Your Profile", href: "/my-porfile" },
  { name: "Sign out", href: "#" },
];

const handleSignOut = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("titanToken");
  window.location.href = "/";
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar({ onSearch }: { onSearch?: (query: any) => void }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [searchKey, setSearchKey] = useState("");

  const fetchUserProfile = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) return;

    try {
      const userData = await myProfile();
      setUser(userData.data);
    } catch (error) {
      localStorage.removeItem("accessToken");
      console.error("Lỗi khi lấy thông tin người dùng:", error.response.data);
    }
  };
  const router = useRouter();
  const handleSearch = () => {
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set("searchKey", searchKey);

    router.push(`/blog?${currentParams.toString()}`);

    if (onSearch) {
      onSearch({ searchKey });
    }
  };



  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div className="min-h-full">
      <Disclosure as="nav" className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/">
                <div className="shrink-0">
                  <img
                    alt="project A"
                    src="/logo.gif"
                    className="w-14 h-14 rounded-full border border-gray flex items-center justify-center"
                  />
                </div>
              </Link>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      aria-current={item.current ? "page" : undefined}
                      className={classNames(
                        item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                    >
                      {item.name}
                    </a>
                  ))}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search posts..."
                      className="p-2 rounded bg-gray-700 text-white"
                      value={searchKey}
                      onChange={(e) => setSearchKey(e.target.value)}
                    />
                    <button onClick={() => handleSearch()}><FontAwesomeIcon icon={faSearch} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" /></button>
                  </div>
                </div>
              </div>
            </div>

            {/* Hiển thị người dùng nếu đã đăng nhập */}
            {user ? (
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <button
                    type="button"
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon aria-hidden="true" className="size-6" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none">
                        <span className="sr-only">Open user menu</span>
                        <img
                          alt="User avatar"
                          src={user.avatar ? `https://titan-blog.s3.amazonaws.com/${user.avatar}` : "/avatar.png"}
                          className="size-8 rounded-full"
                        />
                      </MenuButton>
                    </div>
                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5">
                      {userNavigation.map((item) => (
                        <MenuItem key={item.name}>
                          <a
                            href={item.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={item.name === "Sign out" ? handleSignOut : undefined}
                          >
                            {item.name}
                          </a>
                        </MenuItem>
                      ))}
                    </MenuItems>
                  </Menu>
                </div>
              </div>
            ) : (
              <a href="/login" className="text-white">
                Login/Register
              </a>
            )}

            {/* Mobile menu button */}
            <div className="-mr-2 flex md:hidden">
              <DisclosureButton className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none">
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="block size-6" />
              </DisclosureButton>
            </div>
          </div>
        </div>
      </Disclosure>
    </div>
  );
}
