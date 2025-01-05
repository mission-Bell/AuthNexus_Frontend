const fs = require('fs');
const data = require('./index.json'); // index.jsonを読み込む

// elements配列をループする
data.elements.forEach(({ type, label, attributes }) => {
  const componentName = type; // typeをcomponentNameとして扱う
  const validation = {
    field: attributes.name || '',
    type: attributes.type || '',
    invalid: 'invalid-value', // 必要に応じて適切な値に変更
    valid: 'valid-value', // 必要に応じて適切な値に変更
    errorMessage: 'Invalid input' // 必要に応じて適切なエラーメッセージに変更
  };

  const testCode = generateTestCode(componentName, { label, validation });
  fs.writeFileSync(`./${componentName}.test.ts`, testCode);
});

function generateTestCode(componentName, { label, validation }) {
  return `
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import ${componentName} from '../components/${componentName}';

describe('${componentName}', () => {
  it('renders with label "${label}"', () => {
    render(<${componentName} label="${label}" />);
    expect(screen.getByLabelText('${label}')).toBeInTheDocument();
  });

  it('shows error for invalid ${validation.field}', async () => {
    render(<${componentName} label="${label}" validate="${validation.type}" />);
    const input = screen.getByLabelText('${label}');
    await userEvent.type(input, '${validation.invalid}');
    expect(screen.getByText('${validation.errorMessage}')).toBeInTheDocument();
  });

  it('accepts valid ${validation.field}', async () => {
    render(<${componentName} label="${label}" validate="${validation.type}" />);
    const input = screen.getByLabelText('${label}');
    await userEvent.type(input, '${validation.valid}');
    expect(screen.queryByText('${validation.errorMessage}')).not.toBeInTheDocument();
  });
});
  `;
}
