interface IProps {
  videoId: string;
  videoTitle: string;
  className: string;
}

const VideoIframe: React.FC<IProps> = (props) => {
  const { videoId, videoTitle, className } = props;
  const videoURL = `https://www.youtube.com/embed/${videoId}?rel=0&amp;showinfo=0?ecver=2`;

  return (
    <iframe
      title={videoTitle}
      className={className}
      src={videoURL}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
};

export default VideoIframe;
