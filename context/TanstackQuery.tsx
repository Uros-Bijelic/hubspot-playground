"use client";

import {
  QueryClient,
  QueryClientProvider as TanstackQueryProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { ReactNode } from "react";

type QueryClientProviderProps = {
  children: ReactNode;
};

const QueryClientProvider: React.FC<QueryClientProviderProps> = ({
  children,
}) => {
  const queryClient = new QueryClient();

  return (
    <TanstackQueryProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </TanstackQueryProvider>
  );
};

export default QueryClientProvider;
