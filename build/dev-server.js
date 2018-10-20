const bodyParser = require('body-parser')

// Express アプリケーションインスタンスを受け取る関数をエクスポート
module.exports = app => {
  // HTTPリクエストのbodyの内容をJSONとして解析するようミドルウェアをインストール
  app.use(bodyParser.json())

  const users = {
    'hoge@hoge.com': {
      password: 'password',
      userId: 1,
      token: '123456'
    }
  }

  app.post('/auth/login', (req, res) => {
    const { email, password } = req.body
    const user = users[email]

    if (user) {
      if (user.password !== password) {
        res.status(401).json({ message: 'メールアドレス又はパスワードが間違っています。' })
      } else {
        res.json({ userId: user.userId, token: user.token })
      }
    } else {
      res.status(404).json({ message: 'ユーザーが登録されていません' })
    }
  })
}