// 박용재

import React, { useState } from 'react';
import styles from '../styles/pages/SignUp.module.css';
import Modal from 'react-modal';
import DaumPostcodeEmbed, { Address } from 'react-daum-postcode';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../components/Header';
import {
  regexEmail,
  regexId,
  regexName,
  regexPassword,
  regexPhone,
} from '../constants/regex';
import { User } from '../types/type';
import { createUser, getUsers } from '../services/userServices';
import { getNextId } from '../services/commonServices';
import { error } from 'console';

interface UserForm extends Omit<User, 'id'> {
  passwordCheck: string;
}

interface ErrorForm {
  userLoginId: string;
  userPassword: string;
  passwordCheck: string;
  userName: string;
  userPhone: string;
  userEmail: string;
  userAddress: string;
  userAddressDetail: string;
}

const initialUser: UserForm = {
  userLoginId: '',
  userPassword: '',
  passwordCheck: '',
  userName: '',
  userEmail: '',
  userPhone: '',
  userZipCode: '',
  userAddress: '',
  userAddressDetail: '',
  userGender: null,
  userBirth: null,
  userSignUpDate: '',
  userWithdrawDate: null,
};

const initialError: ErrorForm = {
  userLoginId: '',
  userPassword: '',
  passwordCheck: '',
  userName: '',
  userEmail: '',
  userPhone: '',
  userAddress: '',
  userAddressDetail: '',
};

export default function SignUp() {
  const [user, setUser] = useState<UserForm>(initialUser);
  let {
    userLoginId,
    userPassword,
    passwordCheck,
    userName,
    userEmail,
    userPhone,
    userZipCode,
    userAddress,
    userAddressDetail,
    userGender,
    userBirth,
    userWithdrawDate,
  } = user;
  const navigate = useNavigate();

  const [errors, setErrors] = useState<ErrorForm>(initialError);
  const [isDuplicateChecked, setIsDuplicateChecked] = useState(false);

  // 정규식을 이용한 검증
  const validateId = (userLoginId: string): boolean => {
    return regexId.test(userLoginId);
  };

  const validatePassword = (userPassword: string): boolean => {
    return regexPassword.test(userPassword);
  };

  const checkingPassword = (passwordCheck: string): boolean => {
    return userPassword === passwordCheck ? true : false;
  };

  const validateName = (userName: string): boolean => {
    return regexName.test(userName);
  };

  const validateEmail = (userEmail: string): boolean => {
    return regexEmail.test(userEmail);
  };

  const validatePhone = (userPhone: string): boolean => {
    return regexPhone.test(userPhone);
  };

  const validationRules = {
    userLoginId: (value: string) => validateId(value),
    userPassword: (value: string) => validatePassword(value),
    passwordCheck: (value: string) => checkingPassword(value),
    userName: (value: string) => validateName(value),
    userEmail: (value: string) => validateEmail(value),
    userPhone: (value: string) => validatePhone(value),
    userAddress: (value: string) => !!value,
    userAddressDetail: (value: string) => !!value,
  };

  const errorMessages: Record<string, string> = {
    userLoginId: '영어(소문자)와 숫자를 혼합하여 4~20자 이내로 작성하세요',
    userPassword: '영어와 숫자를 혼합하여 8~12자 이내로 작성하세요',
    passwordCheck: '비밀번호가 일치하지 않습니다',
    userName: '유효한 이름을 입력하세요',
    userEmail: '유효한 이메일을 입력하세요',
    userPhone: '유효한 핸드폰 번호를 입력하세요',
    userAddress: '주소찾기 버튼을 눌러주세요',
    userAddressDetail: '상세주소를 입력해주세요',
  };

  // 회원가입 버튼 클릭시 / input 검증 및 회원 추가
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let tempErrors: ErrorForm = { ...initialError };
    console.log(tempErrors);
    let isValid = true;

    Object.keys(validationRules).forEach((key) => {
      const fieldKey = key as keyof ErrorForm;
      const value = user[fieldKey] as string;
      const validate = validationRules[fieldKey];

      if (validate) {
        const isValidField = validate(value);
        if (!isValidField) {
          tempErrors[fieldKey] = errorMessages[fieldKey] || '';
          isValid = false;
        } else {
          tempErrors[fieldKey] = '';
        }
      }
    });
    setErrors(tempErrors);
    if (userLoginId && !isDuplicateChecked) {
      alert('중복 확인 버튼을 클릭하여 주세요');
    }
    if (isValid) {
      const users = await getUsers();
      const newUser = {
        id: getNextId(users),
        userLoginId,
        userPassword,
        userName,
        userEmail,
        userPhone,
        userAddress,
        userAddressDetail,
        userGender,
        userBirth,
        userSignUpDate: new Date().toISOString().slice(0, -5) + 'Z',
        userWithdrawDate,
      };
      console.log(newUser);
      await createUser(newUser);
      console.log('회원 가입 데이터: ', newUser);

      alert(`회원 가입을 축하합니다!! ${userLoginId}님!! 로그인 하여 주세요`);

      setUser(initialUser);
      navigate('/signIn');
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

    // 아이디를 바꾸면 중복확인 기능을 해야하도록 작성
    if (name === 'userLoginId') {
      setIsDuplicateChecked(false);
    }

    // 에러 메세지가 있는 경우에만 작동
    // 실시간 input 검증
    // 올바르게 입력했을 경우 에러 메세지 삭제
    if (name in validationRules) {
      const key = name as keyof typeof validationRules;

      if (errors[key]) {
        const isValid = validationRules[key](value as string);
        setErrors((prev) => ({
          ...prev,
          [name]: isValid ? '' : errorMessages[name] || '',
        }));
      }
    }
  };

  // input창에서 focus 잃을 때 input 검증
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name in validationRules) {
      const key = name as keyof typeof validationRules;
      const isValid = validationRules[key](value as string);
      setErrors((prev) => ({
        ...prev,
        [name]: isValid ? '' : errorMessages[name] || '',
      }));
    }
  };

  //! 생일 입력 기능
  const today = new Date();
  const handleDateChange = (field: 'year' | 'month' | 'day', value: string) => {
    const year = userBirth?.slice(0, 4) || '';
    const month = userBirth?.slice(5, 7) || '';
    const day = userBirth?.slice(8, 10) || '';

    const newDate =
      field === 'year'
        ? `${value}-${month}-${day}`
        : field === 'month'
        ? `${year}-${value}-${day}`
        : `${year}-${month}-${value}`;

    setUser((prev) => ({
      ...prev,
      userBirth: newDate,
    }));
  };

  const selectedYear = userBirth?.slice(0, 4) || '선택';
  const selectedMonth = userBirth?.slice(5, 7) || '선택';
  const selectedDay = userBirth?.slice(8, 10) || '선택';

  const years: string[] = ['선택'];
  for (let y = today.getFullYear(); y >= 1930; y--) {
    years.push(y.toString());
  }

  const months: string[] = ['선택'];
  for (let m = 1; m <= 12; m++) {
    months.push(m.toString().padStart(2, '0'));
  }

  let date = new Date(Number(selectedYear), Number(selectedMonth), 0).getDate();
  let days: string[] = ['선택'];
  for (let d = 1; d <= date; d++) {
    days.push(d.toString().padStart(2, '0'));
  }

  //! 주소 입력 기능
  const [isFindModalOpen, setIsFindModalOpen] = useState<boolean>(false);
  const handleSearchAddress = () => {
    setIsFindModalOpen(!isFindModalOpen);
  };
  const handleComplete = (data: Address) => {
    setUser({
      ...user,
      userZipCode: data.zonecode,
      userAddress: data.address,
    });
    setIsFindModalOpen(false);
  };

  // 중복 확인
  const checkDuplicate = async () => {
    if (errors.userLoginId || !userLoginId) {
      return alert(errorMessages.userLoginId);
    }
    const users = await getUsers();
    const user = users.find((user) => user.userLoginId === userLoginId);

    if (user) {
      alert('이미 존재하는 아이디 입니다.');
    } else {
      alert('사용 가능한 아이디 입니다.');
      setIsDuplicateChecked(true);
    }
  };

  return (
    <div className='flex__container'>
      <Logo />
      <div className={styles.login__section}>
        <form className={styles.login__form}>
          <div className={styles.input__container}>
            <div className={`${styles.input__wrapper} ${styles.btn__box}`}>
              <div className={styles.label__box}>
                <label>아이디</label>
              </div>
              <div className={styles.input__box}>
                <input
                  className={styles.input}
                  type='text'
                  name='userLoginId'
                  minLength={4}
                  maxLength={20}
                  placeholder='소문자와 숫자를 혼합하여 4~20자 이내'
                  value={userLoginId.toLowerCase()}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                />
              </div>
              <Button
                color='info'
                onClick={checkDuplicate}
                sx={{
                  position: 'absolute',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  right: '-80px',
                }}
              >
                중복 확인
              </Button>
            </div>
            {errors.userLoginId ? (
              <p className={styles.error}>{errors.userLoginId}</p>
            ) : (
              ' '
            )}
          </div>

          <div className={styles.input__container}>
            <div className={styles.input__wrapper}>
              <div className={styles.label__box}>
                <label>비밀번호</label>
              </div>
              <div className={styles.input__box}>
                <input
                  className={styles.input}
                  type='text'
                  name='userPassword'
                  minLength={8}
                  maxLength={12}
                  placeholder='8 ~ 12자의 영문과 숫자 조합'
                  value={userPassword}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
            {errors.userPassword ? (
              <p className={styles.error}>{errors.userPassword}</p>
            ) : (
              ' '
            )}
          </div>

          <div className={styles.input__container}>
            <div className={styles.input__wrapper}>
              <div className={styles.label__box}>
                <label>비밀번호 확인</label>
              </div>
              <div className={styles.input__box}>
                <input
                  className={styles.input}
                  type='text'
                  name='passwordCheck'
                  minLength={8}
                  maxLength={12}
                  placeholder='비밀번호 확인'
                  value={passwordCheck}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
            {errors.passwordCheck ? (
              <p className={styles.error}>{errors.passwordCheck}</p>
            ) : (
              ' '
            )}
          </div>

          <div className={styles.input__container}>
            <div className={styles.input__wrapper}>
              <div className={styles.label__box}>
                <label>이름</label>
              </div>
              <div className={styles.input__box}>
                <input
                  className={styles.input}
                  type='text'
                  name='userName'
                  maxLength={20}
                  placeholder='이름 - 한글 및 영어만 허용'
                  value={userName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
            {errors.userName ? (
              <p className={styles.error}>{errors.userName}</p>
            ) : (
              ' '
            )}
          </div>

          <div className={styles.input__container}>
            <div className={styles.input__wrapper}>
              <div className={styles.label__box}>
                <label>이메일</label>
              </div>
              <div className={styles.input__box}>
                <input
                  type='text'
                  className={styles.input}
                  name='userEmail'
                  maxLength={50}
                  placeholder='example@gmail.com'
                  value={userEmail}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
            {errors.userEmail ? (
              <p className={styles.error}>{errors.userEmail}</p>
            ) : (
              ' '
            )}
          </div>

          <div className={styles.input__container}>
            <div className={styles.input__wrapper}>
              <div className={styles.label__box}>
                <label>휴대폰</label>
              </div>
              <div className={styles.input__box}>
                <input
                  className={styles.input}
                  type='text'
                  name='userPhone'
                  minLength={11}
                  maxLength={11}
                  placeholder='ex) 01012345678 - (-) 없이 작성'
                  value={userPhone}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
            {errors.userPhone ? (
              <p className={styles.error}>{errors.userPhone}</p>
            ) : (
              ' '
            )}
          </div>

          <div className={styles.input__container}>
            <div className={`${styles.input__wrapper} ${styles.btn__box}`}>
              <div className={styles.label__box}>
                <label>주소</label>
              </div>
              <div className={styles.address__box}>
                <div className={styles.input__box}>
                  <input
                    className={styles.input}
                    name='userZipCode'
                    value={userZipCode}
                    placeholder='우편번호'
                    readOnly
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                  />
                </div>
                <Button
                  onClick={handleSearchAddress}
                  color='info'
                  sx={{
                    borderRadius: '10px',
                    cursor: 'pointer',
                    position: 'absolute',
                    right: '-70px',
                    top: '5px',
                  }}
                >
                  주소찾기
                </Button>

                <div className={styles.input__box}>
                  <input
                    className={styles.input}
                    name='userAddress'
                    value={userAddress}
                    placeholder='도로명주소'
                    readOnly
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                  />
                </div>

                <Modal
                  isOpen={isFindModalOpen}
                  style={modalStyles}
                  ariaHideApp={false}
                  onRequestClose={() => setIsFindModalOpen(false)}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'end',
                      marginBottom: '10px',
                    }}
                  >
                    <CloseIcon
                      sx={{ cursor: 'pointer' }}
                      onClick={() => setIsFindModalOpen(false)}
                    />
                  </Box>
                  <DaumPostcodeEmbed
                    onComplete={handleComplete}
                    style={{ height: '95%' }}
                  />
                </Modal>

                <div className={styles.input__box}>
                  <input
                    className={styles.input}
                    name='userAddressDetail'
                    maxLength={50}
                    value={userAddressDetail}
                    placeholder='상세주소'
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                  />
                </div>
              </div>
            </div>
            <div className={styles.input__container}>
              {!userAddress && errors.userAddress && (
                <p className={styles.error}>{errors.userAddress}</p>
              )}

              {userAddress &&
                !userAddressDetail &&
                errors.userAddressDetail && (
                  <p className={styles.error}>{errors.userAddressDetail}</p>
                )}
            </div>
          </div>

          <div className={styles.more__info__container}>
            <div className={styles.more__info}>추가정보</div>
            <div className={styles.more__box}></div>
          </div>

          <div className={styles.input__container}>
            <div className={styles.input__wrapper}>
              <div className={styles.label__box}>
                <label>성별</label>
              </div>
              <FormControl>
                <RadioGroup
                  name='userGender'
                  value={userGender}
                  onChange={handleInputChange}
                  sx={{
                    width: '300px',
                    display: 'flex',
                    flexDirection: 'row',
                    marginLeft: '60px',
                  }}
                >
                  <FormControlLabel
                    value='male'
                    control={<Radio />}
                    label='남성'
                  />

                  <FormControlLabel
                    value='female'
                    control={<Radio />}
                    label='여성'
                  />
                </RadioGroup>
              </FormControl>
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
                  value={selectedYear}
                  onChange={(e) => {
                    handleDateChange('year', e.target.value);
                  }}
                >
                  {years.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </select>

                <select
                  className={styles.birth__select}
                  value={selectedMonth}
                  onChange={(e) => handleDateChange('month', e.target.value)}
                  disabled={selectedYear === '선택'}
                >
                  {months.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </select>

                <select
                  className={styles.birth__select}
                  value={selectedDay}
                  onChange={(e) => handleDateChange('day', e.target.value)}
                  disabled={selectedMonth === '선택' || selectedYear === '선택'}
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
            <Button
              sx={{ fontSize: 'var(--font-size-medium)', width: '100%' }}
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              회원가입
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

const modalStyles: ReactModal.Styles = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  content: {
    width: '500px',
    height: '600px',
    margin: 'auto',
    overflow: 'hidden',
    padding: '20px',
    position: 'absolute',
    borderRadius: '10px',
    boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
};
