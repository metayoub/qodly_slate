import { IconType } from 'react-icons';
import { Button } from './';
import { useSlate } from 'slate-react';
import { FC, useState } from 'react';
import { Transforms } from 'slate';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

interface EmojiButton {
  icon: IconType;
  readonly?: boolean;
}

const EmojiButton: FC<EmojiButton> = ({ icon: Icon, readonly }) => {
  const editor = useSlate();

  const [isPickerVisible, setPickerVisible] = useState(false);

  const insertEmoji = (emoji: any) => {
    Transforms.insertText(editor, emoji.native);
    setPickerVisible(false);
  };

  return (
    <div>
      <Button
        onMouseDown={(event: any) => {
          event.preventDefault();
          !readonly && setPickerVisible((prev) => !prev);
        }}
      >
        <Icon />
      </Button>
      <>
        {isPickerVisible && (
          <div style={{ position: 'absolute', zIndex: 10 }}>
            <Picker data={data} onEmojiSelect={insertEmoji} theme="light" />
          </div>
        )}
      </>
    </div>
  );
};

export default EmojiButton;
