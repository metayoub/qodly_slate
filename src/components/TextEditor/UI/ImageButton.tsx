import { FC } from 'react';

interface ImageButton {
  name: string;
  age: number;
}

const ImageButton: FC<ImageButton> = ({ name, age }) => {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Age: {age}</p>
    </div>
  );
};

export default ImageButton;
