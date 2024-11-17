import React from "react";
import Button from "@mui/material/Button";

interface MyClientProps {
  x: number;
  y: number;
}
const MyClient = (myClientProps: MyClientProps) => {
  return (
    <div>
      {myClientProps.x}
      <Button>client!</Button>
    </div>
  );
};

export default MyClient;
