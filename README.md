# 남돌 취향표 사이트

## 구조
- `index.html` : 화면
- `style.css` : 디자인
- `app.js` : 취향표 동작
- `config.js` : 관리자용 그룹/멤버/친구 이름 설정
- `assets/groups/...` : 그룹 로고와 멤버 사진

## 세팅 방법
`config.js`의 `voters`에 친구 이름을 넣고, `groups`에 그룹과 멤버를 넣습니다.

예:
```js
{
  id: "riize",
  name: "RIIZE",
  logo: "assets/groups/riize/logo.png",
  members: [
    { id: "wonbin", name: "원빈", image: "assets/groups/riize/wonbin.jpg" },
    { id: "sohee", name: "소희", image: "assets/groups/riize/sohee.jpg" }
  ]
}
```

그 다음 해당 파일을 실제 폴더에 넣으면 됩니다.

## 친구들에게 배포
이 프로젝트 전체를 GitHub Pages / Netlify / Vercel 등에 올리면 하나의 링크로 공유할 수 있습니다.
친구가 이름을 누르고 각 그룹의 멤버를 선택하면 자기 기기에서 취향표가 만들어집니다.

현재 버전은 별도 로그인/서버 없이 동작하며, 선택 내용은 각 친구의 브라우저에 저장됩니다.

## 다음 단계로 만들 수 있는 것
1. 관리자 전용 페이지에서 그룹/멤버를 직접 등록
2. 친구 이름 목록을 URL로 고정
3. 친구가 완성한 표를 서버에 저장
4. 완성 결과를 한 장의 이미지로 자동 생성
5. 관리자만 수정 가능하도록 비밀번호/로그인 추가
