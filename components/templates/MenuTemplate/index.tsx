import React from "react";
import Box from "@mui/material/Box";
import MenuSection from "@/components/sections/MenuSection";

import AcUnitIcon from "@mui/icons-material/AcUnit";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import BuildIcon from "@mui/icons-material/Build";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";

const MenuTemplate = () => {
  const menuButtonList = [
    {
      icon: <LocalShippingIcon />,
      label: "Delivary",
      link: "/",
    },
    {
      icon: <BuildIcon />,
      label: "Maintenance",
      link: "/",
    },
    {
      icon: <LocalPizzaIcon />,
      label: "Pizza",
      link: "/",
    },
    {
      icon: <LocalHospitalIcon />,
      label: "Hospital",
      link: "/",
    },
    {
      icon: <AddIcCallIcon />,
      label: "Call",
      link: "/",
    },
    {
      icon: <AcUnitIcon />,
      label: "AcUnit",
      link: "/",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <MenuSection menuButtonList={menuButtonList} />
    </Box>
  );
};

export default MenuTemplate;
