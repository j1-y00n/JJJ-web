// 박용재

import React, { useState } from "react";
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

interface SignUpForm {
  id: string;
  password: string;
  passwordCheck: string;
  email: string;
  phone: string;
  gender: string;
}

export default function SignUp() {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    passwordCheck: "",
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
    email: "",
    phone: "",
    gender: "",
  });

  const { id, password, passwordCheck, email, phone, gender } = formData;

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
      email: "",
      phone: "",
      gender: "",
    };

    let isValid = true;

    if (!id) {
      tempErrors.id = "아이디를 입력해주세요";
      isValid = false;
    }

    if (!password || !validatePassword(password)) {
      tempErrors.password = "영어와 숫자를 포함하여 8 ~ 12글자로 작성하세요";
      alert("비밀번호 입력을 완료해주세요");
      isValid = false;
    }

    if (!checkingPassword(passwordCheck)) {
      tempErrors.passwordCheck = "비밀번호를 재입력해주세요";
      alert("비밀번호 확인을 완료해주세요");
      isValid = false;
    }

    if (!email || !validateEmail(email)) {
      tempErrors.email = "유효한 이메일을 입력하거나 빈 칸을 채워주세요";
      alert("이메일 입력을 완료해주세요");
      isValid = false;
    }

    if (!phone || !validatePhone(phone)) {
      tempErrors.phone = "유효한 핸드폰 번호를 입력하거나 빈 칸을 채워주세요";
      alert("휴대폰 번호 입력을 완료해주세요");
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

  const Postcode = () => {
    const handleAddressComplete = (data: { address: any; addressType: string; bname: string; buildingName: string; }) => {
      let fullAddress = data.address;
      let extraAddress = '';
  
      if (data.addressType === 'R') {
        if (data.bname !== '') {
          extraAddress += data.bname;
        }
        if (data.buildingName !== '') {
          extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
        }
        fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
      }
    }
  }
  

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
                  value={id}
                  onChange={handleInputChange}
                />
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
                  <FormLabel
                    sx={{ color: "black", margin: "20px 12px"}}
                  >
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
                      marginLeft: "50px"
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

              <div>
                <DaumPostcodeEmbed onComplete={Postcode}/>
              </div>

              <div className={styles.address}></div>
              
              <div className={styles.button_container}>
                <button id={styles.button_detail}>취소</button>
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
