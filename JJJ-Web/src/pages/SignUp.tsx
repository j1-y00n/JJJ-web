// 박용재

import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/pages/SignUp.module.css";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

import { NavLink } from "react-router-dom";
import Postcode from "../components/PostCode";

interface SignUpForm {
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
    userId: "",
    password: "",
    passwordCheck: "",
    name: "",
    email: "",
    phone: "",
    gender: "",
  });

  const nextId = useRef(0);

  const [value, setValue] = useState("male");

  // const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setValue((e.target as HTMLInputElement).value);
  // };



  const [errors, setErrors] = useState<SignUpForm>({
    userId: "",
    password: "",
    passwordCheck: "",
    name: "",
    email: "",
    phone: "",
    gender: "",
  });

  const { userId, password, passwordCheck, name, email, phone, gender } = formData;

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
      console.log("회원 가입 데이터: ", formData);
      alert(`회원 가입을 축하합니다!! ${name}님!! `);

      setFormData({
        userId: "",
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

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue((e.target as HTMLInputElement).value);
  }

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
                  name="userId"
                  placeholder="4글자 이상 영문과 숫자 조합"
                  value={userId}
                  onChange={handleInputChange}
                />
                <button
                  style={{
                    fontSize: "12px",
                    borderRadius: "10px",
                    padding: "5px",
                    cursor: "pointer"
                  }}
                >
                  중복 확인
                </button>

                {errors.userId ? <p style={{ color: "red" }}>{errors.userId}</p> : ""}
              </div>

              <div className="inputPassword" style={{marginLeft: "-73px"}}>
                <label>비밀번호 </label>
                <input
                  type="text"
                  name="password"
                  placeholder="8 ~ 12자의 영문과 숫자 조합"
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
                className="checkedInputPassword" style={{marginLeft: "-100px"}}
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

              <div className="inputName" style={{marginLeft: "-45px"}}>
                <label>이름 </label>
                <input
                  type="text"
                  name="name"
                  placeholder="이름"
                  value={name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="inputEmail" style={{marginLeft: "-60px"}}>
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

              <div className="inputPhone" style={{marginLeft: "-60px"}}>
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

              <div className={styles.choose_gender} style={{display: "flex"}}>
              <label style={{margin: "20px 0 0 -100px"}}>성별 </label>
                <FormControl>        
                  <RadioGroup
                    name="gender"
                    value={value}
                    onChange={handleGenderChange}
                    sx={{
                      width: "100%",
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
                <Postcode/>
              </div>

              <div className={styles.birthday_container} style={{marginLeft: "-115px"}}>
                <label style={{marginTop: "20px"}}>생년월일 </label>
              <select
                  value={birthform.year}
                  onChange={(e) =>
                    setBirthform({ ...birthform, year: Number(e.target.value)})
                  }
                >
                  {years.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </select>

                <select
                  value={birthform.month}
                  onChange={(e) =>
                    setBirthform({ ...birthform, month: e.target.value})
                  }
                >
                  {months.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </select>

                <select
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

              <div className={styles.button_container} >
                <NavLink to="/">
                  <button id={styles.button_detail}>취소</button>
                </NavLink>
                <button id={styles.button_detail}>
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
