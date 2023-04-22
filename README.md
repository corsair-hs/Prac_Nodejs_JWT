# 실습 내용
1. JS에서 JWT 생성
  - 라이브러리: jsonwebtoken
2. JWT에 있는 데이터를 복호화해서 데이터 확인
3. 우리가 발급한 JWT가 맞는지 비밀 키를 이용해서 변조 유무 확인

# JWT란?
- JSON 형태의 데이터를 안전하게 교환하여 사용할 수 있게 해주는 것
- 인터넷 표준으로서 자리잡은 규격
- 여러가지 암호화 알고리즘을 사용할 수 있음
- header.payload.signature 의 형식으로 3가지의 데이터를 포함 (개머처럼 머리, 가슴 , 배)
  - 그렇기 때문에 JWT 형식으로 변환 된 데이터는 항상 2개의 . 이 포함된 데이터여야 함

# 설명
- HEADER(머리): signature(배)에게 어떤 암호화를 사용하여 생성된 데이터인지 표현
- PAYLOAD(가슴): 개발자가 원하는 데이터를 저장하는 부분
- VERIFY SIGNATURE(배): 이 토큰이 변조되지 않은 정상적인 토큰인지 확인할 수 있게 도와줌

# 특성
- JWT는 비밀 키를 모르더라도 복호화(Decode)가 가능
  변조마 불가능할 뿐, 누구나 복호화하여 보는 것은 가능함
- 민감한 정보(개인정보, 비밀번호 등)는 담지 않도록 해야 함

# 쿠키, 세션과 차이점
데이터를 교환하고 관리하는 방식인 쿠키/세션과 달리, JWT는 단순히 데이터를 표현하는 형식
- JWT로 만든 데이터를 브라우저로 보내도 쿠키처럼 자동으로 저장되지는 않지만, 변조가 거의 불가능하고 서버에 데이터를 저장하지 않기 때문에 서버를 Stateless(무상태)로 관리할 수 있기 때문에 최근 많이 쓰이는 기술 중 하나
- Stateless(무상태)와 Stateful(상태 보존)의 차이
  * Node.js 서버가 언제든 죽었다 살아나도 똑같은 동작을 하면 Stateless하다고 봄
  * 반대로 서버가 죽었다 살아났을 때 조금이라도 동작이 다른 경우 Stateful하다고 봄
- 서버가 스스로 어떤 기억을 갖고 다른 결정을 하냐 마냐의 차이라고 보면 됨
- 로그인 정보를 서버에 저장하게 되면 무조건 Stateful(상태 보존)이라고 볼 수 있음

# JWT를 왜 써야하나?
JWT는 누구든지 내부에 들어있는 정보를 확인하 수 있고, 위변조 여부를 확인할 수 있다는 특징이 있음


# 생긴 모양
### HEADER: algorism & token type
```javascript
{
    "alg": "HS256,
    "typ": "JWT
}
```
### PAYLOAD: data
```javascript
{
    "sub": "1234567890",
    "name": "John Doe",
    "iat": 1516239022
}
```
### VERIFY SIGNATURE
```javascript
HMACSHA256(
    base64UrlEncode(header) + "." +
    base64UrlEncode(payload),
    your-256-bit-secret
) secret base64 encoded
```