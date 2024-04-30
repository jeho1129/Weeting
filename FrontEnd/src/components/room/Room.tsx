import RoomModalCreateBtn from "./RoomModalCreateBtn";
import RoomEnterBtn from "./RoomEnterBtn";
import ChatRoomPage from "./RoomList";

const Room = () => {
  return (
    <>
      <RoomModalCreateBtn />
      <RoomEnterBtn />
      <div>
      <ChatRoomPage />

      </div>
    </>
  )
}

export default Room;