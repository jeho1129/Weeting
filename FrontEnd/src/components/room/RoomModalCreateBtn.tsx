import { roomCreateApi } from '@/services/roomApi';
import styles from '@/styles/room/RoomModalCreateBtn.module.css';
import { XCircle } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import RoomRadioBtn from './RoomRadioBtn';
import RoomCount from './RoomCount';

const RoomModalCreateBtn = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedMode, setSelectedMode] = useState<number>(0);

  const customStyles = {
    overlay: {
      backgroundColor: ' rgba(0, 0, 0, 0.4)',
    },
    content: {
      position: 'absolute',
      width: '450px',
      height: '290px',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      border: '1px solid #ccc',
      boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
      background: 'white',
      overflow: 'hidden',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '10px',
      outline: 'none',
      padding: '40px 60px',
    },
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const createtHandler = () => {
    console.log('hi');
    roomCreateApi();
  };

  const onChangeMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMode(Number(e.target.value));
  };

  useEffect(() => {
    console.log('selectedMode :', selectedMode);
  }, [selectedMode]);

  return (
    <div>
      <button onClick={openModal}>만들기</button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
        <XCircle className={styles.XCircle} size={32} onClick={closeModal} />
        <div className={styles.Container}>
          <div className={styles.Row}>
            <span className={`${styles.RoomNameLabel} FontM20`}>&#9679; 방 이름</span>
            <input type="text" className={styles.Input} />
          </div>
          <div className={styles.RoomMode}>
            <span className={`${styles.RoomNameLabel} FontM20`}>&#9679; 모드</span>
            <RoomRadioBtn selectedMode={selectedMode} onChangeMode={onChangeMode} />
          </div>
          <div className={styles.Row}>
            <span className={`${styles.RoomNameLabel} FontM20`}>&#9679; 방 인원</span>
            <RoomCount />
          </div>
          <div className={styles.Row}>
            <span className={`${styles.RoomNameLabel} FontM20`}>&#9679; 비공개방</span>
            <input type="text" className={styles.Input} />
          </div>
        </div>
        <div className={styles.BtnContainer}>
          <button onClick={createtHandler} className={`${styles.Btn} FontM20`}>
            만들기
          </button>
          <button className={`${styles.Btn} FontM20`}>취소하기</button>
        </div>
      </Modal>
    </div>
  );
};

export default RoomModalCreateBtn;
