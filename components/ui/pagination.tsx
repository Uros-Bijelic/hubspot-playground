import { CircleChevronLeft, CircleChevronRight } from 'lucide-react';
import { Button } from './button';

type Props = {
  page: number;
  hasNextPage: boolean;
  onIncrementPage: () => void;
  onDecrementPage: () => void;
};

const buttonStyles =
  'h-auto w-auto bg-transparent p-0 shadow-none transition-none hover:bg-transparent [&_svg]:size-6';
const chevronStyles = 'cursor-pointer text-violet-500 transition-colors hover:text-violet-400';

const Pagination = ({ page, hasNextPage, onDecrementPage, onIncrementPage }: Props) => {
  return (
    <div className="flex gap-2">
      <Button className={buttonStyles} disabled={page === 1} onClick={onDecrementPage}>
        <CircleChevronLeft
          className={`${chevronStyles} ${page === 1 ? 'pointer-events-none opacity-50' : ''}`}
        />
      </Button>
      <div>{page}</div>
      <Button className={buttonStyles} disabled={!hasNextPage} onClick={onIncrementPage}>
        <CircleChevronRight
          className={`${chevronStyles} ${!hasNextPage ? 'pointer-events-none opacity-50' : ''}`}
        />
      </Button>
    </div>
  );
};

export default Pagination;
