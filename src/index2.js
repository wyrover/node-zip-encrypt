const zlib = require('zlib')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const publickey = `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAoLZmhiNFyct6AlQbb3p0
oVebAXDuQEiGwpeLo58BTOURZNBybWQ1sIYAfq0MgvPizXaNzcJxVzPOJupgdfEp
fnkJ4DN0TP8T5SisvRXFa8WXVcxo5WhoB4It0fl4XF6yDj8ypxIWQRCvOSpwoD3m
GbCXHTQJwYwgK8QcS+kKK07NEJtxXfioVtIVPRf7JVV+W9uH3MXx1AFoOzXnBIxG
Cowsat6POIhMHITxR+g2vnmT8cUaKs1d4ibpfe8tfGSuky+oySLDKYnLWo2zcOVL
ylGSvWXttsU5IP465fYXW4JH4/Eoe0vEmYr+Yj0KweQkwQEZfinWRlAxTT8pPNvn
2B6krcBPH656QIQP1/tt92atnbGLnZSBIRq78uqDtiVJEg/66miQVnOlWACoWgMg
+kVvBS/JtPXcQ82ZMQjGK4EAIQFevOLjeQvNzuLCJfpZwghdsT6wLTLp/iE/F5q4
kPPmEc/GXkfDk7lEqeNzGIVxxRyzr6bZPXjaL+QOzoCJ149RQReLIfsbtyghpS+a
/OyhDaR5mbxMlRb+tcHZ36JvMVL2h+Y/Rk6UFRc2xTysBtGTvTt7ndlVd0GFaD1B
ASc3IJBOHJ64A36gsR9t+kKUgWlIl3mbK2yJ2Wih/pUEgNUn9dCwGjv0TMuSlZ3H
AYhNMeFXnYJ5SF1agHpVYm0CAwEAAQ==
-----END PUBLIC KEY-----
`

const privatekey = `-----BEGIN ENCRYPTED PRIVATE KEY-----
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
-----END ENCRYPTED PRIVATE KEY-----`

let key = crypto.randomBytes(32)
let iv = crypto.randomBytes(16)

const content = 'hello world!'
const passphrase = 'top secret'

const dest_filename = path.resolve('zip_encrypted.bin')

encrypt_file_1(dest_filename, content, privatekey, passphrase)
decrypt_file_1(dest_filename, publickey, passphrase)

// console.log(privatekey)
// console.log(publickey)

function encrypt_file_1(filename, content, privatekey, passphrase) {
  var fd = fs.openSync(filename, 'w')

  let key = crypto.randomBytes(32)
  let iv = crypto.randomBytes(16)

  let encrypted_key_iv = crypto.privateEncrypt(
    {
      key: privatekey,
      passphrase: passphrase,
    },
    Buffer.concat([key, iv])
  )

  fs.writeSync(fd, Buffer.from(encrypted_key_iv, 'binary'))

  

  //console.log(encrypted_key_iv.toString('hex'))

  let compressBuf = zlib.deflateRawSync(content)
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
  cipher.update(compressBuf, 'binary')
  let encrypted_output = cipher.final()
  //fs.writeFileSync(filename, encrypted_output, 'binary')
 

  fs.writeSync(fd, Buffer.from(encrypted_output, 'binary'))
  fs.closeSync(fd)

  console.log(encrypted_key_iv.length)
}

function decrypt_file_1(filename, publickey, passphrase) {
  let encryptedBuffer = Buffer.from(
    fs.readFileSync(filename, 'binary'),
    'binary'
  )

  console.log(encryptedBuffer.length)

  let key_iv = Buffer.from(encryptedBuffer, 0, 512)

  console.log(encryptedBuffer.length)

  let decrypted_key_2 = crypto.publicDecrypt(
    {
      key: publickey,
      passphrase: passphrase,
    },
    key_iv
  )

  //   let key = Buffer.from(decrypted_key_2, 0, 32)
  //   let iv = Buffer.from(decrypted_key_2, 32, 16)

  //   console.log(decrypted_key_2.length)

  console.log(decrypted_key_2.toString('hex'))

  //   const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
  //   decipher.update(encryptedBuffer, 'binary')
  //   let decryptedBuffer = decipher.final()

  //   let result = zlib.inflateRawSync(decryptedBuffer)
  //   return result.toString('utf8')
}
