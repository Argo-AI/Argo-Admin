import { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axiosInstance from "../api/axiosInstance";

const Terms = () => {
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
        return r.type === 'terms_and_conditions'
      })[0];
      setContent(data.content);
    } catch (error) {
      console.error('Error fetching terms:', error);
      alert('Failed to fetch terms');
    }
  };  

  const handleSave = async () => {
    try {
      // TODO: Replace with your actual API endpoint
      const response = await axiosInstance.post('/static-content', {
          "type": "terms_and_conditions",
          "title": "Terms and Conditions",
          "content": content
      });
      
      if (!response.data) {
        throw new Error('Failed to save terms');
      }
      
      alert('Terms saved successfully!');
    } catch (error) {
      console.error('Error saving terms:', error);
      alert('Failed to save terms');
    }
  };

  return (
    <div className="w-full p-0 m-0 relative">
      <div className="p-6 max-w-4xl mx-auto">
        <Editor
          value={content}
          apiKey="uu2807a0b8cv6oslym95g0d323jspbfwjgguwt2fvd4i08fi"
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

export default Terms;
