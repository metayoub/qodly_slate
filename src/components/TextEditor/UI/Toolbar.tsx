import { FC } from 'react';
import { MarkButton, BlockButton, LinkButton, VideoButton, ImageButton } from './';
interface ToolbarProps {
  readonly?: boolean;
}
import {
  MdOutlineFormatBold,
  MdOutlineFormatItalic,
  MdOutlineFormatUnderlined,
  MdOutlineCode,
  MdOutlineLooksOne,
  MdOutlineLooksTwo,
  MdOutlineLooks3,
  MdOutlineFormatQuote,
  MdOutlineFormatListNumbered,
  MdOutlineFormatListBulleted,
  MdOutlineFormatAlignLeft,
  MdOutlineFormatAlignCenter,
  MdOutlineFormatAlignRight,
  MdOutlineFormatAlignJustify,
  MdOutlineInsertLink,
  MdOutlineStrikethroughS,
  MdOutlineVideoFile,
  MdOutlineImage,
  MdOutlineFormatColorText,
  MdOutlineFormatColorFill,
  MdOutlineFormatClear,
} from 'react-icons/md';
import ColorPickerButton from './ColorPickerButton';
import ClearButton from './ClearButton';

const Toolbar: FC<ToolbarProps> = ({ readonly }) => {
  return (
    <div id="toolbar" className="flex p-2 gap-2 border-b">
      <MarkButton icon={MdOutlineFormatBold} format="bold" readonly={readonly} />
      <MarkButton icon={MdOutlineFormatItalic} format="italic" readonly={readonly} />
      <MarkButton icon={MdOutlineFormatUnderlined} format="underline" readonly={readonly} />
      <MarkButton icon={MdOutlineStrikethroughS} format="strikethrough" readonly={readonly} />
      <MarkButton icon={MdOutlineCode} format="code" readonly={readonly} />
      <ColorPickerButton icon={MdOutlineFormatColorText} readonly={readonly} format="color" />
      <ColorPickerButton
        icon={MdOutlineFormatColorFill}
        readonly={readonly}
        format="backgroundColor"
      />
      <BlockButton icon={MdOutlineLooksOne} format="heading-one" readonly={readonly} />
      <BlockButton icon={MdOutlineLooksTwo} format="heading-two" readonly={readonly} />
      <BlockButton icon={MdOutlineLooks3} format="heading-three" readonly={readonly} />
      <BlockButton icon={MdOutlineFormatQuote} format="block-quote" readonly={readonly} />
      <BlockButton icon={MdOutlineFormatListNumbered} format="numbered-list" readonly={readonly} />
      <BlockButton icon={MdOutlineFormatListBulleted} format="bulleted-list" readonly={readonly} />
      <BlockButton icon={MdOutlineFormatAlignLeft} format="left" readonly={readonly} />
      <BlockButton icon={MdOutlineFormatAlignCenter} format="center" readonly={readonly} />
      <BlockButton icon={MdOutlineFormatAlignRight} format="right" readonly={readonly} />
      <BlockButton icon={MdOutlineFormatAlignJustify} format="justify" readonly={readonly} />
      <ImageButton icon={MdOutlineImage} readonly={readonly} />
      <LinkButton icon={MdOutlineInsertLink} readonly={readonly} />
      <VideoButton icon={MdOutlineVideoFile} readonly={readonly} />
      <ClearButton icon={MdOutlineFormatClear} readonly={readonly} />
    </div>
  );
};
export default Toolbar;
