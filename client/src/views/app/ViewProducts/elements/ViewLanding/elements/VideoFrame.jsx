import React from "react";

const VideoFrame = () => {
  return (
    <img
      src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_1824,c_limit/97578bf3-82bb-44bb-b807-014026645f34/nike-just-do-it.jpg"
      className="max-w-full"
    />
  );

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
