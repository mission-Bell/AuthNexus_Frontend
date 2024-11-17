"use client";
import React, { useState } from "react";
import SearchButton from "@/components/old/SearchButton";

// 型定義
interface TableItem {
  name: string;
  age: number;
  description: string;
}

const SearchPage = () => {
  // TableItem[]型の状態を管理
  const [tableItems, setTableItems] = useState<TableItem[]>([]);

  return (
    <div>
      <h1>Parent Component</h1>
      {/* 子コンポーネントに状態とセット関数を渡す */}
      <SearchButton tableItems={tableItems} setTableItems={setTableItems} />
      <ul>
        {/* 取得したデータを表示 */}
        {tableItems.map((item, index) => (
          <li key={index}>
            <strong>{item.name}</strong> - Age: {item.age} - {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
