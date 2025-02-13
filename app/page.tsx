"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const response = fetch(
      "https://api.hubapi.com/crm/v3/objects/contacts?limit=30&archived=false",
      {
        headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}` },
      }
    )
      .then((response) => response.json())
      .then((data) => console.log("data", data));

    console.log("response", response);
    // console.log("respomnse", response);
  }, []);

  return <h1>This is init commit</h1>;
}

// curl --request GET \
//   --url 'https://api.hubapi.com/crm/v3/objects/contacts?limit=10&archived=false' \
//   --header 'authorization: Bearer YOUR_ACCESS_TOKEN'
