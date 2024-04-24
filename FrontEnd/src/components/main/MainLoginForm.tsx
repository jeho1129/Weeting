import styles from '@/styles/main/MainLoginForm.module.css'

const MainLoginForm = () => {
  const submitHandler = (e) => {
    e.preventDefault();
    console.log('확인 버튼 클릭')
  }
  return (
    <div className={styles.Align}>
      <form onSubmit={submitHandler}>
        <div className={styles.Mgb}>
          <label className={styles.Label}>id</label>
          <input className={styles.InputBox} type="text" placeholder='아이디를 입력하세요' />
        </div>
        <div className={styles.Mgb2}>
          <label className={styles.Label2}>pw</label>
          <input className={styles.InputBox} type="text" placeholder='비밀번호를 입력하세요' />
        </div>
        <button>확인</button>
      </form>
    </div>
  )
}

export default MainLoginForm;