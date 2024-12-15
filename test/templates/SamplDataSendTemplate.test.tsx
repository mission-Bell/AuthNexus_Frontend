import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SampleDataSendTemplate from "../../components/templates/SampleDataSendTemplate";
import { postDataSample } from "@/actions/sample";

vi.mock("@/actions/sample");

/*
 * templatesテストケースとして用意したいもの
 * 1. レンダリングが正常に行われること（正常系テスト）
 * 2. onClickにより発火するイベントが正しいこと（正常系テスト）
 * 3. 関数全ての動作が正常であること（正常系テスト）
 * 4. 全てのバリデーションチェックが正常に働くこと（正常系テスト）
 * 5. ServerActionsへのリクエストが正常に働くこと（正常系テスト）
 * 6. パフォーマンスのテスト（正常系テスト）
 */
describe("SampleDataSendTemplate", () => {
  it("レンダリングが正常に行われること", () => {
    render(<SampleDataSendTemplate />);
    expect(screen.getByText("add row")).toBeInTheDocument();
    expect(screen.getByText("remove row")).toBeInTheDocument();
    expect(screen.getByText("send")).toBeInTheDocument();
  });

  it("onClickにより発火するイベントが正しいこと", async () => {
    render(<SampleDataSendTemplate />);
    const addButton = screen.getByText("add row");
    fireEvent.click(addButton);
    expect(screen.getAllByRole("textbox").length).toBeGreaterThan(0);
  });

  it("関数全ての動作が正常であること", async () => {
    render(<SampleDataSendTemplate />);
    const sendButton = screen.getByText("send");
    fireEvent.click(sendButton);
    await waitFor(() => {
      expect(screen.getByText("success")).toBeInTheDocument();
    });
  });

  it("全てのバリデーションチェックが正常に働くこと", async () => {
    render(<SampleDataSendTemplate />);
    const sendButton = screen.getByText("send");
    fireEvent.click(sendButton);
    await waitFor(() => {
      expect(screen.getByText("10文字以内で入力してください")).toBeInTheDocument();
    });
  });

  it("ServerActionsへのリクエストが正常に働くこと", async () => {
    postDataSample.mockResolvedValue({ code: 200, message: "success" });
    render(<SampleDataSendTemplate />);
    const sendButton = screen.getByText("send");
    fireEvent.click(sendButton);
    await waitFor(() => {
      expect(postDataSample).toHaveBeenCalledTimes(1);
    });
  });

  it("パフォーマンスのテスト", () => {
    const start = performance.now();
    render(<SampleDataSendTemplate />);
    const end = performance.now();
    expect(end - start).toBeLessThan(1000); // 1秒以内にレンダリングされることを確認
  });
});