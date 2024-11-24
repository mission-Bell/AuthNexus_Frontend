import React from "react";
import Box from "@mui/material/Box";
import CommonLabeledItem from "@/components/blocks/CommonLabeledItem";

interface CommonLabelSectionProps {
  labeledItems: {
    label: string;
    children: React.ReactElement;
    ratio: "1-1" | "1-2" | "2-1";
  }[];
}

const CommonLabelSection = ({ labeledItems }: CommonLabelSectionProps) => {
  return (
    <Box>
      {labeledItems.map((item, index) => (
        <CommonLabeledItem key={index} label={item.label} ratio={item.ratio}>
          {item.children}
        </CommonLabeledItem>
      ))}
    </Box>
  );
};

export default CommonLabelSection;
