import { useRef, useState } from 'react';

export const useInputFile = () => {
  const [imageSrcs, setImageSrcs] = useState<string[]>([]);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      const files = Array.from(event.currentTarget.files);

      const newImageSrcs: string[] = [];
      files.forEach((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          newImageSrcs.push(reader.result as string);
          if (newImageSrcs.length === files.length) {
            setImageSrcs((prev) => [...prev, ...newImageSrcs]);
            setFileNames((prev) => [
              ...prev,
              ...files.map((file) => file.name),
            ]);
            setIsLoaded(true);
          }
        };
      });
    }
  };

  return { imageSrcs, fileNames, isLoaded, handleChangeFile };
};

// 블로그 참고하였음
// https://velog.io/@nalsae/input-%EC%9A%94%EC%86%8C%EC%97%90-%EC%9E%85%EB%A0%A5%ED%95%9C-%EC%9D%B4%EB%AF%B8%EC%A7%80-%ED%8C%8C%EC%9D%BC-%EB%AA%85-%EB%AF%B8%EB%A6%AC%EB%B3%B4%EA%B8%B0-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-feat.-%EC%BB%A4%EC%8A%A4%ED%84%B0%EB%A7%88%EC%9D%B4%EC%A7%95
