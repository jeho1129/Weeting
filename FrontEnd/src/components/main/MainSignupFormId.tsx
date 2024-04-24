import styles from '@/styles/main/MainLoginForm.module.css';

const MainSignupFormId = ({ id, onIdHandler }) => {
  const idCheckHandler = (e: React.FormEvent) => {
    e.preventDefault();
    // id 중복확인 api call
    console.log('hi');
  };

  return (
    <>
      <div className={styles.Mgb}>
        <label className={styles.Label} htmlFor="id">
          id
        </label>
        <input
          className={styles.InputBox}
          id="id"
          type="text"
          placeholder="아이디를 입력하세요"
          value={id}
          onChange={onIdHandler}
        />
        <button onClick={idCheckHandler}>중복 확인</button>
      </div>
      <div>이미 존재하는 아이디 입니다</div>
    </>
  );
};

export default MainSignupFormId;
