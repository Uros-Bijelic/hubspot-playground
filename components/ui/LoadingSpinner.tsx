import { LoaderPinwheelIcon } from 'lucide-react';

type LoadingSpinnerProps = {
  asOverlay?: boolean;
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ asOverlay }) => {
  return (
    <div
      className={
        asOverlay
          ? 'absolute left-0 top-0 z-[1000000] flex h-screen w-full items-center justify-center bg-[rgba(0,0,0,0.9)]'
          : ''
      }
    >
      <LoaderPinwheelIcon width={50} height={50} className="animate-spin text-violet-500" />
    </div>
  );
};

export default LoadingSpinner;
