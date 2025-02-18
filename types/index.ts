export interface IContactsDTO {
  id: string;
  properties: {
    createdate: string;
    email: string;
    firstname: string;
    hs_object_id: string;
    lastmodifieddate: string;
    lastname: string;
  };
  createdAt: string;
  updatedAt: string;
  archived: false;
}

export type Owner = {
  archived: boolean;
  createdAt: string;
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  type: string;
  updatedAt: string;
  userId: number;
  userIdIncludingInactive: number;
};
