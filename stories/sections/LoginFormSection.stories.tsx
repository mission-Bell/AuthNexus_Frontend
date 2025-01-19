import type { Meta, StoryObj } from "@storybook/react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import BuildIcon from "@mui/icons-material/Build";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import DndSortableTable from "@/components/sections/DndSortableTable";
import MenuSection from "@/components/sections/MenuSection";
import LoginFormSection from "@/components/sections/LoginFormSection";

const meta = {
  title: "sections/LoginFormSection",
  component: LoginFormSection,
  tags: ["autodocs"],
} satisfies Meta<typeof LoginFormSection>;

export default meta;
type Story = StoryObj<typeof meta>;
