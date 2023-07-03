import React from "react";

const VideoFrame = () => {
  return (
    <iframe
      src="https://www.youtube.com/embed/Sp3Xkbnvz50?autoplay=1&mute=1&loop=1"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullScreen
      className="max-w-full"
      style={{
        width: "100%",
        height: "650px",
      }}
    ></iframe>
  );
};

export default VideoFrame;
