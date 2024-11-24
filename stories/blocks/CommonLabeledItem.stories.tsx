import type { Meta, StoryObj } from "@storybook/react";

import CommonLabeledItem from "@/components/blocks/CommonLabeledItem";

const meta = {
  title: "blocks/CommonLabeledItem",
  component: CommonLabeledItem,
  tags: ["autodocs"],
} satisfies Meta<typeof CommonLabeledItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ver1: Story = {
  args: {
    label: "Label",
    children: <div>Content</div>,
  },
};

