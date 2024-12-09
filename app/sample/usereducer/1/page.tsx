"use client";
import React, { useReducer } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
interface State1 {
  count: number;
  name: string;
  age: number;
}

interface State2 {
  [key: string]: {
    [key: string]: { startTime: string; workTime: string; isDiplay: boolean };
  };
}

// 複雑な状態変化を管理するサンプル
const UseReducerPage1 = () => {
  // 初期オブジェクト
  const initStateObj: State1 = {
    count: 0,
    name: "hoge",
    age: 20,
  };
  type Action = "click" | "change" | "drag" | "drop";
  const reducer = (state: State1, action: Action) => {
    switch (action) {
      case "click":
        return { ...state, count: state.count + 1 };
      case "change":
        return { ...state, name: "fuga" };
      case "drag":
        return { ...state, age: state.age + 1 };
      case "drop":
        return { ...state, count: state.count + 1, age: state.age + 1 };
      default:
        return state;
    }
    return state;
  };
  const [state, dispatch] = useReducer(reducer, initStateObj);

  // 初期オブジェクト
  const initStateObj2: State2 = {
    "11/20": {
      machine1: { startTime: "10:00", workTime: "11:00", isDiplay: true },
      machine2: { startTime: "10:00", workTime: "11:00", isDiplay: true },
      machine3: { startTime: "10:00", workTime: "11:00", isDiplay: true },
    },
    "11/21": {
      machine1: { startTime: "10:00", workTime: "11:00", isDiplay: true },
      machine2: { startTime: "10:00", workTime: "11:00", isDiplay: true },
      machine3: { startTime: "10:00", workTime: "11:00", isDiplay: true },
    },
    "11/22": {
      machine1: { startTime: "10:00", workTime: "11:00", isDiplay: true },
      machine2: { startTime: "10:00", workTime: "11:00", isDiplay: true },
      machine3: { startTime: "10:00", workTime: "11:00", isDiplay: true },
    },
  };

  const reducer2 = (state: State2, action: Action) => {
    return state;
  };
  const [state2, dispatch2] = useReducer(reducer2, initStateObj2);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          border: "1px solid #333333",
          width: "200px",
          padding: "10px",
          marginTop: "10px",
        }}
      >
        <p>object1 is ...</p>
        {Object.keys(state).map((key) => {
          return (
            <div key={key}>
              {key}: {state[key as keyof State1]}
            </div>
          );
        })}
      </div>
      <div
        style={{
          border: "1px solid #333333",
          width: "500px",
          padding: "10px",
          marginTop: "10px",
        }}
      >
        <p>object2 is ...</p>
        {Object.keys(state2).map((key) => {
          return (
            <div key={key} style={{ display: "flex" }}>
              {key}:
              {Object.keys(state2[key]).map((key2) => {
                return (
                  <div key={key2}>
                    {key2}: startTime: {state2[key][key2].startTime}
                    workTime: {state2[key][key2].workTime}
                    isDiplay: {state2[key][key2].isDiplay.toString()}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <div
        style={{
          border: "1px solid #333333",
          width: "200px",
          padding: "10px",
          marginTop: "10px",
        }}
      >
        object1...
        <Box p={1}>
          <Button variant="contained" onClick={() => dispatch("click")}>
            click
          </Button>
        </Box>
        <Box p={1}>
          <Button variant="contained" onClick={() => dispatch("change")}>
            change
          </Button>
        </Box>
        <Box p={1}>
          <Button variant="contained" onClick={() => dispatch("drag")}>
            drag
          </Button>
        </Box>
        <Box p={1}>
          <Button variant="contained" onClick={() => dispatch("drop")}>
            drop
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default UseReducerPage1;
