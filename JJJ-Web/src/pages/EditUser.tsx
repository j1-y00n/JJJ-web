// 변지윤
// 회원정보 수정
import React, { useEffect, useState } from 'react';
import styles from '../styles/pages/EditUser.module.css';
import Modal from 'react-modal';
import DaumPostcodeEmbed, { Address } from 'react-daum-postcode';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { getUserById, updateUser } from '../services/userServices';
import { User } from '../types/type';
import { UserStore } from '../stores/User.store';
import { useLocation, useNavigate } from 'react-router-dom';

interface ErrorForm {
  userName: string;
  userPhone: string;
  userEmail: string;
  userAddress: string;
  userAddressDetail: string;
}

const initialError: ErrorForm = {
  userName: '',
  userEmail: '',
  userPhone: '',
  userAddress: '',
  userAddressDetail: '',
};

export default function EditUser() {
  const { user, setUser } = UserStore();
  if (user) {
    const [errors, setErrors] = useState<ErrorForm>(initialError);
    let {
      userLoginId,
      userName,
      userEmail,
      userPhone,
      userZipCode,
      userAddress,
      userAddressDetail,
      userGender,
      userBirth,
    } = user;

    const validateName = (name: string): boolean => {
      return /^[a-zA-Z가-힣][a-zA-Z가-힣\s]*[a-zA-Z가-힣]$/.test(name);
    };

    const validateEmail = (email: string): boolean => {
      return /\S+@\S+\.\S+/.test(email);
    };

    const validatePhone = (phone: string): boolean => {
      return /^010\d{8}$/.test(phone);
    };

    const validationRules = {
      userName: (value: string) => validateName(value),
      userEmail: (value: string) => validateEmail(value),
      userPhone: (value: string) => validatePhone(value.replace(/-/g, '')),
      userAddress: (value: string) => !!value,
      userAddressDetail: (value: string) => !!value,
    };

    const errorMessages: Record<string, string> = {
      userName: '유효한 이름을 입력하세요',
      userEmail: '유효한 이메일을 입력하세요',
      userPhone: '유효한 핸드폰 번호를 입력하세요',
      userAddress: '주소찾기 버튼을 눌러주세요',
      userAddressDetail: '상세주소를 입력해주세요',
    };

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

      if (isValid) {
        try {
          await updateUser(Number(user.id), {
            ...user,
            userName,
            userEmail,
            userPhone,
            userAddress,
            userAddressDetail,
            userGender,
            userBirth,
          });
          console.log('회원 수정 데이터: ', user);
          alert(`회원 정보가 수정되었습니다! ${userName}님! `);
          setUser(user);
        } catch (error) {
          console.log(error);
          alert('FAIL update user');
        }
      }
    };

    const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      const { name, value } = e.target;
      setUser({ ...user, [name]: value });

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
    const handleDateChange = (
      field: 'year' | 'month' | 'day',
      value: string
    ) => {
      const year = userBirth?.slice(0, 4) || '';
      const month = userBirth?.slice(5, 7) || '';
      const day = userBirth?.slice(8, 10) || '';

      const newDate =
        field === 'year'
          ? `${value}-${month}-${day}`
          : field === 'month'
          ? `${year}-${value}-${day}`
          : `${year}-${month}-${value}`;

      setUser({ ...user, userBirth: newDate });
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

    let date = new Date(
      Number(selectedYear),
      Number(selectedMonth),
      0
    ).getDate();
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

    // SignUp.tsx와 다르게 추가 된 부분
    // 회원정보 확인 부분
    const [password, setPassword] = useState('');
    const [isVerified, setIsVerified] = useState(false);

    const handlePasswordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    };

    const handleCheckSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      if (password === user.userPassword) {
        setIsVerified(true);
      } else {
        alert(
          '비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.'
        );
      }
    };

    // 회원정보 수정 부분
    const handleCancel = () => {
      setIsVerified(false);
      setPassword('');
    };

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
                        value={userPhone?.replace(/-/g, '')}
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
                  <div
                    className={`${styles.input__wrapper} ${styles.btn__box}`}
                  >
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
                            onClick={() => setIsFindModalOpen(false)}
                          />
                        </div>
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
                        <p className={styles.error}>
                          {errors.userAddressDetail}
                        </p>
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
                        onChange={(e) =>
                          handleDateChange('month', e.target.value)
                        }
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
                        onChange={(e) =>
                          handleDateChange('day', e.target.value)
                        }
                        disabled={
                          selectedMonth === '선택' || selectedYear === '선택'
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
            <div style={{ marginBottom: '30px' }}>
              정보를 안전하게 보호하기 위해 비밀번호를 다시 한번 입력해주세요
            </div>
            <div className={styles.login__section}>
              <form className={styles.login__form} onSubmit={handleCheckSubmit}>
                <div className={styles.input__container}>
                  <div className={styles.input__wrapper}>
                    <div className={styles.label__box}>
                      <label>아이디</label>
                    </div>
                    <div className={styles.input__box}>
                      <input
                        className={styles.input}
                        type='text'
                        name='userLoginId'
                        value={userLoginId}
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
                        className={styles.input}
                        type='text'
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
    );
  } else {
    return <div>유저가 없습니다</div>;
  }
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
