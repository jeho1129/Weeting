import { Axios } from '@/utils/axios';
import axios from 'axios';
import { getCookie } from '@/utils/axios';

export async function gameReadyApi(roomId: string) {
  try {
    const response = await Axios.patch(`/chatroom/game/ready/${roomId}`, {
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

// export async function gameDeadApi(roomId: string) {
//   try {
//     const response = await Axios.patch(`/chatroom/game/dead/${roomId}`, {
//       headers: {
//         Authorization: `Bearer ${getCookie('accessToken')}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     return Promise.reject(error);
//   }
// }

// export async function gameAllReadyApi(roomId: string) {
//   try {
//     const response = await Axios.patch(`/chatroom/game/status/${roomId}`, {roomId});
//     return response.data;
//   } catch (error) {
//     return Promise.reject(error);
//   }
// }

export async function gameStartApi(roomId: string) {
  try {
    const response = await Axios.patch(`/chatroom/game/start/${roomId}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

// export async function chatroomHistoryApi(roomId: string) {
//   try {
//     const response = await Axios.get(`/chat/history/${roomId}`);
//     return response.data;
//   } catch (error) {
//     return Promise.reject(error);
//   }
// }

export async function gameOutApi(roomId: string) {
  try {
    const response = await Axios.patch(`/chatroom/leave/${roomId}`, {
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

// api 문제있는듯
export async function forbiddenWordSettingDataApi({
  nickname,
  forbidden_word,
}: {
  nickname: string;
  forbidden_word: string;
}) {
  try {
    const response = axios.post('https://weeting.shop/api/v1/forbidden', {
      nickname: nickname,
      forbidden_word: forbidden_word,
    });
    /////////////////////////////////////////^api주소 바꿈///////^이거 nickname으로 바꿔야함//////////////////////////
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function forbiddenWordDataApi({
  roomId,
  nickname,
  content,
}: {
  roomId: string;
  nickname: string;
  content: string;
}) {
  try {
    // await 키워드를 추가하여 응답을 기다립니다.
    const response = await axios.post('https://weeting.shop/api/v1/process_message', {
      roomId: roomId,
      nickname: nickname,
      content: content,
    });
    // response.data를 반환합니다.
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

// export async function forbiddenWordDataApi({
//   roomId,
//   nickname,
//   content,
// }: {
//   roomId: string;
//   nickname: string;
//   content: string;
// })   try {
//   const response = axios.post('https://weeting.shop/api/v1/process_message', {
//           roomId: roomId,
//           nickname: nickname,
//           content: content,
//         });
//     return response.data;
//   } catch (error) {
//     return Promise.reject(error);
//   }
// }

export async function forbiddenWordSettingApi({ roomId, forbiddenWord }: { roomId: string; forbiddenWord: string }) {
  try {
    const response = await Axios.patch(
      `/chatroom/game/wordsetting/${roomId}`,
      { word: forbiddenWord },
      {
        headers: {
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
      },
    );
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function gameOverApi(roomId: string) {
  try {
    const response = await Axios.patch(`/chatroom/game/dead/${roomId}`, {
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    });
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function gameFinishApi(roomId: string) {
  try {
    const response = await Axios.patch(`/chatroom/game/startToEnd/${roomId}`, {
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    });
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function gameFinalRankApi(roomId: string) {
  try {
    const response = await Axios.get(`/chatroom/game/result/${roomId}`);
    // console.log(response);
    // console.log('dddddddddddddddddddddddddddddddddddddddd');

    // console.log(response.data);
    // console.log('gggggggggggggggggggggggggggggggggggggggg');

    // console.log(response.data.dataBody);

    return response.data.dataBody;
  } catch (error) {
    return Promise.reject(error);
  }
}
