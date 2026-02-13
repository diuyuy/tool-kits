# tool-kit

웹 스크래핑, 리서치 및 학술 논문 검색을 위한 CLI 도구 모음입니다.

## 주요 기능

### 1. Web Scrapper

Tavily API를 활용하여 웹 페이지의 콘텐츠를 마크다운 형식으로 추출하고 클립보드에 자동으로 복사합니다.

- URL 입력 시 자동 검증
- 마크다운 형식으로 변환
- 클립보드 자동 복사

### 2. Web Researcher

Brave Search API로 쿼리를 검색하고, 검색 결과의 모든 페이지를 스크래핑하여 마크다운 파일로 저장합니다.

- Brave Search로 최대 20개 결과 검색
- 각 검색 결과를 마크다운으로 변환하여 저장
- 검색 결과 JSON 파일 자동 저장
- `resources/<쿼리명>/` 디렉토리에 결과 저장

### 3. ArXiv API

ArXiv에서 학술 논문을 검색하고 메타데이터를 JSON 형식으로 저장합니다.

- 논문 제목, 저자, PDF 링크, 출판일, 카테고리 추출
- `resources/<쿼리명>/result.json`에 저장
- 최대 10개 결과 반환

## 설치

```bash
bun install
```

## 환경 설정

`.env` 파일을 프로젝트 루트에 생성하고 다음 API 키를 설정해주세요:

```env
BRAVE_SEARCH_API_KEY=your_brave_search_api_key
TAVILY_SEARCH_API_KEY=your_tavily_api_key
```

### API 키 발급

- **Brave Search API**: [https://brave.com/search/api/](https://brave.com/search/api/)
- **Tavily API**: [https://tavily.com/](https://tavily.com/)

## 사용 방법

### 개발 모드로 실행

```bash
bun run dev
```

### 빌드

```bash
bun run build
```

### 프로덕션 실행

```bash
bun run start
```

## 프로젝트 구조

```
took-kit/
├── src/
│   ├── tools/
│   │   ├── web-scrapper/      # 웹 스크래핑 도구
│   │   ├── web-researcher/    # 웹 리서치 도구
│   │   └── arxiv-api/         # ArXiv 검색 도구
│   ├── utils/                 # 유틸리티 함수
│   ├── constants.ts           # 상수 정의
│   ├── index.ts              # 메인 엔트리 포인트
│   └── tool-executor.ts      # 도구 실행기
└── resources/                # 검색/스크래핑 결과 저장 디렉토리
```

## 기술 스택

- **런타임**: [Bun](https://bun.com)
- **언어**: TypeScript
- **주요 라이브러리**:
  - `playwright` - 웹 브라우저 자동화
  - `@inquirer/prompts` - 대화형 CLI 인터페이스
  - `chalk` - 터미널 색상 출력
  - `ora` - 로딩 스피너
  - `turndown` - HTML to Markdown 변환
  - `xml2js` - XML 파싱
  - `clipboardy` - 클립보드 관리
  - `zod` - 스키마 검증
