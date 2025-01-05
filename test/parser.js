const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

// 対象のTemplateファイルを指定
const templateFile = '../components/sections/LoginFormSection/index.tsx';

// ファイルを読み込む
const code = fs.readFileSync(templateFile, 'utf-8');

// ASTを生成
const ast = parser.parse(code, {
  sourceType: 'module',
  plugins: ['jsx', 'typescript']
});

// コンポーネント情報を抽出
const components = [];

traverse(ast, {
  JSXOpeningElement(path) {
    const elementName = path.node.name.name;
    if (['TextField', 'Button', 'Select'].includes(elementName)) {
      const attributes = {};
      path.node.attributes.forEach(attr => {
        if (attr.type === 'JSXAttribute' && attr.name.name) {
          attributes[attr.name.name] = attr.value
            ? attr.value.type === 'StringLiteral'
              ? attr.value.value
              : true
            : true;
        }
      });

      components.push({
        type: elementName,
        label: attributes.label || '',
        attributes
      });
    }
  }
});

// JSONを出力
const templateName = path.basename(templateFile, '.tsx');
const result = {
  name: templateName,
  elements: components
};

fs.writeFileSync(`./${templateName}.json`, JSON.stringify(result, null, 2));
console.log(`Generated JSON for ${templateName}`);
