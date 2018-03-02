export default {
  api: process.env.NODE_ENV === 'development' ? `http://127.0.0.1:${process.env.PORT || 80}/api` : '/api'
}
