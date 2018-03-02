Object.assign(Error.prototype, {
  toJSON: function () {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      stack: this.stack
    }
  }
})

class Base extends Error {
  constructor (message, status = 500) {
    super(message)
    this.name = this.constructor.name
    this.message = message
    this.status = status
    Error.captureStackTrace(this, this.constructor)
  }
}
exports.Base = Base

class BadRequest extends Base {
  constructor (message = 'Bad Request') {
    super(message, 400)
  }
}
exports.BadRequest = BadRequest

class Unauthorized extends Base {
  constructor (message = 'Unauthorized') {
    super(message, 401)
  }
}
exports.Unauthorized = Unauthorized

class Forbidden extends Base {
  constructor (message = 'Forbidden') {
    super(message, 403)
  }
}
exports.Forbidden = Forbidden

class NotImplemented extends Base {
  constructor (message = 'Not Implemented') {
    super(message, 501)
  }
}
exports.NotImplemented = NotImplemented
