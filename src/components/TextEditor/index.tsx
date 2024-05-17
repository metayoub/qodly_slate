import config, { ITextEditorProps } from './TextEditor.config';
import { T4DComponent, useEnhancedEditor } from '@ws-ui/webform-editor';
import Build from './TextEditor.build';
import Render from './TextEditor.render';

const TextEditor: T4DComponent<ITextEditorProps> = (props) => {
  const { enabled } = useEnhancedEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return enabled ? <Build {...props} /> : <Render {...props} />;
};

TextEditor.craft = config.craft;
TextEditor.info = config.info;
TextEditor.defaultProps = config.defaultProps;

export default TextEditor;
