import logo from '@/assets/images/weeting_logo2.png';
import '../../styles/loginPage.css'
import Button from '../../components/button/MainBtn';


const LoginPage = () => {

  const handleLoginClick = () => {
    console.log('로그인');
  };

  const handleRegisterClick = () => {
    console.log('회원가입');
  };

  return (
    <div className="loginPageContainer">
      <img src={logo} alt="logo" className="loginImage" />
      <div className='loginButtonContainer'>
        <Button text="로그인" onClick={handleLoginClick} />
        <Button text="회원가입" onClick={handleRegisterClick} />
      </div>
    </div>
  )
}

export default LoginPage;