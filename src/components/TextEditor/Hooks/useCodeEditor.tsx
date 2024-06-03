import { useCallback, useState } from 'react';
import Prism from 'prismjs';
import { ReactEditor, useSlate } from 'slate-react';
import { Node, Transforms } from 'slate';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-java';

const useCodeEditor = () => {
  const SelectLanguage = ({ element }: { element: any }) => {
    //select component
    const textEditor = useSlate();
    const [selectedLanguage, setLanguage] = useState<string>(element.language || 'javascript');

    const updateLanguage = (newLanguage: string) => {
      setLanguage(newLanguage);
      const path = ReactEditor.findPath(textEditor as ReactEditor, element);
      Transforms.setNodes(textEditor, { language: newLanguage } as Partial<Node>, { at: path });
    };

    return (
      <select
        value={selectedLanguage}
        onChange={(e: any) => updateLanguage(e.target.value)}
        className="absolute right-5 top-5 z-1 p-1"
      >
        <option value="javascript">JavaScript</option>
        <option value="typescript">TypeScript</option>
        <option value="markup">Html</option>
        <option value="css">Css</option>
        <option value="jsx">JSX</option>
        <option value="tsx">TSX</option>
        <option value="sql">SQL</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
        <option value="php">Php</option>
      </select>
    );
  };

  const highlightCode = useCallback(([node, path]: any) => {
    const ranges: any[] = []; //BaseRange[]

    if (node.children && node.children[0] && node.language) {
      const editorCode = node.children[0].text;
      const language = node.language || 'javascript';
      const codeTokens = Prism.tokenize(editorCode, Prism.languages[language]);
      let start = 0;
      for (const token of codeTokens) {
        const length = token.length;
        const end = start + length;
        if (typeof token !== 'string' && token.type) {
          ranges.push({
            anchor: { path, offset: start },
            focus: { path, offset: end },
            code: true,
            token: token.type,
          });
        }
        start = end;
      }
    }
    return ranges;
  }, []);

  return {
    SelectLanguage,
    highlightCode,
  };
};

export default useCodeEditor;
