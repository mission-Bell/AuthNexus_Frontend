import React from "react";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import CommonButton from "../../components/elements/CommonButton";
import Button from "@mui/material/Button";
import { buttonLabels } from "../../constants/common";
/*
 * elementsテストケースとして用意したいもの
 * 1. レンダリングが正常に行われること（正常系テスト）
 * 2. スタイルのテスト（正常系テスト）
 * 3. onClickが呼ばれること（正常系テスト）
 * 4. パフォーマンスのテスト（正常系テスト）
 */
const { ADD_ROW, REMOVE_ROW, SEND } = buttonLabels;
describe("CommonButton", () => {
  it("レンダリングが正常に行われること", () => {
    render(<CommonButton label={ADD_ROW} type="button" />);
    expect(screen.getByText("ADD ROW")).toBeInTheDocument();
  });
  it.each([
    { label: ADD_ROW, type: "button" },
    { label: REMOVE_ROW, type: "button" },
    { label: SEND, type: "submit" },
  ])("ボタンが正常に表示されること:($label)", ({ label, type }) => {
    render(<CommonButton label={label} type={"button"} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });
  it("スタイルのテスト", () => {
    render(<CommonButton label="テスト" type="button" />);
    const button = screen.getByRole("button");
    expect(button).toHaveStyle({
      color: '#fff',
      borderRadius: '5px',
      padding: '10px',
      width: '100%',
    });
  });
  it('hover時のスタイルのテスト', () => {
    render(<CommonButton label="テスト" type="button" />);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle({
      backgroundColor: '#444',
    });
  });
  // onClickのテスト
  it('onClickが呼ばれること', async () => {
    const onClick = vi.fn();
    render(
      <CommonButton
        label="テスト"
        type="button"
        onClick={onClick}
      />
    );
    await userEvent.click(screen.getByText('テスト'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

