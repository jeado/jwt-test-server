# 시작하기

  npm i

## api
http://localhost:3000/auth/login POST 요청
Headers
```
  Content-Type: application/json
```
BODY
```
{
	"id": "admin",
	"password": "admin"
}
```

토큰을 응답으로 받으면 해당 토큰으로 다음요청을 보낸다.
http://localhost:3000/order POST 요청
Headers
```
  Authorization: Bearer 앞의_응답_토큰
  Content-Type: application/json
```
BODY
```
{
	"items": []
}
```


