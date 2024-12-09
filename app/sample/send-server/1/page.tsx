import React from "react";
import { getData } from "@/actions/SendServer";
import SampleComponent1 from "@/components/SampleComponent1";
const SendServer1Page = async () => {
  const { header, userdata } = await getData();

  return (
    <div>
      <SampleComponent1 paramUsers={userdata} />
    </div>
  );
};

export default SendServer1Page;
