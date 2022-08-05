import * as React from 'react';

const VideoListPage = () => {
    return <video width="320" height="240" controls>
  
    <source src="https://firebasestorage.googleapis.com/v0/b/videocollectionwebapp.appspot.com/o/videos%2Fdemo.mp4?alt=media&token=b41dec9b-ac5a-4640-82b2-473d1d2806db" type="video/ogg"></source>
  Your browser does not support the video tag.
  </video>
}
export default VideoListPage;