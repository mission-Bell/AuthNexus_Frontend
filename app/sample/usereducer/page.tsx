"use client";
import React, { useReducer } from "react";

/*
useReducer
state: 現在ステータス
dispacher: actionを引数にして、reducer関数の呼び出し
reducer: アクションに応じたステータス更新
initialArg: 初期値、初期化

useStateのみでも可能だが、より簡潔に書くのに適している。
アクションの値によって状態変化を制御したい際など。
*/
const UseReducerPage = () => {
  type Action = "click" | "change" | "drag" | "drop";
  const reducer = (state: number, action: Action) => {
    switch (action) {
      case "click":
        return 1;
      case "change":
        return 2;
      case "drag":
        return 3;
      case "drop":
        return 4;
      default:
        return 0;
    }
    return state + 1;
  };
  const [state, dispatch] = useReducer(reducer, 0);
  return (
    <div>
      {`state is ${state}`}
      <br />
      <button onClick={() => dispatch("click")}>click</button>
      <br />
      <button onClick={() => dispatch("change")}>change</button>
      <br />
      <button onClick={() => dispatch("drag")}>drag</button>
      <br />
      <button onClick={() => dispatch("drop")}>drop</button>
      <br />
    </div>
  );
};

export default UseReducerPage;
