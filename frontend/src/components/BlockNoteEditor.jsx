'use client';

import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/core/style.css';

const BlockNoteEditor = ({ initialContent, onChange, editable = true }) => {
  // Create a new editor instance
  // const editor = useCreateBlockNote({
  //   editable,
  //   initialContent: initialContent || undefined,
  //   onEditorContentChange: (editor) => {
  //     // Get the current editor content as JSON
  //     const content = editor.topLevelBlocks;
  //     onChange && onChange(content);
  //   }
  // });
  const editor = useCreateBlockNote();

  return (
    <div className={`border rounded-lg overflow-hidden ${editable ? 'min-h-[300px]' : ''}`}>
      <BlockNoteView editor={editor} theme="light" onChange={(editor) => {
        console.log('Editor content changed:', editor.document);
        onChange && onChange(editor.document);
      }} />
    </div>
  );
};

export default BlockNoteEditor; 