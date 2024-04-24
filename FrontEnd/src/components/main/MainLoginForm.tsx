import styles from '@/styles/main/MainLoginForm.module.css'

const MainLoginForm = () => {
  return (
    <div className={styles.Align}>
      <form>
        <label className={styles.Label}>id</label>
        <input className={styles.InputBox} type="text" placeholder='아이디를 입력하세요' />
      </form>
    </div>
  )
}

export default MainLoginForm;