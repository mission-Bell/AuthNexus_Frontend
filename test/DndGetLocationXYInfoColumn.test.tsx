import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import DndGetLocationXYInfoColumn from "../components/blocks/DndGetLocationXYInfoColumn";

/*
 * 単体テストケースとして最低限用意したいもの
 * 1. レンダリングが正常に行われること（正常系テスト）
 * 2. 境界値テスト（正常系、異常系テスト）
 * 3. エラーハンドリング（異常系テスト）
 * 4. スタイルのテスト（正常系テスト）
 * 5. パフォーマンスのテスト（正常系テスト）
 */
describe("DndGetLocationXYInfoColumn", () => {
  it("renders the index, x, and y values", () => {
    render(<DndGetLocationXYInfoColumn index="1" x="100" y="200" />);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("200")).toBeInTheDocument();
  });
});
