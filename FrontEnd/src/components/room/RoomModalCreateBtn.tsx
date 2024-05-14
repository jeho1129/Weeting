import { roomCreateApi } from '@/services/roomApi';
import styles from '@/styles/room/RoomModalCreateBtn.module.css';
import { XCircle } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import RoomCount from './RoomCount';
import RoomRadioBtn from './RoomRadioBtn';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import ReactModal from 'react-modal';
import { buttonError } from '@/utils/buttonClick';

const RoomModalCreateBtn = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [roomName, setRoomName] = useState<string>('');
  const [selectedMode, setSelectedMode] = useState<number>(-2);
  // const [roomMode, setRoomMode] = useState<'rank' | 'normal' | null>(null);
  const [selectedMaxCount, setSelectedMaxCount] = useState<number>(4);
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const customStyles: ReactModal.Styles = {
    overlay: {
      zIndex: '999',
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

  //만약 비공개방 체크가 되어있고, 비밀번호가 숫자 4자리가 아니면 만들기 요청시 실패처리
  // 모드 선택을 안했으면(selectedMode === -2이면) 실패처리
  // 모드0 = 노말   모드1 = 랭크  모드null = 선택안함
  const createtHandler = () => {
    // console.log('hi');
    // if (selectedMode === 0) {
    //   setRoomMode('normal');
    // } else if (selectedMode === 1) {
    //   setRoomMode('rank');
    // }

    // if (password === '') {
    //   setPassword(null);
    // }
    // console.log({
    //   roomName: roomName,
    //   roomMode: selectedMode === 0 ? 'normal' : 'rank',
    //   roomPassword: password,
    //   roomMaxCnt: selectedMaxCount,
    // });

    roomCreateApi({
      roomName: roomName,
      roomMode: selectedMode === 0 ? 'normal' : 'rank',
      roomPassword: password === '' ? null : password,
      roomMaxCnt: selectedMaxCount,
    })
      .then((res) => {
        // console.log('res :', res.dataBody.roomId);
        navigate(`/room/${res.dataBody.roomId}`);
        setModalIsOpen(false);
      })
      .catch((err) => {
        buttonError();
        Swal.fire({
          title: '방 이름 또는 방 비밀번호를 다시 확인해주세요',
          icon: 'error',
        });
        // console.log(err);
      });
  };

  const handleRoomNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 방 이름 변경 핸들러
    setRoomName(e.target.value);
  };

  const onChangeMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMode(Number(e.target.value));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    // console.log(isNaN(Number(input)));

    if (input === '' || (!isNaN(Number(input)) && input.length <= 4)) {
      setPassword(input);
      // console.log('input :', input);
    }
  };

  const modeAlertHandler = () => {
    buttonError();
    Swal.fire({
      title: '모드를 선택해주세요',
      icon: 'error',
    });
  };

  // // 디버깅코드
  // useEffect(() => {
  //   console.log('selectedMode :', selectedMode);
  // }, [selectedMode]);

  // useEffect(() => {
  //   console.log('selectedMaxCount :', selectedMaxCount);
  // }, [selectedMaxCount]);

  // useEffect(() => {
  //   console.log('password :', password);
  // }, [password]);

  return (
    <div>
      <button onClick={openModal} className={`${styles.MakeBtn} FontM32`}>
        만들기
      </button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
        <XCircle className={styles.XCircle} size={32} onClick={closeModal} />
        <div className={styles.Container}>
          <div className={styles.Row}>
            <span className={`${styles.RoomNameLabel} FontM20`}>&#9679; 방 이름</span>
            <input
              type="text"
              maxLength={10}
              className={styles.Input}
              value={roomName}
              onChange={handleRoomNameChange}
            />
          </div>
          <div className={styles.RoomMode}>
            <span className={`${styles.RoomNameLabel} FontM20`}>&#9679; 모드</span>
            <RoomRadioBtn selectedMode={selectedMode} onChangeMode={onChangeMode} />
          </div>
          <div className={styles.Row}>
            {/* <span className={`${styles.RoomNameLabel} FontM20`}>&#9679; 방 인원</span> */}
            <RoomCount selectedMaxCount={selectedMaxCount} setSelectedMaxCount={setSelectedMaxCount} />
          </div>
          <div className={styles.Row}>
            <span className={`${styles.RoomNameLabel} FontM20`}>
              <div className={styles.RoomPrivate}>
                &#9679; 비공개방
                <input className={styles.CheckBox} type="checkbox" onChange={(e) => setIsPrivate(e.target.checked)} />
              </div>
            </span>
            {isPrivate && (
              <input
                type="text"
                placeholder="숫자 4자리"
                className={styles.Input}
                value={password}
                onChange={handlePasswordChange}
              />
            )}
            {isPrivate === false && <input type="text" className={styles.Input} disabled />}
          </div>
        </div>
        <div className={styles.BtnContainer}>
          {selectedMode === -2 ? (
            <button onClick={modeAlertHandler} className={`${styles.Btn} FontM20`}>
              만들기
            </button>
          ) : (
            <button onClick={createtHandler} className={`${styles.Btn} FontM20`}>
              만들기
            </button>
          )}
          <button className={`${styles.Btn} FontM20`} onClick={closeModal}>
            취소하기
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default RoomModalCreateBtn;
