"use server";

export const getData = async () => {
  //console.log("getData");
  return { header, userdata };
};

export const getData2 = async () => {
  //console.log("getData2");
  return { header, userdata2 };
};

export const postData = async (formData: FormData) => {
  console.log("postData", formData);
  return "postData";
};

export interface Users {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: string;
  address: string;
}
const header = [
  "id",
  "name",
  "email",
  "phone",
  "website",
  "company",
  "address",
];

const userdata: Users[] = [
  {
    id: 1,
    name: "Leanne Graham",
    email: "",
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: "Romaguera-Crona",
    address: "Dayna Park",
  },
  {
    id: 2,
    name: "Ervin Howell",
    email: "",
    phone: "010-692-6593 x09125",
    website: "anastasia.net",
    company: "Deckow-Crist",
    address: "Kattie Turnpike",
  },
  {
    id: 3,
    name: "Clementine Bauch",
    email: "",
    phone: "1-463-123-4447",
    website: "ramiro.info",
    company: "Romaguera-Jacobson",
    address: "Kattie Turnpike",
  },
  {
    id: 4,
    name: "Patricia Lebsack",
    email: "",
    phone: "493-170-9623 x156",
    website: "kale.biz",
    company: "Robel-Corkery",
    address: "Dayna Park",
  },
];

const userdata2: Users[] = [
  {
    id: 1,
    name: "ジョンソン",
    email: "",
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: "Romaguera-Crona",
    address: "Dayna Park",
  },
  {
    id: 2,
    name: "イーブン",
    email: "",
    phone: "010-692-6593 x09125",
    website: "anastasia.net",
    company: "Deckow-Crist",
    address: "Kattie Turnpike",
  },
  {
    id: 3,
    name: "Clementine Bauch",
    email: "",
    phone: "1-463-123-4447",
    website: "ramiro.info",
    company: "Romaguera-Jacobson",
    address: "Kattie Turnpike",
  },
  {
    id: 4,
    name: "Patricia Lebsack",
    email: "",
    phone: "493-170-9623 x156",
    website: "kale.biz",
    company: "Robel-Corkery",
    address: "Dayna Park",
  },
];
