'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuthContext } from '@/context/auth-context';
import { LifeBuoy, LogOut, Plus, User } from 'lucide-react';
import Link from 'next/link';
import LogoIcon from '../icons/Logo';
import MenuIcon from '../icons/Menu';

// ----------------------------------------------------------------

const Header = () => {
  const { logOutUser } = useAuthContext();

  return (
    <header className="flex-between h-14 bg-gray-200 px-2 sm:px-4">
      <Link href="/">
        <LogoIcon className="transition-colors hover:text-violet-500" />
      </Link>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <MenuIcon className="cursor-pointer transition-colors hover:text-violet-500" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link
                  href="/"
                  className="flex w-full items-center gap-2 px-2 py-1.5 [&>svg]:size-4"
                >
                  <User />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="/contacts/create"
                  className="flex w-full items-center gap-2 px-2 py-1.5 [&>svg]:size-4"
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
            <DropdownMenuItem className="px-2 py-1.5" onClick={logOutUser}>
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
