'use client';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { useForm, useFieldArray } from 'react-hook-form';

type Item = {
  id: number;
  value: string;
  isRegistered: boolean;
};

type FormValues = {
  items: Item[];
};

const DeleteSample: React.FC = () => {
  const { control, setValue, getValues } = useForm<FormValues>({
    defaultValues: {
      items: [
        { id: 1, value: '登録済み要素1', isRegistered: true },
        { id: 2, value: '未登録要素1', isRegistered: false },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const [pattern, setPattern] = useState<'pattern1' | 'pattern2'>('pattern1'); // パターン切り替え用

  const handleAdd = () => {
    const newId = Math.max(...fields.map((field) => field.id)) + 1;
    append({ id: newId, value: `新しい要素${newId}`, isRegistered: false });
  };

  const handleDeletePattern1 = (index: number, isRegistered: boolean, id: number) => {
    if (confirm('削除しますがよろしいですか？')) {
      if (isRegistered) {
        fetch(`/api/delete/${id}`, { method: 'DELETE' })
          .then((response) => {
            if (response.ok) alert('登録済みの要素を削除しました。');
            else alert('削除に失敗しました。');
          })
          .catch(() => alert('エラーが発生しました。'));
      } else {
        remove(index);
        alert('未登録の要素をリストから削除しました。');
      }
    }
  };

  const handleDeletePattern2 = async () => {
    const selectedItems = getValues('items').filter((_, index) => {
      const checkboxName = `checkbox-${index}`;
      return (document.getElementById(checkboxName) as HTMLInputElement)?.checked;
    });

    if (confirm('選択された要素を削除しますがよろしいですか？')) {
      const failedIds: number[] = [];

      for (const item of selectedItems) {
        if (item.isRegistered) {
          try {
            const response = await fetch(`/api/delete/${item.id}`, { method: 'DELETE' });
            if (!response.ok) {
              failedIds.push(item.id); // 失敗したIDを記録
            }
          } catch {
            failedIds.push(item.id);
          }
        }
      }

      // 未登録要素と削除に成功した登録要素のみ画面上から削除
      const updatedItems = getValues('items').filter((item) => {
        return !selectedItems.includes(item) || failedIds.includes(item.id);
      });

      setValue('items', updatedItems);

      if (failedIds.length > 0) {
        alert(`以下の要素の削除に失敗しました: ${failedIds.join(', ')}`);
      } else {
        alert('削除が完了しました。');
      }
    }
  };


  return (
    <Box>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setPattern(pattern === 'pattern1' ? 'pattern2' : 'pattern1')}
        style={{ marginBottom: '16px' }}
      >
        パターン切り替え: {pattern === 'pattern1' ? 'パターン2' : 'パターン1'}
      </Button>

      <Button
        variant="contained"
        color="primary"
        onClick={handleAdd}
        style={{ marginBottom: '16px' }}
      >
        追加
      </Button>

      {fields.map((item, index) => (
        <Box key={item.id} display="flex" alignItems="center" mb={2}>
          <TextField
            value={item.value}
            variant="outlined"
            disabled
            style={{ marginRight: '8px' }}
          />
          {pattern === 'pattern1' ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleDeletePattern1(index, item.isRegistered, item.id)}
            >
              削除
            </Button>
          ) : (
            <Checkbox id={`checkbox-${index}`} />
          )}
        </Box>
      ))}

      {pattern === 'pattern2' && (
        <Button variant="contained" color="secondary" onClick={handleDeletePattern2}>
          選択した要素を削除
        </Button>
      )}
    </Box>
  );
};

export default DeleteSample;
