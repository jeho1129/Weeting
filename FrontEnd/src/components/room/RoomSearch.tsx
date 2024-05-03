import styles from '@/styles/room/RoomSearch.module.css';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { useState } from 'react';

const RoomSearch = () => {
  const [searchValue, setSearchValue] = useState('');

  const searchHandler = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('검색값 :', searchValue);
    RoomSearchApi();
  };

  const searchValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <form onSubmit={searchHandler}>
        <input
          type="text"
          placeholder="방 이름을 입력하세요"
          onChange={searchValueHandler}
          value={searchValue}
          className={styles.SearchInput}
        />
        <MagnifyingGlass onClick={searchHandler} className={styles.Glass} size={32} />
      </form>
    </>
  );
};

export default RoomSearch;
