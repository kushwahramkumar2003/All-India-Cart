import nodemailer from 'nodemailer'
import config from '../config/index.js'

export const mailSender = async ({ email, title, body }:{email:string,title:string,body:string}) => {
  try {
    let transporter = nodemailer.createTransport({
      host: config.MAIL_HOST,
      port: 587,
      auth: {
        user: config.MAIL_USER,
        pass: config.MAIL_PASS
      }
    })

    let info = await transporter.sendMail({
      from: `"InterState-ScholarHub" <${config.MAIL_USER}>`,
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`
    })
    console.log(info)
    return info
  } catch (error) {
    //@ts-ignore
    console.log(error.message)
    return error
  }
}
