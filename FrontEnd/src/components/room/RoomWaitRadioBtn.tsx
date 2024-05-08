import styles from '@/styles/room/RoomWaitRadioBtn.module.css';

const RoomWaitRadioBtn = ({ roomSelectedMode, onChangeRoomMode }) => {
  const roomModeList = [
    { text: '전체', value: 0 },
    { text: '노말', value: 1 },
    { text: '랭크', value: 2 },
  ];

  // if roomSelectedMode === 0 이면 노말모드, 그렇지 않으면 랭킹모드

  return (
    <div>
      {roomModeList.map((mode, idx) => (
        <label key={idx}>
          <input
            className={styles.RadioInput}
            type="radio"
            name="roomModeList"
            value={mode.value}
            onChange={onChangeRoomMode}
            checked={idx === roomSelectedMode}
          />
          <span className={`${styles.RadioMode} ${idx === roomSelectedMode ? styles.SelectedRadioColor : styles.UnselectedRadioColor} FontM20`}>
            {mode.text}
          </span>
        </label>
      ))}
    </div>
  );
};

export default RoomWaitRadioBtn;
