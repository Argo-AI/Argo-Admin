import { useState } from 'react';
import axios from 'axios';

const VideoUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoUrl, setVideoUrl] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a video file');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('files', file);

      // Set headers
      const headers = {
        'Content-Type': 'multipart/form-data',
        'X-API-Key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzFkMzIzMjc2MmViODE5YWRiYTU0NmIiLCJlbWFpbCI6Imt1bWFyLmdvd3RoYW0rMUBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTczMjQ2MTE1OSwiZXhwIjoxNzY0MDE4NzU5fQ.tXBfuV5nqB6tKlLNHBR-3wgdTBugz9_5YyB1wB_dr60', // Replace with your actual API key
      };

      const response = await axios.post(
        'https://test.api.yourargo.com:3000/file/upload', // API URL
        formData,
        {
          headers,
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );

      if (response.data?.urls?.[0]) {
        // Construct the full GCS URL
        const gcsBaseUrl = 'https://storage.googleapis.com/qq_argo_test_bucket/';
        const uploadedFileName = response.data.urls[0];
        const videoFullUrl = `${gcsBaseUrl}${uploadedFileName}`;

        setVideoUrl(videoFullUrl);
        alert('Upload successful');
      } else {
        throw new Error('Invalid response: No URL received');
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      alert('Error uploading video. Please try again.');
    }
  };

  return (
    <div>
      <h1>Upload Video</h1>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {uploadProgress > 0 && (
        <div style={{ marginTop: '20px' }}>
          <div style={{ width: '100%', backgroundColor: '#f3f3f3', borderRadius: '8px' }}>
            <div
              style={{
                width: `${uploadProgress}%`,
                backgroundColor: '#4caf50',
                height: '20px',
                borderRadius: '8px',
              }}
            ></div>
          </div>
          <p>{uploadProgress}% Uploaded</p>
        </div>
      )}

      {videoUrl && (
        <div style={{ marginTop: '20px' }}>
          <h2>Uploaded Video</h2>
          <video controls width="600" src={videoUrl}></video>
        </div>
      )}
    </div>
  );
};

export default VideoUpload;