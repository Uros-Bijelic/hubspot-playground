"use client";

import { getContacts } from "@/lib/actions/server";
import { QueryKeys } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  // const { data, isLoading, error } = useQuery({
  //   queryKey: [QueryKeys.CONTACTS],
  //   queryFn: () => getContacts()}

  const { data, error, isLoading } = useQuery({
    queryKey: [QueryKeys.CONTACTS],
    queryFn: () => getContacts({}),
  });

  console.log("data iz react query-ja", data);

  return <h1>This is init commit</h1>;
};

export default Home;
