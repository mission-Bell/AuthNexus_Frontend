"use client";
import React from "react";
import { getData2 } from "@/actions/SendServer";
import { Users } from "@/actions/sample";
import SampleComponent2 from "@/components/SampleComponent2";
const SampleComponent1 = ({ paramUsers }: { paramUsers: Users[] }) => {
  const [users, setUsers] = React.useState<Users[]>(paramUsers);

  const handleClick = async () => {
    console.log(users);
    const { userdata2 } = await getData2();
    setUsers(userdata2);
    console.log(users);
  };
  return (
    <div>
      <div>
        SampleComponet1
        {users.map((user, id) => {
          return <div key={id}>{user.name}</div>;
        })}
      </div>
      <button onClick={handleClick}>click</button>
      <SampleComponent2 paramUsers={users} />
    </div>
  );
};

export default SampleComponent1;
