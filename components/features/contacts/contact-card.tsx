'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import HubspotButton from '@/components/ui/hubspot-button';
import HubSpotDialog from '@/components/ui/hubspot-dialog';
import { EllipsisVerticalIcon, Trash2Icon, UserIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

type Props = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export const generateInitials = (firstName = '', lastName = '') => {
  if (!firstName || (firstName === '' && !lastName) || lastName === '') {
    return 'N/A';
  }

  if (!lastName || (lastName === '' && firstName && firstName !== '')) {
    return firstName.charAt(0).toUpperCase();
  } else if (!firstName || (firstName === '' && lastName && lastName !== '')) {
    return lastName.charAt(0).toUpperCase();
  }

  return `${firstName.charAt(0)}${lastName.charAt(0)}`;
};

const ContactCard = ({ id, firstName, lastName, email }: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleDialog = (open: boolean) => {
    setIsDialogOpen(open);
  };

  const deleteContact = () => {
    console.log('delete contact');
  };

  const cancelDeletingContact = () => {
    setIsDialogOpen(false);
    setIsDropdownOpen(false);
  };

  return (
    <div key={id} className="flex flex-col gap-2 p-2 shadow-md sm:p-4">
      <div className="flex-0 mx-auto w-min shrink-0 rounded-full bg-gray-200 p-2 text-violet-500">
        {generateInitials(firstName, lastName)}
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-1 flex-col text-center">
          <p>
            {firstName && firstName} {lastName && lastName}
          </p>
          <p>{email}</p>
        </div>
        <div>
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
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
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <HubSpotDialog
                    isOpen={isDialogOpen}
                    onOpen={toggleDialog}
                    triggerIcon={
                      <div className="dropdown-menu-item">
                        <Trash2Icon />
                        <span>Delete</span>
                      </div>
                    }
                    title={<p>Are you sure you want to delete this contact?</p>}
                    content={
                      <div className="flex justify-end gap-2">
                        <HubspotButton type="button" onClick={deleteContact}>
                          Delete
                        </HubspotButton>
                        <HubspotButton
                          className="border-2 border-violet-500 bg-transparent text-black hover:bg-violet-500 hover:text-white"
                          type="button"
                          onClick={cancelDeletingContact}
                        >
                          Cancel
                        </HubspotButton>
                      </div>
                    }
                  />
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
