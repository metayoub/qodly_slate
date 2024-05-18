import { FC } from 'react';

interface VideoButton {
  name: string;
  age: number;
}

const VideoButton: FC<VideoButton> = ({ name, age }) => {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Age: {age}</p>
    </div>
  );
};

export default VideoButton;
