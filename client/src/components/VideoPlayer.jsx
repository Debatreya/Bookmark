import React from 'react';
import YouTube from 'react-youtube';

const VideoPlayer = ({ videoUrl, videoTitle }) => {
  const videoId = getYouTubeVideoId(videoUrl);
  return (
    <div className="max-w-full max-h-full inline-flex m-auto flex-col justify-center items-center gap-5">
        <h1 className="text-2xl font-bold text-center text-yellow-500 inline">{videoTitle}</h1>
        <hr className="w-full bg-white"/>
        {videoId && <YouTube videoId={videoId} />}
    </div>
  );
};

function getYouTubeVideoId(url) {
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length === 11) {
    return match[2];
  } else {
    // Invalid YouTube URL
    return null;
  }
}

export default VideoPlayer;