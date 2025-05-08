import React, { useCallback } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { FORMAT_TEXT_COMMAND } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $generateHtmlFromNodes } from '@lexical/html';

const theme = {};

const editorConfig = {
  namespace: 'MyEditor',
  theme,
  onError(error) {
    console.error(error);
  },
};

function Toolbar() {
  const [editor] = useLexicalComposerContext();

  const handleBoldClick = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
  };

  return (
    <div className="toolbar">
      <button type="button" onClick={handleBoldClick} className="bold-btn icon-btn"><b>G</b></button>
    </div>
  );
}

function Placeholder() {
  return <div className="editor-placeholder">Écris ici...</div>;
}

function EditorWithOnChange({ onChangeContent }) {
  const [editor] = useLexicalComposerContext();

  const onChange = useCallback((editorState) => {
    editorState.read(() => {
      // On s'assure qu'il y a du contenu avant de transmettre
      const root = editor.getRootElement();
      if (root && root.innerHTML.trim() !== '<br>' && root.textContent.trim() !== '') {
        const html = $generateHtmlFromNodes(editor, null); // Convertir en HTML
        onChangeContent(html); // Passer le contenu au parent
      }
    });
  }, [editor, onChangeContent]);

  return <OnChangePlugin onChange={onChange} />;
}

// Composant principal de l'éditeur
export default function TextEditor({ onChangeContent }) {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-and-toolbar">
        <Toolbar />
        <div className="editor-container">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
          />
          <HistoryPlugin />
          <EditorWithOnChange onChangeContent={onChangeContent} />
        </div>
      </div>
    </LexicalComposer>
  );
}