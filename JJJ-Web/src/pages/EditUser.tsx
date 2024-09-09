// 변지윤
// 회원정보 수정
import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/pages/EditUser.module.css'
import Modal from 'react-modal';
import DaumPostcodeEmbed from 'react-daum-postcode';
import CloseIcon from '@mui/icons-material/Close';
import {  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup
} from '@mui/material';
import { getUserById, updateUser } from '../services/userServices';
import { User } from '../types/type';

interface SignUpForm {
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

// db.json 연결
interface UserUpdateProps {
  userId: number;
}

export default function EditUser({userId}: UserUpdateProps) {

  // db.json 연결 유저 정보 랜더링
  const [user, setUser] = useState<Partial<User>>({});
  
  // ------------------회원가입 양식-------------------------------------

  // 초기값 설정함으로써 아래에서 반복되는 코드 줄임
  const requiredFormInitialValue = {
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
    name,
    email,
    phone,
    gender,
    address,
    // birth,
  } = formData;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await getUserById(userId);
        setUser(fetchedUser);

        // 기존 유저 데이터를 formData에 반영
        setFormData({
          name: fetchedUser.userName,
          email: fetchedUser.userEmail,
          phone: fetchedUser.userPhone,
          address: {
            zipCode: '', // API에서 우편번호를 가져오지 않으면 기본값 설정
            roadAddress: fetchedUser.userAddress,
            detailAddress: fetchedUser.userAddressDetail || ''
          },
          gender: fetchedUser.userGender || undefined,
          birth: fetchedUser.userBirth
            ? {
                year: fetchedUser.userBirth.slice(0, 4),
                month: fetchedUser.userBirth.slice(5, 7),
                day: fetchedUser.userBirth.slice(8, 10)
              }
            : undefined
        });
      } catch (error) {
      console.error('Failed to fetch user:', error);
      }
    };
    fetchUser();
  }, [userId]);
  console.log(user);


  const validateName = (name: string): boolean => {
    return /^[a-zA-Z가-힣][a-zA-Z가-힣\s]*[a-zA-Z가-힣]$/.test(name);
  };

  const validateEmail = (email: string): boolean => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    return /^010\d{8}$/.test(phone);
  };

  const validationRules: Record<string, (value: string) => boolean> = {
    name: (value: string) => validateName(value),
    email: (value: string) => validateEmail(value),
    phone: (value: string) => validatePhone(value),
    zipCode: (value: string) => !!value,
    detailAddress: (value: string) => !!value,
  };

  const errorMessages: Record<string, string> = {
    name: '유효한 이름을 입력하세요',
    email: '유효한 이메일을 입력하세요',
    phone: '유효한 핸드폰 번호를 입력하세요',
    zipCode: '주소찾기 버튼을 눌러주세요',
    detailAddress: '상세주소를 입력해주세요',
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      if (name === 'detailAddress') {
        return {
          ...prevData,
          address: {
            ...prevData.address,
            detailAddress: value,
          },
        };
      }

      return {
        ...prevData, [name]: value
      }
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

  const handleSubmit = async (e: React.FormEvent) => {
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

    if (!formData.name || !validateName(name)) {
      tempErrors.name = errorMessages.name;
      isValid = false;
    }

    if (!formData.email || !validateEmail(email)) {
      tempErrors.email = errorMessages.email;
      isValid = false;
    }

    if (!formData.phone || !validatePhone(phone)) {
      tempErrors.phone = errorMessages.phone;
      isValid = false;
    }

    if (!formData.address.zipCode) {
      tempErrors.address!.zipCode = errorMessages.zipCode;
      isValid = false;
    }

    if (address.zipCode && !formData.address.detailAddress) {
      tempErrors.address!.detailAddress = errorMessages.detailAddress;
      isValid = false;
    }

    setErrors(tempErrors);

    if (isValid) {
      try {
        await updateUser(userId, {
          ...user,
          userName: formData.name,
          userEmail: formData.email,
          userPhone: formData.phone,
          userAddress: formData.address.roadAddress,
          userAddressDetail: formData.address.detailAddress,
          userGender: formData.gender as "male" | "female" | "other",
          userBirth: formData.birth ? `${formData.birth.year}-${formData.birth.month}-${formData.birth.day}` : '',
        });
        console.log('회원 수정 데이터: ', formData);
        alert(`회원 정보가 수정되었습니다! ${name}님! `);
        setFormData(formData);
        
      } catch (error) {
        console.log(error);
        alert('FAIL update user')
      }
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

  const years: string[] = [user.userBirth?.slice(0, 4) as string];
  for (let y = today.getFullYear(); y >= 1930; y--) {
    years.push(y.toString());
  }


  const months: string[] = [user.userBirth?.slice(5, 7) as string];
  for (let m = 1; m <= 12; m++) {
    months.push(m.toString().padStart(2, '0'));
  }

  let date = new Date(Number(selectedYear), Number(selectedMonth), 0).getDate();
  let days: string[] = [user.userBirth?.slice(8, 10) as string];
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


// ----------------------새로 작성한 코드--------------------------------
  // 회원정보 확인 부분
  const [password, setPassword] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const handlePasswordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const handleCheckSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password === user.userPassword) {
      setIsVerified(true);
    } else {
      alert('비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.')
    }
  }

  // 회원정보 수정 부분
  const handleCancel = () => {
    setIsVerified(false);
    setPassword('');
  }


  return (
    <div className={styles.edit__container}>
      <div className={styles.edit__header}>회원정보수정</div>

      {isVerified ? (
      // 회원 정보 수정
      <div>

        <div className={styles.login__section}>
          <form className={styles.login__form}>

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
                    value={formData.name}
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
                    value={formData.email}
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
                    placeholder='01012345678'
                    value={formData.phone}
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
                      value={formData.address.roadAddress}
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
                      value={formData.address.detailAddress}
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
                    value={formData.gender || ''}
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
                type='button'
                onClick={handleCancel}
                sx={{
                  width: '100%',
                  fontSize: 'var(--font-size-regular)',
                }}
              >
                취소
              </Button>
              <Button
                type='submit'
                onClick={(e) => {
                  handleSubmit(e);
                }}
                sx={{
                  width: '100%',
                  fontSize: 'var(--font-size-regular)',
                }}
              >
                수정
              </Button>
            </div>
          </form>
        </div>
      </div>
      ) : (
      // 회원 정보 확인 
      <div>
        <div className={styles.edit__check__title}>회원정보 확인</div>
        <div style={{marginBottom: '30px'}}>정보를 안전하게 보호하기 위해 비밀번호를 다시 한번 입력해주세요</div>
        <div className={styles.login__section}>
          <form className={styles.login__form} onSubmit={handleCheckSubmit}>
            <div className={styles.input__container}>
              <div className={styles.input__wrapper}>
                <div className={styles.label__box}>
                  <label>아이디</label>
                </div>
                <div className={styles.input__box}>
                  <input
                    type='text'
                    className={styles.input}
                    name='userId'
                    value={user.userLoginId}
                    disabled
                  />
                </div>
              </div>
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
                    onChange={handlePasswordCheck}
                  />
                </div>
              </div>
            </div>
            <div className={styles.button__container}>
              <Button
                type='button'
                onClick={handleCancel}
                sx={{
                  width: '100%',
                  fontSize: 'var(--font-size-regular)',
                }}
              >
                취소
              </Button>
              <Button
                type='submit'
                sx={{
                  width: '100%',
                  fontSize: 'var(--font-size-regular)',
                }}
              >
                확인
              </Button>
            </div>
          </form>
        </div>
      </div>
      )}

    </div>
  )
}