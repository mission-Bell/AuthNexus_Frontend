import { Box } from "@mui/material";
import React from "react";

const SamplePage = () => {
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        {weekry.map((week) => {
          return (
            <Box key={week}>
              <Box>{week}</Box>
              {machines.map((machine) => {
                return (
                  <Box key={machine}>
                    <Box>{machine}</Box>
                    <Box>
                      {obj1[week][machine].startTime} -{" "}
                      {obj1[week][machine].workTime}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          );
        })}
      </Box>
    </div>
  );
};

export default SamplePage;

const weekry: string[] = [
  "11/20",
  "11/21",
  "11/22",
  "11/23",
  "11/24",
  "11/25",
  "11/26",
];

const machines: string[] = ["machine1", "machine2", "machine3"];
const obj1: {
  [key: string]: { [key: string]: { startTime: string; workTime: string } };
} = {
  "11/20": {
    machine1: { startTime: "10:00", workTime: "11:00" },
    machine2: { startTime: "10:00", workTime: "11:00" },
    machine3: { startTime: "10:00", workTime: "11:00" },
  },
  "11/21": {
    machine1: { startTime: "10:00", workTime: "11:00" },
    machine2: { startTime: "10:00", workTime: "11:00" },
    machine3: { startTime: "10:00", workTime: "11:00" },
  },
  "11/22": {
    machine1: { startTime: "10:00", workTime: "11:00" },
    machine2: { startTime: "10:00", workTime: "11:00" },
    machine3: { startTime: "10:00", workTime: "11:00" },
  },
  "11/23": {
    machine1: { startTime: "10:00", workTime: "11:00" },
    machine2: { startTime: "10:00", workTime: "11:00" },
    machine3: { startTime: "10:00", workTime: "11:00" },
  },
  "11/24": {
    machine1: { startTime: "10:00", workTime: "11:00" },
    machine2: { startTime: "10:00", workTime: "11:00" },
    machine3: { startTime: "10:00", workTime: "11:00" },
  },
  "11/25": {
    machine1: { startTime: "10:00", workTime: "11:00" },
    machine2: { startTime: "10:00", workTime: "11:00" },
    machine3: { startTime: "10:00", workTime: "11:00" },
  },
  "11/26": {
    machine1: { startTime: "10:00", workTime: "11:00" },
    machine2: { startTime: "10:00", workTime: "11:00" },
    machine3: { startTime: "10:00", workTime: "11:00" },
  },
};

// obj2を使って一週間分のcellsを作成
// 11/20-11/26までの日付をキーに持つ

// 00:00-23:30まで、三十分間隔で予約可能かどうかのフラグを持つ
// デフォルトはfalse
// ループして作成
const obj2 = Array.from({ length: 48 }, (_, i) => {
  return `${String(Math.floor(i / 2)).padStart(2, "0")}:${String(
    (i % 2) * 30
  ).padStart(2, "0")}`;
}).reduce((acc, cur) => {
  acc[cur] = false;
  return acc;
}, {} as { [key: string]: boolean });

console.log(obj2);
