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
import { useDeleteContact } from '@/lib/hooks/mutations/use-delete-contact';
import { generateInitials } from '@/lib/utils';
import { EllipsisVerticalIcon, PencilIcon, Trash2Icon, UserIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

type Props = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

const ContactCard = ({ id, firstName, lastName, email }: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { mutateAsync: deleteContactAsync } = useDeleteContact();

  const toggleDialog = (open: boolean) => {
    setIsDialogOpen(open);
  };

  const deleteContact = async () => {
    try {
      await deleteContactAsync(id, {
        onSuccess() {
          toast.success('Contact was successfully deleted');
          setIsDialogOpen(false);
        },
        onError(error) {
          toast.error(error.message || 'Something went wrong!');
        },
      });
    } catch (error) {
      console.log('Error deleting contact', error);
    }
  };

  const cancelDeletingContact = () => {
    setIsDialogOpen(false);
    setIsDropdownOpen(false);
  };

  return (
    <div key={id} className="flex flex-col gap-2 p-2 shadow-md sm:p-4">
      <div className="flex-center mx-auto size-10 rounded-full bg-gray-200 text-violet-500">
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
            <DropdownMenuContent align="end" onCloseAutoFocus={(e) => e.preventDefault()}>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Link href={`/contacts/${id}`} className="dropdown-menu-item">
                    <UserIcon />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={`/contacts/${id}/edit`} className="dropdown-menu-item">
                    <PencilIcon />
                    <span>Edit</span>
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
