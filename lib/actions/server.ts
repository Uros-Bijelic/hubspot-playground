"use server";

type GetContactsArgs = {
  limit?: number;
  archived?: boolean;
};

export const getContacts = async ({
  limit = 30,
  archived = false,
}: GetContactsArgs) => {
  const response = await fetch(
    `https://api.hubapi.com/crm/v3/objects/contacts?limit=${limit}&archived=${archived}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  return response.json();
};
