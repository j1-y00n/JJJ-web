import { useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import styles from "../styles/components/PostCode.module.css";
import { Modal } from "@mui/material";

const Postcode: React.FC = () => {
  const [zipCode, setZipCode] = useState<string>("");
  const [roadAddress, setRoadAddress] = useState<string>("");
  const [detailAddress, setDetailAddress] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const finalInput = (data: any) => {
    setZipCode(data.zonecode);
    setRoadAddress(data.roadAddress);
    setIsOpen(false);
  };

  const searchtoggle = () => {
    setIsOpen(!isOpen);
  };

  const addressChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetailAddress(e.target.value);
  };

  const addressClickHandler = () => {
    if (!detailAddress) {
      alert("상세주소를 입력해주세요");
    } else {
      console.log(zipCode, roadAddress, detailAddress);
    }
  };

  return (
    <>
      <div className={styles.address_box}>
        <input type="text" value={zipCode} placeholder="우편번호" readOnly />
        <button onClick={searchtoggle}>주소찾기</button>
        <input type="text" value={roadAddress} placeholder="도로명주소" readOnly />
        



        
        <DaumPostcodeEmbed onComplete={finalInput} />
        
        <input type="text" value={detailAddress} onChange={addressChangeHandler}/>
        <button onClick={addressClickHandler}>클릭</button>
      </div>

      
    </>
  );
};

export default Postcode;