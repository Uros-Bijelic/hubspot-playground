import { cn } from '@/lib/utils';
import { LoaderPinwheelIcon } from 'lucide-react';
import { Button, ButtonProps } from './button';

type Props = {
  isLoading?: boolean;
} & ButtonProps;

const HubspotButton = ({ children, isLoading, className }: Props) => {
  return (
    <Button className={cn('bg-violet-500 hover:bg-violet-400', className)}>
      {isLoading && <LoaderPinwheelIcon className="animate-spin" />} {children}
    </Button>
  );
};

export default HubspotButton;
