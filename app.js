const express = require('express');
const JWT = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/login', async (req, res) => {
   // 사용자 정보
   const user = {
      userId: 203,
      email: "archepro84@gmail.com",
      name: "이용우",
   }

   // 사용자 정보를 JWT로 생성
   const userJWT = await JWT.sign(user, // user 변수의 데이터를 payload에 할당
      "secretOrPrivateKey", // JWT의 비밀키를 secretOrPrivateKey라는 문자열로 할당
      { expiresIn: "1h" } // JWT의 인증 만료시간을 1시간으로 설정
   );

   // userJWT 변수를 sparta 라는 이름을 가진 쿠키에 Bearer 토큰 형식으로 할당
   res.cookie('sparta', `Bearer ${userJWT}`);
   return res.status(200).end();
});

// POST /set-key 를 호출했을 때, Request로 들어온 정보를 jwt 쿠키로 만들어 할당해주세요!
app.post("/set-key", (req, res) => {
   const { key } = req.body;
   const token = JWT.sign({ key }, "sparta");
   res.cookie('token', token);
   return res.status(200).end();
});

// GET /get-key 를 호출했을 때, 등록된 jwt 쿠키를 복호화해서 반환하는 API를 만들어주세요!
app.get("/get-key", (req, res) => {
   const { token } = req.cookies;
   const { key } = JWT.decode(token);
   return res.status(200).json({ key });
});

app.listen(5002, () => {
   console.log(5002, "번호로 서버가 켜졌어요!");
});