import { Image } from 'antd';

export const ImageFinder = (props) => {
  const { src } = props;
  return (
    <>
      <Image src={`/src/assets/${src}`} />
    </>
  );
};
