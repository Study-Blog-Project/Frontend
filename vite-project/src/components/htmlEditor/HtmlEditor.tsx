import  { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles

interface HtmlEditorProps{
  onChange?: (value: string) => void;  
}

function HtmlEditor({onChange}:HtmlEditorProps) {
  const [content, setContent] = useState('');

  const modules = {
    toolbar: {
      container: [
        ['image'],
        [{ header: [1, 2, 3, 4, 5, false] }],
        ['bold',  'italic', 'underline', 'strike', 'blockquote','link'],
      ],
    },
  };


  const handleChange = (value:string) => {

    setContent(value);
    onChange?.(value);
  };

  return (
    <div>
      <ReactQuill 
      style={{ width: '100%', height: '100%' }}
        theme="snow"
      
        modules={modules}
        value={content}
        onChange={handleChange}
      />
    </div>
  );
}

export default HtmlEditor;
