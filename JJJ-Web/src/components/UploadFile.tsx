import { useState } from 'react';
import styles from '../styles/components/UploadFile.module.css';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

interface UploadFileProp{
  UploadFileStyles: {
    left: number;
    top: number;
  };
}

export default function UploadFile() {
  const [images, setImages] = useState<string[]>([]);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const MAX_IMAGES = 5;
  const isDisabled = images.length >= MAX_IMAGES;

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      const files = Array.from(event.currentTarget.files);

      const newImages: string[] = [];
      files.forEach((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          newImages.push(reader.result as string);
          if (newImages.length === files.length) {
            setImages((prev) => {
              const combinedImages = [...prev, ...newImages];

              return combinedImages.slice(0, MAX_IMAGES);
            });
            setFileNames((prev) => {
              const combinedFileNames = [
                ...prev,
                ...files.map((file) => file.name),
              ];
              return combinedFileNames.slice(0, MAX_IMAGES);
            });
            setIsLoaded(true);
          }
        };
      });
    }
  };

  const handleDeleteImage = (indexToDelete: number) => {
    setImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToDelete)
    );
    setFileNames((prevFileNames) =>
      prevFileNames.filter((_, index) => index !== indexToDelete)
    );
  };

  return (
    <div className={styles.upload__container}>
      <div>
        <label
          role='button'
          htmlFor='file'
          className={`${styles.label__button} ${
            isDisabled ? styles.disabled : ''
          }`}
        >
          <AddAPhotoIcon />
          <span className={styles.label__span}>이미지 등록 : 최대 5개</span>
        </label>
        <input
          id='file'
          className={styles.sr__only}
          type='file'
          multiple
          onChange={handleChangeFile}
          disabled={isDisabled}
        />
      </div>
      {isLoaded && (
        <div className={styles.preview__container}>
          {images.slice(0, 5).map((src, index) => (
            <div key={index} className={styles.output__image}>
              <img src={src} alt={`미리보기 ${index + 1}`} />
              <IconButton
                onClick={() => handleDeleteImage(index)}
                sx={{
                  padding: '1px',
                  position: 'absolute',
                  top: '1px',
                  right: '1px',
                }}
              >
                <ClearIcon sx={{ fontSize: 'var(--font-size-small)' }} />
              </IconButton>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
