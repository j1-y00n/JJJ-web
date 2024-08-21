// 박용재

import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/pages/SignUp.module.css";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

import { NavLink, useNavigate } from "react-router-dom";
import { Logo } from "../components/Header";
import Modal from "react-modal";
import DaumPostcodeEmbed from "react-daum-postcode";
import CloseIcon from "@mui/icons-material/Close";

interface SignUpForm {
  id: number;
  userId: string;
  password: string;
  passwordCheck: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
}

export default function SignUp() {
  const [formData, setFormData] = useState({
    id: 1,
    userId: "",
    password: "",
    passwordCheck: "",
    name: "",
    email: "",
    phone: "",
    gender: "",
  });

  const nextId = useRef(2);

  const [gendervalue, setGenderValue] = useState("male");

  const [errors, setErrors] = useState<SignUpForm>({
    id: 1,
    userId: "",
    password: "",
    passwordCheck: "",
    name: "",
    email: "",
    phone: "",
    gender: "",
  });

  const { userId, password, passwordCheck, name, email, phone, gender } =
    formData;

  const validateId = (userId: string): boolean => {
    return /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{4,}$/.test(userId);
  };

  const validatePassword = (password: string): boolean => {
    return /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,12}$/.test(password);
  };

  const checkingPassword = (passwordCheck: string): boolean => {
    return password === passwordCheck ? true : false;
  };

  const validateEmail = (email: string): boolean => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    return /^(01[016789]{1})-?[0-9]{4}-?[0-9]{4}$/.test(phone);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let tempErrors = {
      id: 1,
      userId: "",
      password: "",
      passwordCheck: "",
      name: "",
      email: "",
      phone: "",
      gender: "",
    };

    let isValid = true;

    if (!userId || !validateId(userId)) {
      tempErrors.userId = "영어와 숫자를 포함하여 4글자 이상 작성하세요";
      // alert('아이디 확인을 완료해주세요');
      isValid = false;
    }

    if (!password || !validatePassword(password)) {
      tempErrors.password = "영어와 숫자를 포함하여 8 ~ 12글자로 작성하세요";
      // alert("비밀번호 입력을 완료해주세요");
      isValid = false;
    }

    if (!checkingPassword(passwordCheck)) {
      tempErrors.passwordCheck = "비밀번호를 재입력해주세요";
      // alert("비밀번호 확인을 완료해주세요");
      isValid = false;
    }

    if (!email || !validateEmail(email)) {
      tempErrors.email = "유효한 이메일을 입력하거나 빈 칸을 채워주세요";
      // alert("이메일 입력을 완료해주세요");
      isValid = false;
    }

    if (!phone || !validatePhone(phone)) {
      tempErrors.phone = "유효한 핸드폰 번호를 입력하거나 빈 칸을 채워주세요";
      // alert("휴대폰 번호 입력을 완료해주세요");
      isValid = false;
    }

    setErrors(tempErrors);

    if (isValid) {
      console.log("회원 가입 데이터: ", formData, gendervalue);
      alert(`회원 가입을 축하합니다!! ${name}님!! `);

      setFormData({
        id: nextId.current,
        userId: "",
        password: "",
        passwordCheck: "",
        name: "",
        email: "",
        phone: "",
        gender: "",
      });

      nextId.current += 1;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //? 이벤트에서 입력 필드의 이름과 값을 추출
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGenderValue((e.target as HTMLInputElement).value);
  };

  //! 생일 입력 기능
  const today = new Date();
  const [birthform, setBirthform] = useState({
    year: today.getFullYear(),
    month: "1",
    day: "1",
  });

  let years = [];
  for (let y = today.getFullYear(); y >= 1930; y -= 1) {
    years.push(y);
  }

  let months = [];
  for (let m = 1; m <= 12; m += 1) {
    if (m < 10) {
      months.push("0" + m.toString());
    } else {
      months.push(m.toString());
    }
  }

  let days = [];
  let date = new Date(birthform.year, Number(birthform.month), 0).getDate();
  for (let d = 1; d <= date; d += 1) {
    if (d < 10) {
      days.push("0" + d.toString());
    } else {
      days.push(d.toString());
    }
  }

  //! 주소 입력 기능
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

  const navigate = useNavigate();

  return (
    <div className="flex__container">
      <div className={styles.login__container}>
        <Logo />
      </div>
      <div className={styles.login__section}>
        <form className={styles.login__form} onSubmit={handleSubmit}>
          <div className={styles.input__container}>
            <div className={`${styles.input__wrapper} ${styles.btn__box}`}>
              <div className={styles.label__box}>
                <label>아이디</label>
              </div>
              <div className={styles.input__box}>
                <input
                  type="text"
                  className={styles.input}
                  name="userId"
                  placeholder="4글자 이상 영문과 숫자 조합"
                  value={userId}
                  onChange={handleInputChange}
                />
              </div>
              <Button
                color="info"
                sx={{
                  position: "absolute",
                  borderRadius: "10px",
                  cursor: "pointer",
                  right: "-80px",
                }}
              >
                중복 확인
              </Button>
            </div>
            {errors.userId ? (
              <p className={styles.error}>{errors.userId}</p>
            ) : (
              " "
            )}
          </div>

          <div className={styles.input__container}>
            <div className={styles.input__wrapper}>
              <div className={styles.label__box}>
                <label>비밀번호</label>
              </div>
              <div className={styles.input__box}>
                <input
                  type="text"
                  className={styles.input}
                  name="password"
                  placeholder="8 ~ 12자의 영문과 숫자 조합"
                  value={password}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            {errors.password ? (
              <p className={styles.error}>{errors.password}</p>
            ) : (
              " "
            )}
          </div>

          <div className={styles.input__container}>
            <div className={styles.input__wrapper}>
              <div className={styles.label__box}>
                <label>비밀번호 확인</label>
              </div>
              <div className={styles.input__box}>
                <input
                  type="text"
                  className={styles.input}
                  name="passwordCheck"
                  placeholder="비밀번호 확인"
                  value={passwordCheck}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            {errors.passwordCheck ? (
              <p className={styles.error}>{errors.passwordCheck}</p>
            ) : (
              " "
            )}
          </div>

          <div className={styles.input__container}>
            <div className={styles.input__wrapper}>
              <div className={styles.label__box}>
                <label>이름</label>
              </div>
              <div className={styles.input__box}>
                <input
                  type="text"
                  className={styles.input}
                  name="name"
                  placeholder="이름"
                  value={name}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            {errors.name ? <p className={styles.error}>{errors.name}</p> : " "}
          </div>

          <div className={styles.input__container}>
            <div className={styles.input__wrapper}>
              <div className={styles.label__box}>
                <label>이메일</label>
              </div>
              <div className={styles.input__box}>
                <input
                  type="text"
                  className={styles.input}
                  name="email"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            {errors.email ? (
              <p className={styles.error}>{errors.email}</p>
            ) : (
              " "
            )}
          </div>

          <div className={styles.input__container}>
            <div className={styles.input__wrapper}>
              <div className={styles.label__box}>
                <label>휴대폰</label>
              </div>
              <div className={styles.input__box}>
                <input
                  type="text"
                  name="phone"
                  placeholder="010-1234-5678"
                  value={phone}
                  onChange={handleInputChange}
                  className={styles.input}
                />
              </div>
            </div>
            {errors.phone ? (
              <p className={styles.error}>{errors.phone}</p>
            ) : (
              " "
            )}
          </div>

          <div className={styles.input__container}>
            <div className={styles.input__wrapper}>
              <div className={styles.label__box}>
                <label>성별</label>
              </div>
              <FormControl>
                <RadioGroup
                  name="gender"
                  value={gendervalue}
                  onChange={handleGenderChange}
                  sx={{
                    width: "300px",
                    display: "flex",
                    flexDirection: "row",
                    marginLeft: "60px",
                  }}
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />

                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>

          <div className={styles.input__container}>
            <div className={`${styles.input__wrapper} ${styles.btn__box}`}>
              <div className={styles.label__box}>
                <label>주소</label>
              </div>
              <div className={styles.address__box}>
                <div className={styles.input__box}>
                  <input
                    value={zipCode}
                    placeholder="우편번호"
                    className={styles.input}
                    readOnly
                  />
                </div>
                <Button
                  onClick={searchtoggle}
                  color="info"
                  sx={{
                    borderRadius: "10px",
                    cursor: "pointer",
                    position: "absolute",
                    right: "-70px",
                    top: "5px",
                  }}
                >
                  주소찾기
                </Button>

                <div className={styles.input__box}>
                  <input
                    value={roadAddress}
                    placeholder="도로명주소"
                    className={styles.input}
                    readOnly
                  />
                </div>

                <Modal
                  isOpen={isOpen}
                  style={modalStyles}
                  ariaHideApp={false}
                  onRequestClose={() => setIsOpen(false)}
                >
                  <div
                    id="closeBtn"
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      marginBottom: "10px",
                    }}
                  >
                    <CloseIcon
                      sx={{ cursor: "pointer" }}
                      onClick={() => setIsOpen(false)}
                    />
                  </div>
                  <DaumPostcodeEmbed
                    onComplete={finalInput}
                    style={{ height: "95%" }}
                  />
                </Modal>

                <div className={styles.input__box}>
                  <input
                    value={detailAddress}
                    onChange={addressChangeHandler}
                    className={styles.input}
                    placeholder="상세주소"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.input__container}>
            <div className={styles.input__wrapper}>
              <div className={styles.label__box}>
                <label>생년월일</label>
              </div>
              <div className={styles.input__box}>
                <select
                  className={styles.birth__select}
                  value={birthform.year}
                  onChange={(e) =>
                    setBirthform({
                      ...birthform,
                      year: Number(e.target.value),
                    })
                  }
                >
                  {years.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </select>

                <select
                  className={styles.birth__select}
                  value={birthform.month}
                  onChange={(e) =>
                    setBirthform({ ...birthform, month: e.target.value })
                  }
                >
                  {months.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </select>

                <select
                  className={styles.birth__select}
                  value={birthform.day}
                  onChange={(e) =>
                    setBirthform({ ...birthform, day: e.target.value })
                  }
                >
                  {days.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className={styles.button__container}>
            {/* <Button
              onClick={() => navigate("/")}
              sx={{ fontSize: "var(--font-size-medium)" }}
            >
              취소
            </Button> */}

            <Button
              sx={{ fontSize: "var(--font-size-medium)", width: "100%"}}
            >
              회원가입
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
