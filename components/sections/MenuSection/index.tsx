import React from "react";
import Grid from "@mui/material/Grid2";
import MenuButton from "@/components/blocks/MenuButton";

import { MenuButtonProps } from "@/components/blocks/MenuButton";

interface MenuSectionProps {
  menuButtonList: MenuButtonProps[];
}

const MenuSection = ({ menuButtonList }: MenuSectionProps) => {
  return (
    <Grid container spacing={5}>
      {menuButtonList.map((menuButton) => (
        <Grid
          key={menuButton.label}
          size={{
            xs: 12,
            sm: 6,
            md: 4,
          }}
        >
          <MenuButton {...menuButton} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MenuSection;
