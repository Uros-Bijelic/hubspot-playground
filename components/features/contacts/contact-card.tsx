import { EllipsisVerticalIcon, UserIcon } from 'lucide-react';

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
          <EllipsisVerticalIcon className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
