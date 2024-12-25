import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SampleDataSendTemplate from "../../components/templates/SampleDataSendTemplate";
import { postDataSample } from "@/actions/sample";
import userEvent from "@testing-library/user-event";

vi.mock('@/actions/sample', () => ({
  postDataSample: vi.fn().mockResolvedValue({ code: 200, message: "success" })
}))

// mockの戻り値を設定

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
  it("レンダリングが正常に行われること", async () => {
    render(<SampleDataSendTemplate />);
    expect(screen.getByLabelText("name")).toBeInTheDocument();
    expect(screen.getByLabelText("age")).toBeInTheDocument();
    expect(screen.getByLabelText("address")).toBeInTheDocument();
    expect(screen.getByText("add row")).toBeInTheDocument();
    expect(screen.getByText("remove row")).toBeInTheDocument();
    expect(screen.getByText("send")).toBeInTheDocument();


    const nameInput = screen.getByLabelText("name");
    const ageInput = screen.getByLabelText("age");
    const addressInput = screen.getByLabelText("address");
    const sexIdSelect = screen.getByLabelText("sexId");
    screen.findByRole('button', { name: 'sexId \u{200B}' })

    await userEvent.type(nameInput, "test");
    await userEvent.type(ageInput, "10");
    await userEvent.type(addressInput, "test");
    // 初期値が正しいか確認
    expect(sexIdSelect).toHaveTextContent('男');

    // Selectをクリックしてメニューを開く
    await userEvent.click(sexIdSelect);

    // 女の値をクリックして選択
    const menuItem = screen.getAllByRole('option');

    await userEvent.click(menuItem[1]);

    // 値が変更されたか確認
    expect(sexIdSelect).toHaveTextContent('女');
    await userEvent.click(screen.getByText("send"));
  });

  // it("onClickにより発火するイベントが正しいこと", async () => {
  //   render(<SampleDataSendTemplate />);
  //   const addButton = screen.getByText("add row");
  //   fireEvent.click(addButton);
  //   expect(screen.getAllByRole("textbox").length).toBeGreaterThan(0);
  // });

  // it("関数全ての動作が正常であること", async () => {
  //   render(<SampleDataSendTemplate />);
  //   const sendButton = screen.getByText("send");
  //   fireEvent.click(sendButton);
  //   await waitFor(() => {
  //     expect(screen.getByText("success")).toBeInTheDocument();
  //   });
  // });

  it("全てのバリデーションチェックが正常に働くこと", async () => {
    const conteainer = render(<SampleDataSendTemplate />);



    //fireEvent.input(test, { target: { value: "12345678901" } });

    // fireEvent.change(test, { target: { value: "12345678901" } });
    // const name = screen.getByLabelText("name");
    // const age = screen.getByLabelText("age");
    // const address = screen.getByLabelText("address");
    // fireEvent.change(name, { target: { value: "12345678901" } });
    // fireEvent.change(age, { target: { value: "10" } });
    // fireEvent.change(address, { target: { value: "12345678901" } });


  });

  // it("ServerActionsへのリクエストが正常に働くこと", async () => {
  //   postDataSample.mockResolvedValue({ code: 200, message: "success" });
  //   render(<SampleDataSendTemplate />);
  //   const sendButton = screen.getByText("send");
  //   fireEvent.click(sendButton);
  //   await waitFor(() => {
  //     expect(postDataSample).toHaveBeenCalledTimes(1);
  //   });
  // });

  // it("パフォーマンスのテスト", () => {
  //   const start = performance.now();
  //   render(<SampleDataSendTemplate />);
  //   const end = performance.now();
  //   expect(end - start).toBeLessThan(1000); // 1秒以内にレンダリングされることを確認
  // });
});