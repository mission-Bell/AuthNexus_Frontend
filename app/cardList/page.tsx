"use client";
import React from "react";
import { useState } from "react";
import MyButton from "@/components/elements/Button/MyButton";
// import MyCard from "@/components/elements/Card/MyCard";
import { Box, Stack, Card, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
/*
カードリストの表示とその後のリスト遷移について
　最大値を決めてカードリストを取得
　取得したリストをoverflow:hiddenで画面に表示
　画面でリスト表示するエリアはサイズ指定
　右ボタン、左ボタンを押されるたびに、表示したリストを
　left,rigthで遷移させる。（例えば、リストの表示エリアが100で
　カード一つが10であれば、ボタン一回につき、10ずつ遷移させる
*/

const SamplePage = () => {
  const [amountChange, setAmountChange] = useState(0);

  const migiHandleClick = () => {
    setAmountChange(amountChange - 50);
  };
  const hidariHandleClick = () => {
    if (amountChange < 0) {
      setAmountChange(amountChange + 50);
    }
  };
  return (
    <div>
      <MyButton />

      <div>{amountChange}</div>
      {/* <Grid container>
        <Grid
          size={6}
          sx={{
            overflow: "auto",
            transform: `translateX(${amountChange}px)`,
          }}
        ></Grid>
        <Grid
          size={6}
          sx={{
            overflow: "auto",
            transform: `translateX(${amountChange}px)`,
          }}
        >
          <Stack
            direction={"row"}
            spacing={1}
            sx={{
              transform: `translateX(${amountChange}px)`,
              transition: "transform 0.3s ease-in-out",
              position: "relative",
              width: "100px",
            }}
          >
            <Box>
              <Card
                sx={{
                  bgcolor: "blue",
                  ":hover": {
                    bgcolor: "gray",
                  },
                }}
              >
                card1
              </Card>
            </Box>
            <Box>
              <Card>card2</Card>
            </Box>
            <Box>
              <Card>card3</Card>
            </Box>
            <Box>
              <Card>card4</Card>
            </Box>
            <Box>
              <Card>card5</Card>
            </Box>
            <Box>
              <Card>card6</Card>
            </Box>
            <Box>
              <Card>card7</Card>
            </Box>
            <Box>
              <Card>card8</Card>
            </Box>
            <Box>
              <Card>card9</Card>
            </Box>
            <Box>
              <Card>card10</Card>
            </Box>
            <Box>
              <Card>card11</Card>
            </Box>
            <Box>
              <Card>card12</Card>
            </Box>
          </Stack>
        </Grid>
      </Grid> */}
      <Box sx={{ width: "1000px", position: "relative" }}>
        <Stack
          direction={"row"}
          spacing={1}
          sx={{
            transform: `translateX(${amountChange}px)`,
            transition: "transform 0.3s ease-in-out",
            position: "relative",
            width: "100px",
          }}
        >
          <Box>
            <Card
              sx={{
                bgcolor: "blue",
                ":hover": {
                  bgcolor: "gray",
                },
              }}
            >
              card1
            </Card>
          </Box>
          <Box>
            <Card>card2</Card>
          </Box>
          <Box>
            <Card>card3</Card>
          </Box>
          <Box>
            <Card>card4</Card>
          </Box>
          <Box>
            <Card>card5</Card>
          </Box>
          <Box>
            <Card>card6</Card>
          </Box>
          <Box>
            <Card>card7</Card>
          </Box>
          <Box>
            <Card>card8</Card>
          </Box>
          <Box>
            <Card>card9</Card>
          </Box>
          <Box>
            <Card>card10</Card>
          </Box>
          <Box>
            <Card>card11</Card>
          </Box>
          <Box>
            <Card>card12</Card>
          </Box>
        </Stack>
        <Button
          onClick={hidariHandleClick}
          sx={{
            transform: `translateY(-40px)`,
            position: "absolute",
            left: "20px",
          }}
        >
          <ArrowBackIcon />
        </Button>
        <Button
          onClick={migiHandleClick}
          sx={{
            transform: `translateY(-40px)`,
            position: "absolute",
            right: "20px",
          }}
        >
          <ArrowForwardIcon />
        </Button>
      </Box>

      <Box
        sx={{
          position: "relative",
          color: "black",
          width: "100px",
        }}
      >
        This
        <Box sx={{ position: "absolute", right: "10px" }}>test</Box>
      </Box>
    </div>
  );
};

export default SamplePage;
