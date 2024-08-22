import styles from '../styles/components/ImageTab.module.css';

interface ImageTabProps {
  images: string[];
  currentImg: string;
  handleImgClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  customStyles?: {
    detailLeft?: string;
    detailThumbImg?: string;
    detailImgs?: string;
  };
}

export default function ImageTab({
  images,
  currentImg,
  handleImgClick,
  customStyles = {},
}: ImageTabProps) {
  return (
    <div className={`${styles.detail__left} ${customStyles.detailLeft || ''}`}>
      <img
        className={`${styles.detail__thumb__img} ${
          customStyles.detailThumbImg || ''
        }`}
        src={currentImg}
        alt='img01'
      />
      <div
        className={`${styles.detail__imgs} ${customStyles.detailImgs || ''}`}
        onClick={handleImgClick}
      >
        {images.map((image, index) => (
          <img key={index} src={image} alt={`img${index}`} />
        ))}
      </div>
    </div>
  );
}
