import styles from '../styles/components/ImageTab.module.css';
import noImage from '../assets/images/noImage.png';

interface ImageTabProps {
  images: (string | undefined)[];
  currentImg: string | undefined;
  handleImgClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  customStyles?: {
    padding?: string;
    thumbImgHeight?: string;
    imgsHeight?: string;
  };
}

export default function ImageTab({
  images,
  currentImg,
  handleImgClick,
  customStyles = {},
}: ImageTabProps) {
  const { padding, thumbImgHeight, imgsHeight } = customStyles;
  return (
    <div className={styles.detail__left} style={{ padding }}>
      <img
        className={styles.detail__thumb__img}
        style={{ height: thumbImgHeight }}
        src={currentImg}
        alt='img01'
      />
      <div className={styles.detail__imgs} onClick={handleImgClick}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image || noImage}
            alt={`img${index}`}
            style={{ height: imgsHeight }}
          />
        ))}
      </div>
    </div>
  );
}
