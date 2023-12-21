const nodemailer = require('nodemailer')

const transportador = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

const send = (to, subject, body) => {
    transportador.sendMail({
        from: process.env.EMAIL_FROM,
        to,
        subject,
        text: body
    })
}

module.exports = send 