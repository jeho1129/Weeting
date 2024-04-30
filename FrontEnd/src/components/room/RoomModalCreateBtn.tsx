import { useState } from 'react';
import Modal from 'react-modal';
import styles from '@/styles/room/RoomModalCreateBtn.module.css'
import { XCircle } from "@phosphor-icons/react";

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
        <div className={styles.Row}>
          <span className={`${styles.RoomNameLabel} FontM20`}>&#9679; 방 이름</span>
          <input type="text" className={styles.Input} />
        </div>
        <div className={styles.Row}>
          <span className={`${styles.RoomNameLabel} FontM20`}>&#9679; 모드</span>
          <input type="text" className={styles.Input} />
        </div>
        <div className={styles.Row}>
          <span className={`${styles.RoomNameLabel} FontM20`}>&#9679; 방 인원</span>
          <input type="text" className={styles.Input} />
        </div>
        <div className={styles.Row}>
          <span className={`${styles.RoomNameLabel} FontM20`}>&#9679; 비공개방</span>
          <input type="text" className={styles.Input} />
        </div>
        <div className={styles.Row}>
          <button>확인</button>
          <button>취소</button>
        </div>
        <XCircle size={32} onClick={closeModal} />
      </Modal>
    </div>
  );
};

export default RoomModalCreateBtn;
