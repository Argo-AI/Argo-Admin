
import { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axiosInstance from "../api/axiosInstance";

const Privacy = () => {
  const [content, setContent] = useState(``);



  useEffect(() => {
    getContent();
  }, []);   

  const getContent = async () => {
    try {
      // TODO: Replace with your actual API endpoint
      const response = await axiosInstance.get('/static-content')
      
      if (!response.data) {
        throw new Error('Failed to fetch terms');
      }
      
      console.log('terms:', response.data);
      const data = await response.data?.filter((r: any)=>{
        return r.type === 'privacy_policy'
      })?.[0];
      if(!data) return;
      setContent(data.content);
    } catch (error) {
      console.error('Error fetching privacy:', error);
      alert('Failed to fetch privacy policy');
    }
  };  

  const handleSave = async () => {
    try {
      // TODO: Replace with your actual API endpoint
      const response = await axiosInstance.post('/static-content', {
          "type": "privacy_policy",
          "title": "Privacy Policy",
          "content": content
      });
      
      if (!response.data) {
        throw new Error('Failed to save privacy');
      }
      
      alert('Privacy saved successfully!');
    } catch (error) {
      console.error('Error saving terms:', error);
      alert('Failed to save privacy');
    }
  };

  return (
    <div className="w-full p-0 m-0 relative">
      <div className="p-6 max-w-4xl mx-auto">
        <Editor
          value={content}
          apiKey="xkd0c5tsvrkuovvczo1o9r9afdg6o8nisa84hukv1m4dtcio"
          onEditorChange={(newContent) => setContent(newContent)}
          init={{
            height: 500,
            menubar: true,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
            ],
            toolbar: 'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
          }}
        />
        <button 
          onClick={handleSave}
          className="bg-primary text-white px-4 py-2 rounded mt-4"
        >
          Save Changes
        </button>
        <div className="mt-6 prose">
          <h2>Preview:</h2>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </div>
  );
};

export default Privacy;
