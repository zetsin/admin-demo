require('app-module-path').addPath(__dirname)

// node modules
const fs = require('fs')
const path = require('path')

// third-party modules
const express = require('express')
const compression = require('compression')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const passport = require('passport')
const cors = require('cors')
const session = require('express-session')
const sequelize_store = require('connect-session-sequelize')(session.Store)

// my modules
const config = require('config')
const api = require('api')
const models = require('models')

// sync with database
models.sequelize.sync().catch(console.log)

// init app
const app = express()

// set app
app.set('port', config.port)

// use middleware
app.use(morgan('combined'))
app.use(session(Object.assign(config.session, {
  store: new sequelize_store({
    db: models.sequelize
  })
})))
app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors({ origin: true, credentials: true }))

// app.use(passport.initialize())
// app.use(passport.session())
// passport.use(models.user.createStrategy())
// passport.serializeUser(models.user.serializeUser())
// passport.deserializeUser(models.user.deserializeUser())

// api router handler
const router = express()
Object.keys(api).forEach(key => router.use(`/${key}`, api[key]))
app.use('/api', router)

// static client handler
app.use(express.static(path.join(__dirname, '..', 'build')))

// default handler
app.use('*', (req, res, next) => {
  fs.readFile(path.join(__dirname, '..', 'build', 'index.html'), 'utf8', (err, data) => {
    err ? next(err) : res.send(data)
  })
})

// error handler
app.use((err, req, res, next) => {
  if(!res.headersSent) {
    res.status(~~err.status || 500).json({
      name: err.name,
      message: err.message,
      status: err.status,
      sentry: res.sentry
    })
  }
  console.log(err)
})

module.exports = app
