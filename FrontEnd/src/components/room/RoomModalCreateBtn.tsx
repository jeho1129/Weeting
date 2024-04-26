import { useState } from 'react';
import Modal from 'react-modal';

const RoomModalCreateBtn = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const customStyles = {
    overlay: {
      backgroundColor: " rgba(0, 0, 0, 0.4)",
    },
    content: {
      position: 'absolute',
      width: "500px",
      height: "270px",
      top: '50%',
      left: '50%',
      transform: "translate(-50%, -50%)",
      border: '1px solid #ccc',
      boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
      background: 'white',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '10px',
      outline: 'none',
      padding: '40px 60px'
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>만들기</button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
        <div>
          <span>방 이름</span>
          <input type="text" />
        </div>
        <div>
          <span>모드</span>
          
        </div>
        <button onClick={closeModal}>닫기</button>
      </Modal>
    </div>
  );
};

export default RoomModalCreateBtn;
