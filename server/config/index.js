module.exports = {
  session: {
    secret: process.env.SESSION_SECRET || 's@1t',
    resave: process.env.SESSION_RESAVE === 'true',
    saveUninitialized: process.env.SESSION_SAVE_UNINITIALIZED === 'true'
  }
}
