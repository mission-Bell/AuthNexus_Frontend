import React from "react";
import MenuButton from "@/components/blocks/MenuButton";

import Grid from "@mui/material/Grid2";
interface MenuButtonProps {
  icon: React.ReactElement;
  label: string;
  onClick: () => void;
}

interface RowOfMenuButtonProps {
  menuButtonList: MenuButtonProps[];
}

const RowOfMenuButton = ({ menuButtonList }: RowOfMenuButtonProps) => {
  return (
    <div>
      <Grid container>
        {menuButtonList.map((item) => (
          <Grid size={4} p="1%">
            <MenuButton
              icon={item.icon}
              label={item.label}
              link="#"
            // onClick={item.onClick}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default RowOfMenuButton;
