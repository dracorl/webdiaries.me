import nodemailer from "nodemailer"
import {YANDEX_USER, YANDEX_PASS} from "../config/index.js"

const transporter = nodemailer.createTransport({
  host: "smtp.yandex.com",
  port: 465,
  secure: true,
  auth: {
    user: YANDEX_USER,
    pass: YANDEX_PASS
  }
})

const mailTemplate = (email, token) => {
  const url = `https://webdiaries.online/reset-password/${token}`
  return {
    from: YANDEX_USER,
    to: email,
    subject: "Password Reset",
    text: `Your password reset URL is ${url}`
  }
}

const sendMail = async (email, token) => {
  try {
    const info = await transporter.sendMail(mailTemplate(email, token))
    return info
  } catch (error) {
    console.log(error)
    throw new Error("Error occurred while sending email")
  }
}

export default sendMail
