// 박용재

import React, { useEffect, useState } from "react";
import styles from "../styles/pages/SignUp.module.css";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { symbolName } from "typescript";
import DaumPostcode, { DaumPostcodeEmbed } from "react-daum-postcode";
import { NavLink } from "react-router-dom";
import Postcode from "../components/PostCode";

interface SignUpForm {
  id: string;
  password: string;
  passwordCheck: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
}

export default function SignUp() {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    passwordCheck: "",
    name: "",
    email: "",
    phone: "",
    gender: "",
  });

  const [genderValue, setGenderValue] = useState("male");

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGenderValue((event.target as HTMLInputElement).value);
  };

  const [errors, setErrors] = useState<SignUpForm>({
    id: "",
    password: "",
    passwordCheck: "",
    name: "",
    email: "",
    phone: "",
    gender: "",
  });

  const { id, password, passwordCheck, name, email, phone, gender } = formData;

  const validateId = (id: string): boolean => {
    return /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{4}$/.test(id);
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
      id: "",
      password: "",
      passwordCheck: "",
      name: "",
      email: "",
      phone: "",
      gender: "",
    };

    let isValid = true;

    if (!id || !validateId(id)) {
      tempErrors.id = "영어와 숫자를 포함하여 4글자 이상 작성하세요";
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
      console.log("회원 가입 데이터: ", formData);
      alert(`회원 가입을 축하합니다!! ${id}님!! `);

      setFormData({
        id: "",
        password: "",
        passwordCheck: "",
        name: "",
        email: "",
        phone: "",
        gender: "",
      });
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

  // const BirthYearSelector = () => {
  //   const [isYearOptionExisted, setIsYearOptionExisted] = useState(false);
  //   const [years, setYears] = useState([]);
  
  //   useEffect(() => {
  //     if (!isYearOptionExisted) {
  //       const generatedYears = [];
  //       for (let i = 1940; i <= 2022; i++) {
  //         generatedYears.push(i);
  //       }
  //       setYears(generatedYears);
  //       setIsYearOptionExisted(true);
  //     }
  //   }, [isYearOptionExisted]);
  
  //   return (
  //     <select id="birth-year" onFocus={() => setIsYearOptionExisted(false)}>
  //       {years.map((year) => (
  //         <option key={year} value={year}>
  //           {year}
  //         </option>
  //       ))}
  //     </select>
  //   );
  // };

  return (
    <div id={styles.login_page}>
      <div id={styles.login_container}>
        <div className={styles.login_header}>Join The JJJ Web Store</div>

        <div className={styles.login_section}>
          <div className={styles.login_form}>
            <form onSubmit={handleSubmit}>
              <div className="inputId">
                <label>아이디 </label>
                <input
                  type="text"
                  name="id"
                  placeholder="4글자 이상 영문과 숫자 조합"
                  value={id}
                  onChange={handleInputChange}
                />
                <button
                  style={{
                    fontSize: "12px",
                    borderRadius: "10px",
                    padding: "5px",
                  }}
                >
                  중복 확인
                </button>
                {errors.id ? <p style={{ color: "red" }}>{errors.id}</p> : ""}
              </div>

              <div className="inputPassword" style={{ marginLeft: "-14px" }}>
                <label>비밀번호 </label>
                <input
                  type="text"
                  name="password"
                  placeholder="8 ~ 10자의 영문과 숫자 조합"
                  value={password}
                  onChange={handleInputChange}
                />
                {errors.password ? (
                  <p style={{ color: "red" }}>{errors.password}</p>
                ) : (
                  " "
                )}
              </div>

              <div
                className="checkedInputPassword"
                style={{ marginLeft: "-42px" }}
              >
                <label>비밀번호 확인</label>
                <input
                  type="text"
                  name="passwordCheck"
                  placeholder="비밀번호 확인"
                  value={passwordCheck}
                  onChange={handleInputChange}
                />
                {errors.passwordCheck ? (
                  <p style={{ color: "red" }}>{errors.passwordCheck}</p>
                ) : (
                  ""
                )}
              </div>

              <div className="inputName" style={{ marginLeft: "14px" }}>
                <label>이름 </label>
                <input
                  type="text"
                  name="name"
                  placeholder="이름"
                  value={name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="inputEmail">
                <label>이메일 </label>
                <input
                  type="text"
                  name="email"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={handleInputChange}
                />
                {errors.email ? (
                  <p style={{ color: "red" }}>{errors.email}</p>
                ) : (
                  ""
                )}
              </div>

              <div className="inputPhone">
                <label>휴대폰 </label>
                <input
                  type="text"
                  name="phone"
                  placeholder="010-1234-5678"
                  value={phone}
                  onChange={handleInputChange}
                />
                {errors.phone ? (
                  <p style={{ color: "red" }}>{errors.phone}</p>
                ) : (
                  ""
                )}
              </div>

              <div className={styles.choose_gender}>
                <FormControl sx={{ display: "flex", flexDirection: "row" }}>
                  <FormLabel sx={{ color: "black", margin: "20px 12px" }}>
                    성별
                  </FormLabel>
                  <RadioGroup
                    id="ABC"
                    name="gender"
                    value={genderValue}
                    onChange={handleGenderChange}
                    sx={{
                      width: "50%",
                      display: "flex",
                      flexDirection: "row",
                      marginLeft: "50px",
                    }}
                  >
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                      sx={{ width: "100px" }}
                    />

                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                      sx={{ width: "100px" }}
                    />
                  </RadioGroup>
                </FormControl>
              </div>

              <div className="inputAddress" style={{ display: "flex" }}>
                <label style={{ marginTop: "20px" }}>주소 </label>
                <Postcode />
              </div>

              <div className={styles.birthday_container}>
                <label style={{ marginTop: "20px" }}>생년월일</label>
                <select className="yearBox" id="birth_year">
                  <option disabled selected>
                    출생 연도
                  </option>
                </select>
                <select className="monthBox" id="birth_month">
                  <option disabled selected>
                    월
                  </option>
                </select>
                <select className="dayBox" id="birth_day">
                  <option disabled selected>
                    일
                  </option>
                </select>
              </div>

              <div className={styles.button_container}>
                <NavLink to="/">
                  <button id={styles.button_detail}>취소</button>
                </NavLink>
                <button id={styles.button_detail} type="submit">
                  회원가입
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
