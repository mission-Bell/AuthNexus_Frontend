import React from "react";
import { Users } from "@/actions/SendServer";
const SampleComponent2 = ({ paramUsers }: { paramUsers: Users[] }) => {
  return (
    <div>
      <div>SampleComponent2</div>
      {paramUsers.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};

export default SampleComponent2;
