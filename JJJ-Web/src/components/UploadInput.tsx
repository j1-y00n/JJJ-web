import { useInputFile } from '../hooks/useInputfile';
import styles from '../styles/components/UploadInput.module.css';

export default function UploadInput() {
  const { imageSrcs, fileNames, isLoaded, handleChangeFile } = useInputFile();

  return (
    <div className={styles.upload__container}>
      <div>
        <label role='button' htmlFor='file' className={styles.label__button}>
          이미지 등록 : 최대 5개
        </label>
        <input
          id='file'
          type='file'
          multiple
          onChange={handleChangeFile}
          className={styles.sr__only}
        />
      </div>
      {isLoaded && (
        <div className={styles.preview__container}>
          {imageSrcs.slice(0, 5).map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`미리보기 ${index + 1}`}
              className={styles.output__image}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// 여유가 되면 구현해보고 싶은 로직
// 이미지를 업로드하면 덮어씌우게 하기
// 이미지에 X 버튼 눌러서 삭제하는 기능
