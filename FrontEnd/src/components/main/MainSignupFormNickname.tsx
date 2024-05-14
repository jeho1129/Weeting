import styles from '@/styles/main/MainLoginForm.module.css';
import { MainSignupFormNicknameProps } from '@/types/user';
import { nicknameCheckApi } from '@/services/userApi';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { buttonError } from '@/utils/buttonClick';

const MainSignupFormNickname = ({
  nickname,
  onNicknameHandler,
  nicknamePossible,
  nicknameCheckHandler,
}: MainSignupFormNicknameProps) => {
  const [nicknameChecked, setNicknameChecked] = useState(0);

  const handleNickNameCheck = (e: React.FormEvent) => {
    e.preventDefault();
    // nickname 중복확인 api call
    nicknameCheckApi({
      nickname: nickname,
    })
      .then((data) => {
        console.log('data :', data);
        if (data.dataBody === true) {
          buttonError();
          Swal.fire({
            title: '이미 사용중인 닉네임입니다',
            icon: 'error',
          });
          nicknameCheckHandler(0); // 사용 불가능한 id에 대해 0을 전달
          setNicknameChecked(1);
        } else {
          if (nickname === '') {
            buttonError();
            Swal.fire({
              title: '닉네임을 입력해주세요',
              icon: 'error',
            });
            return;
          }
          Swal.fire({
            title: '사용할 수 있는 닉네임입니다',
            icon: 'success',
          });
          nicknameCheckHandler(1); // 사용 가능한 id에 대해 1을 전달
          setNicknameChecked(0);
        }
      })
      .catch(() => {
        buttonError();
        Swal.fire({
          title: '다시 시도해주세요',
          icon: 'error',
        });
      });
    console.log('닉네임 중복확인 api call');
  };

  return (
    <>
      <div className={styles.Mgb}>
        <label className={`${styles.Label} FontM20Bold`} htmlFor="nickname">
          nickname
        </label>
        <input
          className={`${styles.InputBox} FontM20`}
          id="nickname"
          type="text"
          placeholder="닉네임을 입력하세요"
          value={nickname}
          onChange={onNicknameHandler}
        />
        <button
          onClick={handleNickNameCheck}
          className={`${styles.checkBtn} ${nicknameChecked === 0 && nicknamePossible === 1 ? styles.checkBtnActive : ''} FontM20`}
        >
          중복 확인
        </button>
      </div>
      {nicknameChecked === 0 && nicknamePossible === 0 && (
        <div className={styles.BeforeContainer}>
          <div className={styles.Label}></div>
          <div className={`${styles.SignupAlertText} FontM20`}>　</div>
        </div>
      )}

      {nicknameChecked === 1 && nicknamePossible === 0 && (
        <div className={styles.Container}>
          <div className={styles.Label}></div>
          <div className={`${styles.SignupAlertText} FontM20`}>이미 존재하는 닉네임입니다.</div>
        </div>
      )}

      {nicknameChecked === 0 && nicknamePossible === 1 && (
        <div className={styles.Container}>
          <div className={styles.Label}></div>
          <div className={`${styles.SignupSuccessText} FontM20`}>중복 확인이 완료되었습니다.</div>
        </div>
      )}
    </>
  );
};

export default MainSignupFormNickname;
