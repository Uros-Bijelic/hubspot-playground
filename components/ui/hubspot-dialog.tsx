import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type { ReactNode } from 'react';

type Props = {
  triggerIcon: ReactNode;
  isOpen: boolean;
  onOpen: (value: boolean) => void;
  title?: ReactNode;
  content?: ReactNode;
};

const HubSpotDialog = ({ isOpen, onOpen, content, triggerIcon, title }: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpen}>
      <DialogTrigger>{triggerIcon}</DialogTrigger>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {/** This DialogDiscription component  */}
        <DialogDescription className="hidden" />

        <div>{content}</div>
      </DialogContent>
    </Dialog>
  );
};

export default HubSpotDialog;
