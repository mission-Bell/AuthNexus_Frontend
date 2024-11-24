"use client";
import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getData } from "@/actions/sample";
import CommonTable from "@/components/sections/CommonTable";
import { Users } from "@/actions/sample";
const SendServerSamplePage = () => {
  //const [serverActionResult, setServerActionResult] = React.useState("");
  const [apiResult, setApiResult] = useState("");
  const [header, setHeader] = useState<string[]>([]);
  const [users, setUsers] = useState<Users[]>([]);
  const [cellValues, setCellValues] = useState<any[][]>([]);

  // use serverにして再調整
  useEffect(() => {
    handleServerAction();
    createCellValues();
  }, []);
  const handleServerAction = async () => {
    const { header, userdata } = await getData();
    setHeader(header);
    setUsers(userdata);
    createCellValues();
    //setCellValues(userdata);
    //setServerActionResult(result);
  };

  const createCellValues = () => {
    const cellValues = users.map((user) => {
      return Object.values(user);
    });
    setCellValues(cellValues);
  };

  const handleAPIRoute = async () => {
    // getリクエスト
    const getResult = await fetch("/api/sample");
    // postリクエスト
    const postResult = await fetch("/api/sample", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: "data" }),
    });
    const getData = await getResult.json();
    const postData = await postResult.json();
    setApiResult(getData.data);
    console.log("postData", postData);
  };

  return (
    <Box>
      <Box>
        <Typography>Server Actions</Typography>
        <Typography>
          ボタンを押下した時にServerActionsの関数が発火。
          <br />
          戻り値をステートにセットしてJSX作成。
        </Typography>
        <Box>
          {/* <Typography>{serverActionResult}</Typography> */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleServerAction}
          >
            Server Action
          </Button>
        </Box>
        <Box>
          <CommonTable cellValues={cellValues} header={header} />
        </Box>
      </Box>
      <Box mt={10}>
        <Typography>RouteAPI</Typography>
        <Typography>APIを叩いてデータを取得する</Typography>
        <Box>
          <Typography>{apiResult}</Typography>
          <Button variant="contained" color="primary" onClick={handleAPIRoute}>
            Route API
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SendServerSamplePage;
