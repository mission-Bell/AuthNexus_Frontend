import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CommonTable from "../../components/sections/CommonTable";

/*
 * blocksテストケースとして用意したいもの
 * 1. レンダリングが正常に行われること（正常系テスト）
 * 2. スタイルのテスト。引数のバリエーションによるチェック（正常系テスト）
 * 3. パフォーマンスのテスト（正常系テスト）
 */

describe("CommonTable", () => {
  const header = ["Name", "Age", "Address"];
  const cellValues = [
    ["John Doe", 28, "123 Main St"],
    ["Jane Smith", 34, "456 Oak St"],
  ];

  it("レンダリングが正常に行われること", () => {
    render(<CommonTable header={header} cellValues={cellValues} />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it.each([
    { header: ["Name"], cellValues: [["John Doe"]] },
    { header: ["Name", "Age"], cellValues: [["John Doe", 28]] },
    { header: ["Name", "Age", "Address"], cellValues: [["John Doe", 28, "123 Main St"]] },
  ])("スタイルのテスト。引数のバリエーションによるチェック:($header)", ({ header, cellValues }) => {
    render(<CommonTable header={header} cellValues={cellValues} />);
    header.forEach((col) => {
      expect(screen.getByText(col)).toBeInTheDocument();
    });
    cellValues.flat().forEach((cell) => {
      expect(screen.getByText(cell)).toBeInTheDocument();
    });
  });

  it("パフォーマンスのテスト", () => {
    const largeCellValues = Array.from({ length: 1000 }, (_, i) => [`Name ${i}`, i, `Address ${i}`]);
    const start = performance.now();
    render(<CommonTable header={header} cellValues={largeCellValues} />);
    const end = performance.now();
    expect(end - start).toBeLessThan(1000); // 1秒以内にレンダリングされることを期待
  });
});
