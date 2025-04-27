'use client';

import { useState, useEffect } from 'react';
import { BlockNoteView, useBlockNote } from '@blocknote/react';
import '@blocknote/core/style.css';

const BlockNoteEditor = ({ initialContent, onChange, editable = true }) => {
  // Create a new editor instance
  const editor = useBlockNote({
    editable,
    initialContent: initialContent || undefined,
    onEditorContentChange: (editor) => {
      // Get the current editor content as JSON
      const content = editor.topLevelBlocks;
      onChange && onChange(content);
    }
  });

  return (
    <div className={`border rounded-lg overflow-hidden ${editable ? 'min-h-[300px]' : ''}`}>
      <BlockNoteView editor={editor} theme="light" />
    </div>
  );
};

export default BlockNoteEditor; 