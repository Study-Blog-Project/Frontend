import React, { useEffect, useRef } from 'react';
import Editor from '@toast-ui/editor';

function HtmlEditor() {
  const editorRef = useRef(null);

  useEffect(() => {
    const editorInstance = new Editor({
      el: editorRef.current,
      toolbarItems: [
        ['heading', 'bold', 'italic', 'strike'],
        ['hr', 'quote'],
        // ...
      ],
      // ...
    });

    return () => {
      editorInstance.remove(); // 에디터 정리
    };
  }, []); // 한 번만 초기화

  return (
    <div ref={editorRef} id="editor" style={{ height: '500px' }}>
      {/* 에디터를 표시할 DOM 요소 */}
    </div>
  );
}

export default HtmlEditor;
