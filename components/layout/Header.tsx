import Link from "next/link";
import LogoIcon from "../icons/Logo";

import { LifeBuoy, LogOut, Plus, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MenuIcon from "../icons/Menu";

// ----------------------------------------------------------------

const Header = () => {
  return (
    <header className="bg-gray-200 px-2 sm:px-4 h-14 flex-between">
      <Link href="/">
        <LogoIcon className="hover:text-violet-500 transition-colors" />
      </Link>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <MenuIcon className="cursor-pointer hover:text-violet-500 transition-colors" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link
                  href="/"
                  className="flex items-center gap-2 [&>svg]:size-4 w-full px-2 py-1.5"
                >
                  <User />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="/contacts/create"
                  className="flex items-center gap-2 [&>svg]:size-4 w-full px-2 py-1.5"
                >
                  <Plus />
                  <span>New Contact</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuItem className="px-2 py-1.5">
              <LifeBuoy />
              <span>Support</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="px-2 py-1.5">
              <LogOut />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
