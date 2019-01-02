const router = require('express').Router()
const jwt = require('jwt-simple')
const config = require('../config')
const users = require('../users');

const isValidEmail = (email) => {
  const regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

  return regex.test(email)
}

router.post('/login', (req, res) => {
  const {id, password} = req.body

  if (!id || !password) return res.status(400).send({msg: '아이디 또는 비밀번호를 넣어주세요.'});

  const user = 
    users.find(v => v.id === id && v.password === password);
  if (user) {
    const token = jwt.encode(user, config.auth.key)
    res.json({token, msg: '로그인 성공!'})
  } else {
    return res.status(500).send({msg: 'internal server error'})
  }
});

module.exports = router
