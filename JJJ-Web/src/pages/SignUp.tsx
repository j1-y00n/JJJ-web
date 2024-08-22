// 박용재

import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/pages/SignUp.module.css';
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';

import { NavLink, useNavigate } from 'react-router-dom';
import { Logo } from '../components/Header';
import Modal from 'react-modal';
import DaumPostcodeEmbed from 'react-daum-postcode';
import CloseIcon from '@mui/icons-material/Close';

// 옵션기능에는 ? 물음표 사용 권장
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

// 생성
interface BirthForm {
  year: string;
  month: string;
  day: string;
}

// 생성
interface AddressForm {
  zipCode: string;
  roadAddress: string;
  detailAddress: string;
}

export default function SignUp() {
  const userIdRef = useRef(1);

  // 초기값 설정함으로써 아래에서 반복되는 코드 줄임
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

  // 초기값 설정함으로써 아래에서 반복되는 코드 줄임
  const includedOptionalFormInitialValue = {
    ...requiredFormInitialValue,
    gender: undefined,
    birth: undefined,
  };

  // SignUpForm 타입 추가
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
    return /^(01[016789]{1}) ?[0-9]{4} ?[0-9]{4}$/.test(phone);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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
      tempErrors.userId = '영어와 숫자를 포함하여 4글자 이상 작성하세요';
      isValid = false;
    }

    if (!password || !validatePassword(password)) {
      tempErrors.password = '영어와 숫자를 포함하여 8 ~ 12글자로 작성하세요';
      isValid = false;
    }

    if (!checkingPassword(passwordCheck)) {
      tempErrors.passwordCheck = '비밀번호를 재입력해주세요';
      isValid = false;
    }

    if (!email || !validateEmail(email)) {
      tempErrors.email = '유효한 이메일을 입력하거나 빈 칸을 채워주세요';
      isValid = false;
    }

    if (!phone || !validatePhone(phone)) {
      tempErrors.phone = '유효한 핸드폰 번호를 입력하거나 빈 칸을 채워주세요';
      isValid = false;
    }

    if (!address.zipCode) {
      tempErrors.address!.zipCode = '주소찾기 버튼을 눌러주세요';
      isValid = false;
    }

    if (address.zipCode && !address.detailAddress) {
      tempErrors.address!.detailAddress = '상세주소를 입력해주세요';
      isValid = false;
    }


    setErrors(tempErrors);

    if (isValid) {
      console.log('회원 가입 데이터: ', formData);
      alert(`회원 가입을 축하합니다!! ${name}님!! `);

      setFormData(includedOptionalFormInitialValue);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //? 이벤트에서 입력 필드의 이름과 값을 추출
    const { name, value } = e.target;

    if (name === 'detailAddress') {
      setFormData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          detailAddress: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
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

  // 검색 클릭
  const handleSearchtoggle = () => {
    setIsOpen(!isOpen);
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

  const navigate = useNavigate();

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
                  type='text'
                  className={styles.input}
                  name='userId'
                  placeholder='4글자 이상 영문과 숫자 조합'
                  value={userId}
                  onChange={handleInputChange}
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
                  type='text'
                  className={styles.input}
                  name='password'
                  placeholder='8 ~ 12자의 영문과 숫자 조합'
                  value={password}
                  onChange={handleInputChange}
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
                  type='text'
                  className={styles.input}
                  name='passwordCheck'
                  placeholder='비밀번호 확인'
                  value={passwordCheck}
                  onChange={handleInputChange}
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
                  type='text'
                  className={styles.input}
                  name='name'
                  placeholder='이름'
                  value={name}
                  onChange={handleInputChange}
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
                  placeholder='example@gmail.com'
                  value={email}
                  onChange={handleInputChange}
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
                  type='text'
                  name='phone'
                  placeholder='010-1234-5678'
                  value={phone}
                  onChange={handleInputChange}
                  className={styles.input}
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
                    name='zipCode'
                    value={formData.address?.zipCode || ''}
                    placeholder='우편번호'
                    className={styles.input}
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
                    name='roadAddress'
                    value={formData.address?.roadAddress || ''}
                    placeholder='도로명주소'
                    className={styles.input}
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
                    name='detailAddress'
                    value={formData.address?.detailAddress || ''}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder='상세주소'
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
