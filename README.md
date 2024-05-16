# Weeting (위험한 채팅)

## ✨ 프로젝트 개요

### 1. 프로젝트명

위팅(Weeting)

### 2. 프로젝트 기간

2024.04.08 ~ 2024.05.20(6주)

### 3. 프로젝트 주제

친목 도모용 채팅 게임 서비스

### 4. 프로젝트 주요 기능

#### 👦 회원

- 로그인 / 로그아웃
  - Spring Security + JWT를 통한 토큰을 통한 세션 관리 기능
  - 액세스 토큰 만료시 리프레쉬 토큰을 이용한 토큰 재발급 기능
- 회원 탈퇴
  - 일반 회원가입 한 유저, 소셜 로그인을 통한 유저 회원 탈퇴 기능 제공

#### 📰 뉴스

#### 💬 AI 회화 연습

#### 📝 사용자 분석

#### ✔️ 출석 체크

## ✏️ 기술 특이점

### 자연어 처리(NLP)

- 자연어 처리 기술을 활용하여 문장 내 단어 형태소 분석 및 처리
- kospacing을 활용하여 문장 내 띄어쓰기가 안 된 단어에 대해 띄어쓰기 처리

### 단어 간 의미 유사도 계산

- Fasttext Model을 활용하여 두 단어 간 의미적인 유사도를 계산
  - 해당 단어와 유사도 값이 높은 상위 4000개의 단어 추출
  - 해당 단어가 포함된 유사 단어, 한국어가 아닌 유사 단어 제거 등 별도의 예외 처리를 통한 정제 과정 포함

### Spirng security + JWT 기술
- Spring security + JWT을 활용하여 로그인한 사용자의 인증 및 사용자의 요청이 서버에 도달할 때마다 검증되어 해당 요청이 유효한 사용자로부터 온 것임을 보증 
- 모든 인바운드 요청에 대해 Security JwtAuthenticationFilter를 통해 JWT가 유효한지 검사, 유효한 경우 사용자의 인증 정보를 SecurityContext에 저장

### WebSocket with STOMP & RabbitMQ

- WebSocket 연결을 통해 서버와 클라이언트 간의 지속적이고 실시간의 양방향 통신 채널을 구축하였으며, STOMP 프로토콜을 사용하여 이러한 통신을 구조화하고 메시지 교환을 명확하게 관리
- RabbitMQ 메시지 브로커를 도입하여 메시지를 효율적으로 라우팅하고 분산 처리함으로써, 시스템 전반의 메시지 전달 유연성과 확장성을 향상

### Spring WebFlux

- Spring WebFlux 라이브러리의 WebClient, Mono, Flux 를 사용하여 반응형으로 프로그래밍
- 비동기적이고 비차단적(non-blocking) I/O를 사용하여 스레드 차단을 방지하고 높은 동시성을 지원
- 비차단 I/O로 인해 더 적은 리소스를 사용하여 더 많은 요청을 동시에 처리
- 요청이 I/O를 기다리면서 차단되지 않으므로 로드가 심한 경우에도 애플리케이션의 응답성을 높임

## ✨ 서비스 화면

### 메인화면

- 오늘의 뉴스

  - 사용자 활동 데이터를 기반으로 사용자의 취향에 맞는 뉴스 3개 추천
  - 신규 가입 등으로 사용자 활동 데이터가 없을 시 다른 사용자들에게 가장 많이 추천된 상위 뉴스 3개 추천
  - 10초에 한 번씩 carousel 다음 페이지로 이동

- 오늘의 회화

  - 9개의 회화 카테고리중 랜덤한 3가지 카테고리 출력

- 사용자 키워드

  - 사용자 활동 데이터를 기반으로 사용자가 자주 조회한 카테고리 상위 10개 출력

- 오늘의 단어
  - DB에 있는 단어중 1가지 랜덤하게 출력
  - 나만의 단어장에 추가/제거 기능 지원

<div width="100%">
<img src="https://github.com/gisun55555/reactshop2/assets/139519062/0655af22-7f2d-4d88-a8c4-9b0553f7b23d" width="75%">
<img src="https://github.com/gisun55555/reactshop2/assets/139519062/d3be5517-91b5-437c-9808-e31dad122c9b" width="20%">
</div>

### 뉴스 리스트

- Infinite Scroll을 활용한 전체/카테고리별 뉴스 조회
- 한글 번역 On/Off 기능 제공
- 썸네일 위에서 마우스를 좌우로 이동하여 뉴스 이미지 미리보기 가능

<div width="100%">
<img src="https://github.com/gisun55555/reactshop2/assets/139519062/6b546cbc-48ad-49e4-b41c-d754cfaeb580" width="75%">
<img src="https://github.com/gisun55555/reactshop2/assets/139519062/88ddea47-b9af-444a-a1a5-168848db9fd2" width="20%">
</div>

### 뉴스 디테일: 읽기모드

- 뉴스 기사 상세 내용 조회

- 우측 Side Bar

  - 해당 뉴스의 빈출 단어 5개와 해당 단어가 사용된 반도를 중요도 순으로 제공
  - TTS기능의 재생 속도 조절 기능 제공 (0.5배속, 0.7배속, 1배속, 1.5배속)
  - 학습 모드로 전환 가능

- 뉴스 본문
  - 번역, 일->일 발음 및 일->한 발음 On/Off 기능
  - 전체 뉴스 TTS 재생 기능 제공
  - 뉴스 본문에서 사용된 단어 클릭 시 해당 단어를 단어장에서 검색하여 데이터가 있을 경우 읽는 방법, 뜻과 함께 나의 단어장에 추가하는 기능 제공
  - 데이터가 없을 경우 원본 단어와 읽는 방법(일어) 제공

<div width="100%">
<img src="./exec/C107_myWord.png" width="50%" />
<img src="https://github.com/gisun55555/reactshop2/assets/139519062/5794b60c-69ac-4100-94cf-08145dc79f45" width="75%">
<img src="https://github.com/gisun55555/reactshop2/assets/139519062/857ed6db-61b9-49b1-8f67-81713ea0c2ef" width="20%">
</div>

### 뉴스 디테일: 학습 모드

- 뉴스를 문장 단위로 학습 할 수 있으며, 문장 단위의 TTS를 제공
- 문장에 마우스를 hover (모바일은 클릭)하여 각 단어의 발음 확인 가능
- STT 기능을 통하여 사용자가 해당 문장을 읽으면 원본 문장과의 유사도를 측정
- 사용자가 읽은 문장을 녹음하여 다시 듣기 기능 제공

<div width="100%">
<img src="https://github.com/gisun55555/reactshop2/assets/139519062/7e525e3c-b247-473a-8561-b8903ae32fe6" width="75%">
<img src="https://github.com/gisun55555/reactshop2/assets/139519062/4a43ceb2-7409-4fb3-ada4-0f8242d24956" width="20%">
</div>

### AI 채팅: 카테고리 리스트

- 나의 회화 통계

  - 여태까지 진행한 회화의 평균 점수 제공
  - 최근 진행한 회화 5개 바로가기 제공
  - 더보기 버튼을 눌러 회화 라포트 조회 페이지로 이동 가능

- 일본어 AI 채팅 리스트
  - 대화 주제의 난이도에 따라 총 9개의 카테고리 (호텔 체크인, 스포츠, 햄버거 주문, 미용실, 병원, 경찰서, 사회적 토론, 동료와 잡담, 식사 예약) 제공

<div width="100%">
<img src="./exec/C107_chatList.png" width="75%">
</div>

### AI 채팅: 채팅

- 유저가 선택한 카테고리로 AI 챗봇과 대화하는 기능 제공
- 카테고리에 따른 대화이나 디테일은 매 대화마다 다르게 제공됨
- 챗봇 번역과 유저 Tip을 제공하며, 해당 기능을 On/Off 가능
- 챗봇 대사 및 유저 Tip TTS 기능 제공
- STT 기능을 통하여 유저의 대답을 채팅방에 입력 후 전송
- 대화 내용을 바탕으로 대화 분석 및 리포트 작성 기능 제공

<div width="100%">
<img src="https://github.com/gisun55555/reactshop2/assets/139519062/611b1b63-524c-470b-86ae-13026a324771" width="75%">
<img src="https://github.com/gisun55555/reactshop2/assets/139519062/870e5f46-373e-4e26-bd0d-22d9f06c2308" width="20%">
</div>

### AI 채팅: 채팅 리포트

- AI와 대화한 내역을 어휘력, 문법, 단어, 문맥 이해도, 유창성의 5가지 평가 항목으로 나누어 채점
- 대화 내용 요약본 제공
- 채팅 내용을 되돌아보며 각 발언에 대한 Feedback을 받을 수 있으며, 해당 기능 On/Off 가능
- 작성된 리포트를 저장하여 다시보기 기능 제공

<div width="100%">
<img src="https://github.com/gisun55555/reactshop2/assets/139519062/09745b25-2bc4-40a2-9531-a3d688908de9" width="75%">
<img src="https://github.com/gisun55555/reactshop2/assets/139519062/4ece02c6-3c9b-48e7-8c96-7649b9b27a19" width="20%">
</div>

### 마이데이터

- 유저 활동 기록

  - 여태까지 진행한 쉐도잉과 AI 채팅 (리포트 작성) 횟수 통계를 조회할 수 있으며, 횟수가 오를 수록 유저 티어 상승
  - heatmap 형식의 달력을 이용하여 특정일 몇 번의 학습을 진행하였는지 조회 가능
  - 사용자의 뉴스 쉐도잉 평균 점수와 전체 유저의 쉐도잉 평균 점수를 그래프 형식으로 제공하여, 현재 사용자의 위치를 파악할 수 있음
  - 나의 단어장 미리보기 기능을 제공하여 단어장에 추가된 5개의 단어 미리보기 가능

- 나의 단어장

  - 유저가 단어장에 추가한 단어 모아보기 및 삭제 기능 제공
  - 단어 뜻/발음 On/Off 기능 제공

- 나의 리포트
  - 여태까지 유저가 진행한 AI 채팅 목록 표시

<div width="100%">
<img src="https://github.com/gisun55555/reactshop2/assets/139519062/13816b75-f0cd-4d1a-85c3-eec1f0fe9359" width="75%">
<img src="https://github.com/gisun55555/reactshop2/assets/139519062/0974c960-50fd-42fa-8937-dbeab52557ac" width="20%">
</div>

### 소셜로그인

- 네이버, 카카오, 구글 아이디로 소셜 로그인 기능 제공


<div style="display: flex; justify-content: space-between;">
    <img src="https://github.com/gisun55555/reactshop2/assets/139519062/4c640fc5-764d-4702-981c-e762c89a39f0" width="31%">
    <img src="https://github.com/gisun55555/reactshop2/assets/139519062/f40c1372-e892-45f7-89f6-4477e49d45f0" width="31%">
    <img src="https://github.com/gisun55555/reactshop2/assets/139519062/f46100bb-8c09-4870-9bb9-c830b8cead58" width="31%">
</div>

### 회원가입 및 로그인

<div width="100%">
<img src="https://github.com/gisun55555/reactshop2/assets/139519062/7323e8a9-0483-41ae-a3ba-19180d8b235a" width="100%">
</div>


### 프로필수정

<div width="100%">
<img src="https://github.com/gisun55555/reactshop2/assets/139519062/7c7e05a3-b473-4309-bc09-f123f311edf8" width="100%">
</div>

### 회원탈퇴

<div width="100%">
<img src="https://github.com/gisun55555/reactshop2/assets/139519062/17f1699f-fca2-4e83-8d6d-0c1420227987" width="100%">
</div>

## 🚀 기술 스택

### Front-End

- React
- Typescript
- axios
- zustand
- React Query
- MUI
- Styled Components
- React-router-dom
- AWS Polly
- React-speech-recognition
- webStomp-client
- ApexCharts

### Back-End

- Java `17.0.10`
- Spring Boot `3.2.3`
- Lombok
- openAPI `(Swagger 3.0)`
- OAUTH `2.0`
- Gradle `8.5`
- Spring Security
- JWT
- Spring Data JPA
- QueryDSL
- WebFlux
- WebSocket
- STOMP
- RabbitMQ
- Firebase Storage
- Jasypt
- Java Mail Sender
- Flyway
- OpenAI API `(GPT)`
- Python `3.8.10`
- FastAPI `0.110.0`

### DB

- MySQL `8.0.36`
- Redis

### Infra

- AWS EC2
- Ubuntu `20.04.6 LTS`
- Nginx
- Docker `25.0.4`
- Docker Compose
- Jenkins `2.448`

### Data

- selenium `4.19.0`
- Hadoop `3.3.6`
- Crontab
- Mecab
- scikit-learn `1.4.1`
- webdriver-manager `4.0.1`
- googletrans `4.0.0rc1`
- requests `2.31.0`
- paramiko `3.4.0`
- pytz `2024.1`
- unidic-lite
- SQLAlchemy `2.0.28`

## 프로젝트 노션 페이지

[프로젝트 노션 페이지](https://translucent-polish-c76.notion.site/Talkydoki-07e378a00ab54e089874ca28178d3f8d?pvs=4)

## 기능 명세

[기능 명세](https://translucent-polish-c76.notion.site/3754b9a4e4bf49519f1c5eab99fe4415)

## API 명세

[API 명세](https://translucent-polish-c76.notion.site/API-9e9953ecc90f492f9efed251e04c6f49?pvs=4)

## 프로젝트 관련 기술 정리

[프로젝트 관련 기술 정리](https://translucent-polish-c76.notion.site/ee081d7536ee4e91913f2dcd69263a42?v=0096ec74109c4ffda8deb13394ff4e08&pvs=4)

## ERD

![ERD]()

## System Architecture

![System Architecture]()

## 역할 분담

| 이름   | 역할               | 업무                                                                       |
| ------ | ------------------ | -------------------------------------------------------------------------- |
| 전승혜 | 팀장, BE, FE, Data | CI/CD(젠킨스, 도커), 뉴스 데이터 크롤링 및 형태소 분석, 일본어 문장 번역 등 데이터 전처리 작업, 뉴스 목록 조회, 뉴스 단일 조회, AI 회화 채팅 레포트 분석페이지 제작 |
| 강지수 | FE 리더             | UI/UX 및 기본 컴포넌트 설계, 일본어 관련 처리(일->일, 일->한 발음 및 단어 검색 / 단어장), 메인 페이지, 마이 데이터 페이지, 뉴스(리스트, 읽기 모드, 학습 모드, 쉐도잉), 로그인 / 가입 유효성 관련 처리 |
| 김재훈 | BE 리더             | FE, BE 스켈레톤 구조 설계, 단어장 데이터 크롤링, Spring Security + JWT 설정, 회원 도메인, 단어장 도메인, AI 회화 채팅 도메인, 프로퍼티 암호화 설정, DB 마이그레이션 |
| 안준선 | FE                 | AI 회화 채팅 카테고리 작성, AI 회화 채팅 페이지 TTS(AWS Polly) / STT(React Speech API) 구현, 채팅 리스트 작성, STOMP WebSocket 연결, 로그인 / 회원 가입, 소셜 로그인, 로고 디자인, 마이 페이지 |
| 이지호 | BE, Data           | CI/CD(Hadoop Server), 뉴스 데이터 분산 처리, Content-Based Algorithm 기반 뉴스 추천, 일본어 키워드 저장, 사용자 관심 키워드 조회, 뉴스 쉐도잉, 마이 페이지(쉐도잉 현황) 구현 |
| 황인범 | BE                 | AI 회화 채팅 도메인, OpenAI API 설정, AI 회화 채팅 레포트 분석, AI 회화 채팅 피드백, 프롬프트 설정 |
