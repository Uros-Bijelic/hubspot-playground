import type { SVGProps } from "react";

// ----------------------------------------------------------------

const MenuIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="lucide lucide-menu"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M4 12h16M4 6h16M4 18h16" />
  </svg>
);
export default MenuIcon;
