from fastapi import HTTPException, APIRouter
from pydantic import BaseModel, Field
from typing import List, Optional
import aioredis, uuid

router = APIRouter()

redis = aioredis.from_url("redis://54.180.158.223:6379", password="c103103", encoding="utf8", decode_responses=True)

class UserInfo(BaseModel):
    id: int
    nickname: str
    ready: bool = False
    word: str = ""
    score: float = 0.0
    is_alive: str = ""

class ChatRoomCreateRequestDto(BaseModel):
    room_name: str
    room_password: Optional[str] = None
    room_max_cnt: int
    room_mode: str

class ChatRoomDto(BaseModel):
    room_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    room_name: str
    room_password: Optional[str]
    room_max_cnt: int
    room_users: List[UserInfo]
    room_theme: Optional[str]
    room_status: str = "waiting"
    room_mode: str
    room_forbidden_time: Optional[str]
    room_end_time: Optional[str]
    room_status_flag: bool = False

@router.post("/chatrooms/", response_model=ChatRoomDto)
async def create_room(request: ChatRoomCreateRequestDto, user_info: UserInfo):
    if not request.room_name:
        raise HTTPException(status_code=400, detail="방 제목을 입력하세요.")
    if not request.room_mode:
        raise HTTPException(status_code=400, detail="방 모드를 선택하세요.")

    chat_room = ChatRoomDto(
        room_name=request.room_name,
        room_password=request.room_password,
        room_max_cnt=request.room_max_cnt,
        room_users=[user_info],
        room_mode=request.room_mode
    )

    key = f"chatRoom:{chat_room.room_id}"
    await redis.set(key, chat_room.json())
    return chat_room