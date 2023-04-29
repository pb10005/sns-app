import * as React from "react";
import Link from "next/link";
import {
  HomeIcon,
  UserIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";

const links = [
  {
    href: "/",
    label: "Home",
    icon: <HomeIcon className="inline-block h-5 w-5"></HomeIcon>,
  },
  {
    href: "/search",
    label: "Search",
    icon: (
      <MagnifyingGlassIcon className="inline-block h-5 w-5"></MagnifyingGlassIcon>
    ),
  },
  {
    href: "/profile",
    label: "Profile",
    icon: <UserIcon className="inline-block h-5 w-5"></UserIcon>,
  },
];

export const Sidebar: React.FC = () => {
  return (
    <>
      <section className="gap-1 divide-y">
        <div className="flex items-center justify-center bg-red-300 py-5">
          わたしのSNS
        </div>
        {links.map((l) => (
          <>
            <div key={l.label}>
              <Link href={l.href}>
                <div className="flex w-full items-center justify-center gap-1 px-4 py-2">
                  <span>{l.icon}</span>
                  <span className="hidden md:inline">{l.label}</span>
                </div>
              </Link>
            </div>
          </>
        ))}
      </section>
    </>
  );
};
