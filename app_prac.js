const jwt = require('jsonwebtoken');

// playloadData 변수에 값이 있는 객체 하나 할당
const payloadData = {
  myPayloadData: 1234
};

// payloadData변수 안에 있는 데이터로 JWT 토큰 생성
// jwt 라이브러리를 통해 만들건데
// 첫번째로 어떤 데이터로 만들거니? payloadData
// 두번째로 어떤 비밀키로 만들거니? "mysecretKey"
const token = jwt.sign(payloadData, "mysecretKey");

// 생성된 JWT 토큰을 출력해보면
console.log(token);
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJteVBheWxvYWREYXRhIjoxMjM0LCJpYXQiOjE2ODIxNDU5OTN9.gglhkmMv43ov3Gu-9B5HgX_GRfoJG5nc4BDobYkFR8o
// 이러한 값이 나오는데 -> jwt.io 라는 사이트에서 안에 내용을 확인해볼 수 있음



// 생성한 JWT를 바탕으로 정상적으로 데이터가 존재하는지 확인하기
// 위에서 jwt.io 사이트에서 JWT에 어떤 데이터가 있는지 눈으로 확인했다라면
// 지금은 실재로 JWT 안에 payloadData가 존재하는지 확인해보자

// JWT의 payload 데이터를 복호화
const decodedValue = jwt.decode(token);
console.log("복호화한 token 입니다. ", decodedValue);
// 복호화한 token을 출력해보면


// JWT를 생성했을 때, 사용한 비밀 키가 일치하는 지 검증하기
const devodedValueVerify = jwt.verify(token, "mysecretKey");
console.log("devodedValueVerify: ", devodedValueVerify);
// .verify() : 처음에 JWT 값을 입력 받고, 비밀키를 입력을 해서 정상적으로 값이 맞는지 검증을 하는 메서드.


// JWT를 생성했을 때, 사용한 비밀 키가 일치하는 지 검증하기 (에러 발생 버전)
const devodedValueVerifyToError = jwt.verify(token, "틀린 비밀 키 입력해봄");
console.log("devodedValueVerifyToError: ", devodedValueVerifyToError);
// .verify() : 처음에 JWT 값을 입력 받고, 비밀키를 입력을 해서 정상적으로 값이 맞는지 검증을 하는 메서드.