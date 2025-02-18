import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EllipsisVerticalIcon, Trash2Icon, UserIcon } from 'lucide-react';
import Link from 'next/link';

type Props = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

const ContactCard = ({ id, firstName, lastName, email }: Props) => {
  return (
    <div key={id} className="flex flex-col gap-2 p-2 shadow-md sm:p-4">
      <div className="flex-0 mx-auto w-min shrink-0 rounded-full bg-gray-200 p-2">
        <UserIcon width={30} height={30} className="" />
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-1 flex-col text-center">
          <p>
            {firstName} {lastName}
          </p>
          <p>{email}</p>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <EllipsisVerticalIcon className="cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Link href={`/contacts/${id}`} className="dropdown-menu-item">
                    <UserIcon />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="dropdown-menu-item [&>svg]:size-6">
                  <Trash2Icon />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
