import { FC } from 'react';
import { MarkButton, BlockButton, LinkButton, VideoButton } from './';
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
} from 'react-icons/md';

const Toolbar: FC<ToolbarProps> = ({ readonly }) => {
  return (
    <div id="toolbar" className="flex p-2 gap-2 border-b">
      <MarkButton icon={MdOutlineFormatBold} format="bold" readonly={readonly} />
      <MarkButton icon={MdOutlineFormatItalic} format="italic" readonly={readonly} />
      <MarkButton icon={MdOutlineFormatUnderlined} format="underline" readonly={readonly} />
      <MarkButton icon={MdOutlineStrikethroughS} format="strikethrough" readonly={readonly} />
      <MarkButton icon={MdOutlineCode} format="code" readonly={readonly} />
      <BlockButton icon={MdOutlineLooksOne} format="heading-one" readonly={readonly} />
      <BlockButton icon={MdOutlineLooksTwo} format="heading-two" readonly={readonly} />
      <BlockButton icon={MdOutlineFormatQuote} format="block-quote" readonly={readonly} />
      <BlockButton icon={MdOutlineFormatListNumbered} format="numbered-list" readonly={readonly} />
      <BlockButton icon={MdOutlineFormatListBulleted} format="bulleted-list" readonly={readonly} />
      <BlockButton icon={MdOutlineFormatAlignLeft} format="left" readonly={readonly} />
      <BlockButton icon={MdOutlineFormatAlignCenter} format="center" readonly={readonly} />
      <BlockButton icon={MdOutlineFormatAlignRight} format="right" readonly={readonly} />
      <BlockButton icon={MdOutlineFormatAlignJustify} format="justify" readonly={readonly} />
      <LinkButton icon={MdOutlineInsertLink} readonly={readonly} />
      <VideoButton icon={MdOutlineVideoFile} readonly={readonly} />
    </div>
  );
};

export default Toolbar;
