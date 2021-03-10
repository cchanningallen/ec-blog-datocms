import Link from "next/link";
import NavLink from "./nav-link";

export default function Header() {
  return (
    <div className="mb-20 mt-8 flex justify-between w-full">
      <div>
        <Link href="/">
          <a className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight hover:underline font-fancy">
            E / C
          </a>
        </Link>
      </div>

      <div className="flex items-center">
        <NavLink href="/about-us">{"About Us"}</NavLink>
        <NavLink href="/adventures-destinations">
          {"Adventures & Destinations"}
        </NavLink>
        <NavLink href="/resources-rudders">{"Resources & Rudders"}</NavLink>
        <NavLink href="/travel-records">{"Travel Records"}</NavLink>
      </div>
    </div>
  );
}
