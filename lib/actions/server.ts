"use server";

type GetContactsArgs = {
  limit?: number;
  archived?: boolean;
};

export const getContacts = async ({
  limit = 20,
  archived = false,
}: GetContactsArgs) => {
  const response = await fetch(
    `https://api.hubapi.com/crm/v3/objects/contacts?limit=${limit}&archived=${archived}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer pat-na1-144842ce-7e82-4ffb-a4b6-ed5ce258569c`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  return response.json();
};
