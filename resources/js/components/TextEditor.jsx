import React, { useCallback } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { FORMAT_TEXT_COMMAND } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

const theme = {};

const editorConfig = {
  namespace: 'MyEditor',
  theme,
  onError(error) {
    console.error(error);
  },
};

// ✅ Le bouton est un composant enfant du composer
function Toolbar() {
  const [editor] = useLexicalComposerContext();

  const handleBoldClick = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
  };

  return (
    <div className="toolbar">
      <button type="button" onClick={handleBoldClick}><b>G</b></button>
    </div>
  );
}

export default function LexicalEditor({ onChangeContent }) {
  const onChange = useCallback((editorState) => {
    editorState.read(() => {
      const json = editorState.toJSON();
      onChangeContent(json);
    });
  }, [onChangeContent]);

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <Toolbar />

      <div className="editor-container">
        <RichTextPlugin
          contentEditable={<ContentEditable className="editor-input" />}
          placeholder={<div className="editor-placeholder">Écris ici...</div>}
        />
        <HistoryPlugin />
        <OnChangePlugin onChange={onChange} />
      </div>
    </LexicalComposer>
  );
}
