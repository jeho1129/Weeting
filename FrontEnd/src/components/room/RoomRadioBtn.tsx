import styles from '@/styles/room/RoomRadio.module.css';

const RoomRadioBtn = ({ selectedMode, onChangeMode }) => {
  const roomModeList = [
    { text: '노말', value: 0 },
    { text: '랭크', value: 1 },
  ];

  // if selectedMode === 0 이면 노말모드, 그렇지 않으면 랭킹모드

  return (
    <div>
      {roomModeList.map((mode, idx) => (
        <label key={idx}>
          <input
            className={styles.RadioInput}
            type="radio"
            name="roomModeList"
            value={mode.value}
            onChange={onChangeMode}
            checked={idx === selectedMode}
          />
          <span className={`${styles.RadioMode} ${idx === selectedMode ? styles.SelectedRadioColor : styles.UnselectedRadioColor}`}>
            {mode.text}
          </span>
        </label>
      ))}
    </div>
  );
};

export default RoomRadioBtn;
