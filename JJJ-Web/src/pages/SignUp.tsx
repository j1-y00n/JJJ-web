// 박용재

import React, { useRef, useState } from 'react';
import styles from '../styles/pages/SignUp.module.css';
import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { Logo } from '../components/Header';
import Modal from 'react-modal';
import DaumPostcodeEmbed from 'react-daum-postcode';
import CloseIcon from '@mui/icons-material/Close';
import {
  regexEmail,
  regexId,
  regexName,
  regexPassword,
  regexPhone,
} from '../constants/regex';
interface SignUpForm {
  id: number;
  userId: string;
  password: string;
  passwordCheck: string;
  name: string;
  email: string;
  phone: string;
  address: AddressForm;
  gender?: string | undefined;
  birth?: BirthForm | undefined;
}

interface BirthForm {
  year: string;
  month: string;
  day: string;
}

interface AddressForm {
  zipCode: string;
  roadAddress: string;
  detailAddress: string;
}

export default function SignUp() {
  const userIdRef = useRef(1);
  const navigate = useNavigate();

  const requiredFormInitialValue = {
    id: userIdRef.current,
    userId: '',
    password: '',
    passwordCheck: '',
    name: '',
    email: '',
    phone: '',
    address: {
      zipCode: '',
      roadAddress: '',
      detailAddress: '',
    },
  };

  const includedOptionalFormInitialValue = {
    ...requiredFormInitialValue,
    gender: undefined,
    birth: undefined,
  };

  const [formData, setFormData] = useState<SignUpForm>(
    includedOptionalFormInitialValue
  );

  const [errors, setErrors] = useState<SignUpForm>({
    ...requiredFormInitialValue,
    address: {
      zipCode: '',
      roadAddress: '',
      detailAddress: '',
    },
  });

  const {
    userId,
    password,
    passwordCheck,
    name,
    email,
    phone,
    gender,
    address,
    // birth,
  } = formData;

  // 정규식을 이용한 검증
  const validateId = (userId: string): boolean => {
    return regexId.test(userId);
  };

  const validatePassword = (password: string): boolean => {
    return regexPassword.test(password);
  };

  const checkingPassword = (passwordCheck: string): boolean => {
    return password === passwordCheck ? true : false;
  };

  const validateName = (name: string): boolean => {
    return regexName.test(name);
  };

  const validateEmail = (email: string): boolean => {
    return regexEmail.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    return regexPhone.test(phone);
  };

  const validationRules: Record<string, (value: string) => boolean> = {
    userId: (value: string) => validateId(value),
    password: (value: string) => validatePassword(value),
    passwordCheck: (value: string) => checkingPassword(value),
    name: (value: string) => validateName(value),
    email: (value: string) => validateEmail(value),
    phone: (value: string) => validatePhone(value),
    zipCode: (value: string) => !!value,
    detailAddress: (value: string) => !!value,
  };

  const errorMessages: Record<string, string> = {
    userId: '영어(소문자)와 숫자를 혼합하여 4~20자 이내로 작성하세요',
    password: '영어와 숫자를 혼합하여 8~12자 이내로 작성하세요',
    passwordCheck: '비밀번호가 일치하지 않습니다',
    name: '유효한 이름을 입력하세요',
    email: '유효한 이메일을 입력하세요',
    phone: '유효한 핸드폰 번호를 입력하세요',
    zipCode: '주소찾기 버튼을 눌러주세요',
    detailAddress: '상세주소를 입력해주세요',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 회원가입 버튼 클릭시 input 검증
    let tempErrors = {
      ...requiredFormInitialValue,
      address: {
        zipCode: '',
        roadAddress: '',
        detailAddress: '',
      },
    };

    let isValid = true;

    if (!userId || !validateId(userId)) {
      tempErrors.userId = errorMessages.userId;
      isValid = false;
    }

    if (!password || !validatePassword(password)) {
      tempErrors.password = errorMessages.password;
      isValid = false;
    }

    if (!checkingPassword(passwordCheck)) {
      tempErrors.passwordCheck = errorMessages.passwordCheck;
      isValid = false;
    }

    if (!name || !validateName(name)) {
      tempErrors.name = errorMessages.name;
      isValid = false;
    }

    if (!email || !validateEmail(email)) {
      tempErrors.email = errorMessages.email;
      isValid = false;
    }

    if (!phone || !validatePhone(phone)) {
      tempErrors.phone = errorMessages.phone;
      isValid = false;
    }

    if (!address.zipCode) {
      tempErrors.address!.zipCode = errorMessages.zipCode;
      isValid = false;
    }

    if (address.zipCode && !address.detailAddress) {
      tempErrors.address!.detailAddress = errorMessages.detailAddress;
      isValid = false;
    }

    setErrors(tempErrors);

    if (isValid) {
      console.log('회원 가입 데이터: ', formData);
      alert(`회원 가입을 축하합니다!! ${name}님!! `);
      setFormData(includedOptionalFormInitialValue);
      navigate('/');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedFormData = { ...prevData, [name]: value };

      if (name === 'detailAddress') {
        return {
          ...updatedFormData,
          address: {
            ...prevData.address,
            detailAddress: value,
          },
        };
      }

      return updatedFormData;
    });

    // 에러 메세지가 있는 경우에 실시간 input 검증
    // 올바르게 입력했을 경우 에러 메세지 삭제
    if (validationRules[name]) {
      const isValid = validationRules[name](value);

      if (isValid) {
        setErrors((prev) => ({
          ...prev,
          [name]: isValid && '',
        }));
      }
    }
  };

  // input창에서 focus 잃을 때 input 검증
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (validationRules[name]) {
      const isValid = validationRules[name](value);

      setErrors((prev) => ({
        ...prev,
        [name]: isValid ? '' : errorMessages[name],
      }));
    }
  };

  //! 생일 입력 기능
  const today = new Date();
  const [birthForm, setBirthForm] = useState<BirthForm | undefined>(undefined);

  const updateBirthForm = (field: 'year' | 'month' | 'day', value: string) => {
    setBirthForm((prev) => {
      const updatedForm = {
        ...prev,
        [field]: value,
      } as BirthForm;
      if (
        updatedForm.year === '선택' ||
        updatedForm.month === '선택' ||
        updatedForm.day === '선택'
      ) {
        return undefined;
      }

      setFormData((prevData) => ({
        ...prevData,
        birth: updatedForm,
      }));

      return updatedForm;
    });
  };

  const selectedYear = birthForm?.year || '선택';
  const selectedMonth = birthForm?.month || '선택';
  const selectedDay = birthForm?.day || '선택';

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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleSearchtoggle = () => {
    setIsOpen(!isOpen);
  };
  const finalInput = (data: any) => {
    setFormData((prevData) => ({
      ...prevData,
      address: {
        ...prevData.address,
        zipCode: data.zonecode,
        roadAddress: data.roadAddress,
        detailAddress: prevData.address?.detailAddress || '',
      },
    }));
    setIsOpen(false);
  };

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
                  name='userId'
                  minLength={4}
                  maxLength={20}
                  placeholder='소문자와 숫자를 혼합하여 4~20자 이내'
                  value={userId.toLowerCase()}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                />
              </div>
              <Button
                color='info'
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
            {errors.userId ? (
              <p className={styles.error}>{errors.userId}</p>
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
                  name='password'
                  minLength={8}
                  maxLength={12}
                  placeholder='8 ~ 12자의 영문과 숫자 조합'
                  value={password}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
            {errors.password ? (
              <p className={styles.error}>{errors.password}</p>
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
                  name='name'
                  maxLength={20}
                  placeholder='이름 - 한글 및 영어만 허용'
                  value={name}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
            {errors.name ? <p className={styles.error}>{errors.name}</p> : ' '}
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
                  name='email'
                  maxLength={50}
                  placeholder='example@gmail.com'
                  value={email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
            {errors.email ? (
              <p className={styles.error}>{errors.email}</p>
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
                  name='phone'
                  minLength={11}
                  maxLength={11}
                  placeholder='ex) 01012345678 - (-) 없이 작성'
                  value={phone}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
            {errors.phone ? (
              <p className={styles.error}>{errors.phone}</p>
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
                    name='zipCode'
                    value={formData.address?.zipCode || ''}
                    placeholder='우편번호'
                    onChange={handleInputChange}
                    readOnly
                  />
                </div>
                <Button
                  onClick={handleSearchtoggle}
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
                    name='roadAddress'
                    value={formData.address?.roadAddress || ''}
                    placeholder='도로명주소'
                    onChange={handleInputChange}
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
                    id='closeBtn'
                    style={{
                      display: 'flex',
                      justifyContent: 'end',
                      marginBottom: '10px',
                    }}
                  >
                    <CloseIcon
                      sx={{ cursor: 'pointer' }}
                      onClick={() => setIsOpen(false)}
                    />
                  </div>
                  <DaumPostcodeEmbed
                    onComplete={finalInput}
                    style={{ height: '95%' }}
                  />
                </Modal>

                <div className={styles.input__box}>
                  <input
                    className={styles.input}
                    name='detailAddress'
                    maxLength={50}
                    value={formData.address?.detailAddress || ''}
                    placeholder='상세주소'
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                  />
                </div>
              </div>
            </div>
            <div className={styles.input__container}>
              {errors.address.zipCode && (
                <p className={styles.error}>{errors.address.zipCode}</p>
              )}
              {errors.address.detailAddress && (
                <p className={styles.error}>{errors.address.detailAddress}</p>
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
                  name='gender'
                  value={gender || ''}
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
                  onChange={(e) => updateBirthForm('year', e.target.value)}
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
                  onChange={(e) => updateBirthForm('month', e.target.value)}
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
                  onChange={(e) => updateBirthForm('day', e.target.value)}
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
