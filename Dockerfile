# 1. 빌드 스테이지
FROM node:20.12.0-alpine AS builder

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json을 복사
COPY package*.json ./

# 빌드 타임에 사용할 변수 정의 (ARG)
ARG NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY
ARG NEXT_PUBLIC_API_ORIGIN

# 환경변수 추가
ENV NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY=${NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY}
ENV NEXT_PUBLIC_API_ORIGIN=${NEXT_PUBLIC_API_ORIGIN}

# 필요한 패키지 설치
RUN npm install

# 소스 코드를 복사
COPY . .

# Next.js 앱 빌드
RUN npm run build

# 2. 실행 스테이지
FROM node:20.12.0-alpine

# 작업 디렉토리 설정
WORKDIR /app

# builder 스테이지에서 빌드된 파일들을 복사
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# 포트 설정
EXPOSE 3000

# 앱 시작
CMD ["npm", "run", "start"]
