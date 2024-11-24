import type { Meta, StoryObj } from "@storybook/react";

import { TextField } from "@mui/material";
import CommonLabelSection from "@/components/sections/CommonLabelSection";
const meta = {
  title: "sections/CommonLabelSection",
  component: CommonLabelSection,
  tags: ["autodocs"],
} satisfies Meta<typeof CommonLabelSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ver1: Story = {
  args: {
    labeledItems: [
      {
        label: "label1",
        children: <TextField fullWidth />,
        ratio: "1-2",
      },
      {
        label: "label2",
        children: <TextField fullWidth />,
        ratio: "1-2",
      },
      {
        label: "label3",
        children: <TextField fullWidth />,
        ratio: "1-2",
      },
    ],
  },
};
