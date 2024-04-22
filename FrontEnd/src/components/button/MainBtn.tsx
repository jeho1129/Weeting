import '../../styles/button/MainBtn.css';

interface ButtonProps {
  text: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button onClick={onClick} className="buttonStyle">
      {text}
    </button>
  );
};

export default Button;