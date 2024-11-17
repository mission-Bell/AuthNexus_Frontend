// "use client";
// import React from "react";
// import Button from "@mui/material/Button";

// interface TableItem {
//   name: string;
//   age: number;
//   description: string;
// }

// interface SearchButtonProps {
//   setSearchResult: React.Dispatch<React.SetStateAction<TableItem[]>>;
//   searchResult: TableItem[];
// }

// const SearchButton = ({ searchResult, setSearchResult }: SearchButtonProps) => {
//   const handleClick = async () => {
//     const res = await fetch("http://localhost:30000/api/my-table-items");
//     const items = await res.json();
//     setSearchResult(items);
//   };

//   return (
//     <div>
//       <Button onClick={handleClick}>get items</Button>
//       <div>{searchResult[0].age}</div>
//     </div>
//   );
// };

// export default SearchButton;
"use client";
import React from "react";

interface TableItem {
  name: string;
  age: number;
  description: string;
}

// 子コンポーネントの型
interface SearchButtonProps {
  tableItems: TableItem[];
  setTableItems: React.Dispatch<React.SetStateAction<TableItem[]>>;
}

const SearchButton: React.FC<SearchButtonProps> = ({ setTableItems }) => {
  // ボタンがクリックされたときにデータを取得して状態を更新する
  const fetchData = async () => {
    try {
      const response = await fetch("/api/my-table-items"); // APIエンドポイント
      const data: TableItem[] = await response.json();
      console.log(`data is ${data[0].age}`);
      setTableItems(data); // 親の状態を更新
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <h2>Child Component</h2>
      {/* ボタンクリックでデータを取得 */}
      <button onClick={fetchData}>Fetch Data</button>
    </div>
  );
};

export default SearchButton;
