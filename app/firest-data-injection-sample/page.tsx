import React from "react";
import { getData } from "@/actions/sample";
import { Users } from "@/actions/sample";
import CommonTable from "@/components/sections/CommonTable";
import Box from "@mui/material/Box";

const FirestDataInjectionSamplePage = async () => {
  const handleGetData = async () => {
    const { header, userdata } = await getData();
    return { header, userdata };
  };

  const createCellValues = (users: Users[]) => {
    const cellValues = users.map((user) => {
      return Object.values(user);
    });
    return cellValues;
  };
  const cellValues = handleGetData();

  return (
    <Box>
      <CommonTable
        header={(await cellValues).header}
        cellValues={createCellValues((await cellValues).userdata)}
      />
    </Box>
  );
};

export default FirestDataInjectionSamplePage;
