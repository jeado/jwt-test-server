const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const authRouter = require('./routers/auth')

const auth = require('./auth')
const app = express()

const myLogger = (req, res, next) => {
  console.log(`Someone reqeusts to ${req.url}`)
  next()
}

app.set('view engine', 'ejs')  // 사용할 템플릿 엔진
app.set('views', path.resolve(`${__dirname}/views`)) // 렌더링할 파일 경로

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())

app.use(myLogger)
app.use(auth.init())

app.use('/auth', authRouter)
app.post('/order', auth.authenticate(), (req, res, next) => {
  const { items } = req.body
  console.log(items);
  console.log(req.user);
  res.json({ msg: `${req.user.name}님의 주문을 완료했습니다.`})
})
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
