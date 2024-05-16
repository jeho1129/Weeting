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

## ✨ 서비스 화면

### 메인화면

### 회원가입 및 로그인

<div width="100%">
<img src="https://github.com/gisun55555/reactshop2/assets/139519062/7323e8a9-0483-41ae-a3ba-19180d8b235a" width="100%">
</div>

## 🚀 기술 스택

### Front-End

- React `18.3.1`
- Typescript `5.2.2`
- axios
- Recoil
- CSS.module
- React-router-dom `6.22.3`
- STOMP
- WebSocket
- Vite
- ESLint
- Prettier

### Back-End

- Java `17.0.9`
- Spring Boot `3.2.3`
- Lombok
- openAPI `(Swagger 3.0)`
- Gradle `8.5`
- Spring Security
- JWT
- Spring Data JPA
- QueryDSL
- WebSocket
- STOMP
- RabbitMQ
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
- Jenkins `2.455`

### Data

- aioredis `2.0.1`
- konlpy `0.6.0`
- pydantic `2.7.1`
- requests `2.31.0`
- uvicorn `0.28.0`
- webdriver-manager `4.0.1`
- websockets `12.0`
- fasttext

## 프로젝트 노션 페이지

[프로젝트 노션 페이지](https://www.notion.so/057f88f084904ae388523c15be87b932)

## 기능 명세

[기능 명세](https://www.notion.so/b03883ab38254e569dfd168ace1088e1?v=3633cb1eb3ad453f91e5201c1d1917ed&pvs=4)

## API 명세

[API 명세](https://www.notion.so/08a6e768b6274301a5ceab008c3876ff?v=59b9040edc72426495b5ea1af06f6ae8&pvs=4)

## ERD

![ERD](./exec/C103_ERD.png)

## System Architecture

![System Architecture](./exec/C103_System_Architecture.png)

## 역할 분담

| 이름   | 역할               | 업무                                                                       |
| ------ | ------------------ | -------------------------------------------------------------------------- |
| 전승혜 | 팀장, FE            |  |
| 강지수 | FE 리더             |  |
| 김재훈 | BE, INFRA          |  |
| 안준선 | FE                 |  |
| 이지호 | BE 리더, Data       | CI/CD(Data Server), 채팅 데이터 전처리, 한국어 형태소 분석, 단어 의미 유사도 계산 |
| 황인범 | BE                 |  |