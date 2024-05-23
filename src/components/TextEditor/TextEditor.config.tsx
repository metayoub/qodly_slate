import { EComponentKind, T4DComponentConfig } from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';
import { MdOutlineTextSnippet } from 'react-icons/md';

import TextEditorSettings, { BasicSettings } from './TextEditor.settings';

export default {
  craft: {
    displayName: 'TextEditor',
    kind: EComponentKind.BASIC,
    props: {
      name: '',
      classNames: [],
      events: [],
    },
    related: {
      settings: Settings(TextEditorSettings, BasicSettings),
    },
  },
  info: {
    displayName: 'TextEditor',
    exposed: true,
    icon: MdOutlineTextSnippet,
    events: [
      {
        label: 'On Click',
        value: 'onclick',
      },
      {
        label: 'On Blur',
        value: 'onblur',
      },
      {
        label: 'On Focus',
        value: 'onfocus',
      },
      {
        label: 'On MouseEnter',
        value: 'onmouseenter',
      },
      {
        label: 'On MouseLeave',
        value: 'onmouseleave',
      },
      {
        label: 'On KeyDown',
        value: 'onkeydown',
      },
      {
        label: 'On KeyUp',
        value: 'onkeyup',
      },
    ],
    datasources: {
      accept: ['string'],
    },
  },
  defaultProps: {
    readOnly: false,
    style: {
      borderWidth: '1px',
      borderRadius: '6px',
      borderColor: 'inherit',
    },
  },
} as T4DComponentConfig<ITextEditorProps>;

export interface ITextEditorProps extends webforms.ComponentProps {
  readOnly?: boolean;
}
