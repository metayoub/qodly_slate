import { FC, useState, useRef, useEffect } from 'react';
import { useSlate, ReactEditor } from 'slate-react';
import { SketchPicker } from 'react-color';
import { Editor, BaseRange } from 'slate';
import { Button } from '.';
import { IconType } from 'react-icons';
import { get } from 'lodash';

interface ColorPickerButton {
  icon: IconType;
  format: string;
  readonly?: boolean;
}
const ColorPickerButton: FC<ColorPickerButton> = ({ icon: Icon, format, readonly }) => {
  const editor = useSlate();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [color, setColor] = useState<string>('#000');
  const [selection, setSelection] = useState<BaseRange | null>(null);
  const pickerRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const applyColor = (editor: Editor, color: string) => {
    if (selection) {
      ReactEditor.focus(editor as ReactEditor);
      editor.selection = selection;
      Editor.addMark(editor, format, color);
      setShowColorPicker(false);
    }
  };

  const isMarkActive = (editor: Editor, format: string) => {
    const marks = Editor.marks(editor) as Record<string, any>;
    return get(marks, format, '') !== '';
  };

  const toggleColorPicker = (editor: Editor, format: string) => {
    const marks = Editor.marks(editor) as Record<string, any>;
    setColor(get(marks, format, ''));
    setShowColorPicker(true);
  };

  useEffect(() => {
    if (!showColorPicker) return;
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!pickerRef.current?.contains(target) && !btnRef.current?.contains(target)) {
        setShowColorPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showColorPicker]);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <Button
        ref={btnRef}
        active={isMarkActive(editor, format)}
        onMouseDown={(event: MouseEvent) => {
          event.preventDefault();
          if (!readonly) {
            setSelection(editor.selection);
            toggleColorPicker(editor, format);
          }
        }}
      >
        <Icon />
      </Button>
      {showColorPicker && (
        <div ref={pickerRef} style={{ position: 'absolute', zIndex: 2 }}>
          <SketchPicker
            color={color}
            onChange={(newColor) => setColor(newColor.hex)}
            onChangeComplete={(newColor) => applyColor(editor, newColor.hex)}
          />
        </div>
      )}
    </div>
  );
};

export default ColorPickerButton;
