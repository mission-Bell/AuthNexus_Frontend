"use server";

import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { PrismaClient } from "@prisma/client";
import Box from "@mui/material/Box";

export const postLogin = async (formData: FormData) => {
  console.log("postLogin", formData);
  return <Box>test</Box>;
};
