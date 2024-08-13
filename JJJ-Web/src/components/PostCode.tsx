import React, { useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import styles from "../styles/components/PostCode.module.css";

import Modal from "react-modal";
import CloseIcon from "@mui/icons-material/Close";

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

  // 검색 클릭
  const searchtoggle = () => {
    setIsOpen(!isOpen);
  };

  // 상세주소 검색
  const addressChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetailAddress(e.target.value);
  };

  // 추가
  const addressClickHandler = () => {
    if (!detailAddress) {
      alert("상세주소를 입력해주세요");
    } else {
      console.log(zipCode, roadAddress, detailAddress);
    }
  };

  const modalStyles: ReactModal.Styles = {
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },

    content: {
      width: "500px",
      height: "600px",
      margin: "auto",
      overflow: "hidden",
      padding: "20px",
      position: "absolute",
      borderRadius: "10px",
      boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
      backgroundColor: "white",
      justifyContent: "center",
    },
  };


  return (
    <>
      <div className={styles.address_container} style={{ marginLeft: "10px" }}>
        <div className={styles.postcode_box}>
          <input value={zipCode} placeholder="우편번호" readOnly />
          <button
            onClick={searchtoggle}
            style={{ fontSize: "12px", borderRadius: "10px", padding: "5px", cursor: "pointer" }}
          >
            주소 검색
          </button>
        </div>

        <div className={styles.realAddress_box}>
          <input
            type="text"
            value={roadAddress}
            placeholder="도로명주소"
            readOnly
          />
        </div>

        <Modal isOpen={isOpen} style={modalStyles} ariaHideApp={false} onRequestClose={() => setIsOpen(false)}>
          <div id="closeBtn" style={{display: "flex", justifyContent: "end", marginBottom: "10px"}} >
            <CloseIcon sx={{ cursor: "pointer"}} onClick={() => setIsOpen(false)}/>
          </div>
          <DaumPostcodeEmbed
            onComplete={finalInput}
            style={{ height: "95%" }}
          />
        </Modal>

        <input
          type="text"
          onChange={addressChangeHandler}
          value={detailAddress}
          placeholder="상세주소"
        />

        {/* <button
          onClick={addressClickHandler}
          style={{ fontSize: "12px", borderRadius: "10px", padding: "5px" }}
        >
          입력완료
        </button> */}

        <button>테스트 12123 12</button>
      </div>
    </>
  );
};

export default Postcode;
