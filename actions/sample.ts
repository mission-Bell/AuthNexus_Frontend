"use server";
import { Inputs } from "@/app/sample/form-sample/page";

export interface Users {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: string;
  address: string;
}
export interface CostomError {
  code: number;
  message: string;
}

export const sample = () => {
  console.log("sample");
};

export const onSend = async (inputs: Inputs) => {
  if (inputs.username === "test") {
    throw new Error("Username is test");
  } else if (inputs.username === "err") {
    const error: CostomError = {
      code: 400,
      message: "Username is err",
    };
    //  throw error;
    return error;
  }

  console.log("onSend", inputs);
  return "onSend";
};
export const getData = async () => {
  console.log("getData");
  return { header, userdata };
};

export const postData = async (formData: FormData) => {
  console.log("postData", formData);
  return "postData";
};

const header = [
  "id",
  "name",
  "email",
  "phone",
  "website",
  "company",
  "address",
];
const cellValues = [
  [
    "1",
    "Leanne Graham",
    "xxx@mail.com",
    "1-770-736-8031 x56442",
    "hildegard.org",
    "Romaguera-Crona",
    "Dayna Park",
  ],
  [
    "2",
    "Ervin Howell",
    "xx@mail.com",
    "010-692-6593 x09125",
    "anastasia.net",
    "Deckow-Crist",
  ],
];

const userdata: Users[] = [
  {
    id: 1,
    name: "Leanne Graham",
    email: "xxx@mail.com",
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: "Romaguera-Crona",
    address: "Dayna Park",
  },
  {
    id: 2,
    name: "Ervin Howell",
    email: "xxx@mail.com",
    phone: "010-692-6593 x09125",
    website: "anastasia.net",
    company: "Deckow-Crist",
    address: "Kattie Turnpike",
  },
];
