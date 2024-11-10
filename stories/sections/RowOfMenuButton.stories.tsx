import type { Meta, StoryObj } from "@storybook/react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import RowOfMenuButton from "@/components/sections/RowOfMenuButtons";
import BuildIcon from "@mui/icons-material/Build";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

const meta = {
  title: "sections/RowOfMenuButton",
  component: RowOfMenuButton,
  tags: ["autodocs"],
} satisfies Meta<typeof RowOfMenuButton>;

export default meta;
type Story = StoryObj<typeof meta>;

interface MenuButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const menuButtonList: MenuButtonProps[] = [
  {
    icon: <LocalShippingIcon />,
    label: "Delivary",
    onClick: () => {
      console.log("test");
    },
  },
  {
    icon: <BuildIcon />,
    label: "Maintenance",
    onClick: () => {
      console.log("test");
    },
  },
  {
    icon: <LocalPizzaIcon />,
    label: "Pizza",
    onClick: () => {
      console.log("test");
    },
  },
  {
    icon: <LocalHospitalIcon />,
    label: "Hospital",
    onClick: () => {
      console.log("test");
    },
  },
];

export const Ver1: Story = {
  args: {
    menuButtonList,
  },
};
