import styles from '@/styles/room/RoomSearch.module.css';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { useState } from 'react';

const RoomSearch = ({ searchValue, onSearchChange }) => {
  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="방 이름을 입력하세요"
          onChange={onSearchChange}
          value={searchValue}
          className={`${styles.SearchInput} FontM20`}
        />
        <MagnifyingGlass onClick={(e) => e.preventDefault()} className={styles.Glass} size={26} />
      </form>
    </>
  );
};

export default RoomSearch;
