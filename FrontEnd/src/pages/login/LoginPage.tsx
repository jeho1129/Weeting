import logo from '@/assets/images/weeting_logo2.png';
import '../../styles/loginPage.css'
import Button from '../../components/button/MainBtn';
import '../../styles/typography.css'
import { useNavigate } from 'react-router-dom'; // useNavigate 임포트


const LoginPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    console.log('로그인');
  };

  const handleMainClick = () => {
    navigate('/main');
  };

  const handleRegisterClick = () => {
    console.log('회원가입');
  };

  return (
    <div className="loginPageContainer">
      <img src={logo} alt="logo" className="loginImage" />
      <div className='loginButtonContainer FontM'>
        <Button text="로그인" onClick={handleLoginClick} />
        <Button text="홈으로 가기" onClick={handleMainClick} />
        <Button text="회원가입" onClick={handleRegisterClick} />
      </div>
    </div>
  )
}

export default LoginPage;