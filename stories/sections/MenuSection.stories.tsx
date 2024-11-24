import type { Meta, StoryObj } from "@storybook/react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import BuildIcon from "@mui/icons-material/Build";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import DndSortableTable from "@/components/sections/DndSortableTable";
import MenuSection from "@/components/sections/MenuSection";

const meta = {
  title: "sections/MenuSection",
  component: MenuSection,
  tags: ["autodocs"],
} satisfies Meta<typeof MenuSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ver1: Story = {
  args: {
    menuButtonList: [
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
    ],
  },
};
