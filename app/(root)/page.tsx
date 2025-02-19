'use client';

import ContactCard from '@/components/features/contacts/contact-card';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Pagination from '@/components/ui/pagination';
import { useGetContacts } from '@/lib/hooks/queries/use-get-contacts';
import { useGetSpecificOwner } from '@/lib/hooks/queries/use-get-specific-owner';
import { useEffect, useState } from 'react';

const Home = () => {
  const [page, setPage] = useState(1);
  const [apiPages, setApiPages] = useState<{
    before: string | undefined;
    after: string | undefined;
  }>({ before: '', after: '' });
  const [urlToFetch, setUrlToFetch] = useState(apiPages.after);
  const { isLoading, data: contactsData, refetch } = useGetContacts(page, urlToFetch);
  const { data: owner } = useGetSpecificOwner({});

  const ownerFullName = `${owner?.firstName} ${owner?.lastName}`;

  const handleIncrementPage = () => {
    setPage((prevPage) => prevPage + 1);
    setUrlToFetch(apiPages.after);
    refetch();
  };

  const handleDecrementPage = () => {
    setPage((prevPage) => prevPage - 1);
    setUrlToFetch(apiPages.before);
    refetch();
  };

  useEffect(() => {
    if (contactsData?.paging?.next.link && page === 1) {
      setApiPages(() => ({ before: '', after: contactsData?.paging?.next.link }));
    } else if (contactsData?.paging?.next.link && page > 1) {
      setApiPages((prevApiPages) => ({
        before: prevApiPages.after,
        after: contactsData?.paging?.next.link,
      }));
    }
  }, [contactsData, page]);

  if (isLoading) {
    return <LoadingSpinner asOverlay />;
  }

  if (!owner) {
    return <div className="h1-medium mx-auto my-5 text-center">User in not authenticated!</div>;
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 sm:gap-4 sm:p-5">
      <h2 className="d2-bold">Hello {ownerFullName}</h2>
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 border-2 border-green-400">LEFT</div>
        <div className="flex flex-col gap-4">
          <div className="grid flex-1 grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
            {contactsData?.results.map(({ id, properties }) => (
              <ContactCard
                key={id}
                id={id}
                firstName={properties.firstname}
                lastName={properties.lastname}
                email={properties.email}
              />
            ))}
          </div>
          <div className="flex-center">
            <Pagination
              page={page}
              hasNextPage={!!contactsData?.paging?.next.link}
              onIncrementPage={handleIncrementPage}
              onDecrementPage={handleDecrementPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
