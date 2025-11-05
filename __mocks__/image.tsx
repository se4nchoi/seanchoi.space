import React from 'react';

// The props coming in will be a mix of standard ImgHTMLAttributes and Next.js specific ones.
interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
}

const Image = (props: ImageProps) => {
  // Destructure to separate the Next.js props from the standard ones.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { fill, priority, sizes, ...rest } = props;
  
  // eslint-disable-next-line @next/next/no-img-element
  return <img {...rest} />;
};

export default Image;
