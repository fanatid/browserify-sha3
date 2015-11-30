const Sha3 = require('js-sha3')

const hashLengths = [ 224, 256, 384, 512 ]

var hash = function (bitcount) {
  if (bitcount !== undefined && hashLengths.indexOf(bitcount) == -1)
    throw new Error('Unsupported hash length')
  this.content = ''
  this.bitcount = bitcount ? 'keccak_' + bitcount : 'keccak_512'
}

hash.prototype.update = function (i) {
  this.content = Buffer.isBuffer(i) ? i : new Buffer(i);
  return this
}

hash.prototype.digest = function (encoding) {
  var result = Sha3[this.bitcount](this.content) 
  if(encoding === 'hex')
    return result
  else
    return new Buffer(result, 'hex').toString('binary')
}

module.exports = {
  SHA3Hash: hash
}
