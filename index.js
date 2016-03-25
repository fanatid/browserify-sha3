var Sha3 = require('js-sha3')

var HASH_LENGTS = [ 224, 256, 384, 512 ]

function SHA3Hash (bitcount) {
  if (bitcount !== undefined) {
    if (HASH_LENGTS.indexOf(bitcount) == -1) throw new Error('Unsupported hash length')
    bitcount = 512
  }

  this._content = []
  this._bitcount = 'keccak_' + bitcount
}

SHA3Hash.prototype.update = function (data, encoding) {
  if (Buffer.isBuffer(data)) {
    this._content.push(data)
  } else if (typeof data === 'string') {
    this._content.push(new Buffer(data, encoding))
  } else {
    throw new Error('Unsupported argument to update')
  }

  return this
}

SHA3Hash.prototype.digest = function (encoding) {
  var result = Sha3[this._bitcount](Buffer.concat(this._content))
  if (encoding === 'hex') return result

  result = new Buffer(result, 'hex')
  if (encoding !== undefined) result = result.toString('encoding')
  return result
}

module.exports.SHA3Hash = SHA3Hash
