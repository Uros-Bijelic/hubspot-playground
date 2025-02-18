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
import {
  LayoutDashboardIcon,
  LifeBuoyIcon,
  LogOutIcon,
  PlusIcon,
  ScrollIcon,
  SquareMenuIcon,
  UserIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

// ----------------------------------------------------------------

const Header = () => {
  const { logOutUser } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex-between h-14 bg-gray-200 px-2 sm:px-4">
      <Link href="/">
        <ScrollIcon width={34} height={34} className="transition-colors hover:text-violet-500" />
      </Link>
      <div>
        <DropdownMenu onOpenChange={setIsOpen} open={isOpen}>
          <DropdownMenuTrigger asChild>
            <SquareMenuIcon className="cursor-pointer transition-colors hover:text-violet-500" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" onCloseAutoFocus={(e) => e.preventDefault()}>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => setIsOpen(false)}>
                <Link
                  href="/"
                  className="flex w-full items-center gap-2 px-2 py-1.5 [&>svg]:size-4"
                >
                  <LayoutDashboardIcon />
                  <span>Home</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsOpen(false)}>
                <Link
                  href="/"
                  className="flex w-full items-center gap-2 px-2 py-1.5 [&>svg]:size-4"
                >
                  <UserIcon />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsOpen(false)}>
                <Link
                  href="/contacts/create"
                  className="flex w-full items-center gap-2 px-2 py-1.5 [&>svg]:size-4"
                  onClick={() => setIsOpen(false)}
                >
                  <PlusIcon />
                  <span>New Contact</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuItem className="px-2 py-1.5">
              <LifeBuoyIcon />
              <span>Support</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="px-2 py-1.5" onClick={logOutUser}>
              <LogOutIcon />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
