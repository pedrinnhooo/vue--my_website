import nodemailer from 'nodemailer'
import axios from 'axios'

const BRAND = {
  name: process.env.SITE_BRAND_NAME || 'Portfolio',
  primary: '#5102c4',
  dark: '#111827',
  muted: '#6B7280',
  border: '#E5E7EB',
  bg: '#F7F9FC'
}

function requireEnv(key) {
  const value = process.env[key]
  if (!value) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Serviço de contato indisponível'
    })
  }
  return value
}

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function buildEmailHtml({ name, email, phone, subject, message, brand = BRAND }) {
  const safeMsg = escapeHtml(message).replace(/\n/g, '<br>')
  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safePhone = escapeHtml(phone || '')
  const safeSubject = escapeHtml(subject || 'Contato')
  const now = new Date().toLocaleString('pt-BR')
  const year = new Date().getFullYear()

  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(brand.name)} • Nova mensagem</title>
</head>
<body style="margin:0;padding:0;background:${brand.bg};">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:${brand.bg};">
    <tr>
      <td align="center" style="padding:24px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width:600px;max-width:100%;background:#fff;border-radius:12px;overflow:hidden;">
          <tr>
            <td style="background:${brand.primary};padding:24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;color:#fff;font-size:20px;font-weight:700;">
              ${escapeHtml(brand.name)}
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px 8px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;color:${brand.dark};">
              <h1 style="margin:0 0 4px;font-size:22px;">Nova mensagem do site</h1>
              <p style="margin:0;color:${brand.muted};font-size:14px;">Assunto: <strong style="color:${brand.dark};">${safeSubject}</strong></p>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 32px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:14px;color:${brand.dark};">
              <p style="margin:6px 0;"><strong>Nome:</strong> ${safeName}</p>
              <p style="margin:6px 0;"><strong>E-mail:</strong> ${safeEmail}</p>
              ${safePhone ? `<p style="margin:6px 0;"><strong>Telefone:</strong> ${safePhone}</p>` : ''}
            </td>
          </tr>
          <tr>
            <td style="padding:8px 32px 24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:15px;line-height:1.6;color:${brand.dark};">
              <h3 style="margin:0 0 8px;font-size:16px;">Mensagem</h3>
              <div style="border-left:4px solid ${brand.primary};padding:12px 16px;">${safeMsg}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 28px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;color:${brand.muted};font-size:12px;">
              Enviado automaticamente em ${now}. © ${year} ${escapeHtml(brand.name)}.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

async function sendEmailNotification({ to, subject, html, replyTo }) {
  const host = requireEnv('EMAIL_HOST')
  const port = Number(process.env.EMAIL_PORT || 587)
  const user = requireEnv('EMAIL_USER')
  const pass = requireEnv('EMAIL_PASS')
  const from = requireEnv('EMAIL_FROM')

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass }
  })

  const info = await transporter.sendMail({
    from: `"${BRAND.name}" <${from}>`,
    to,
    replyTo,
    subject,
    html
  })

  return { success: true, messageId: info.messageId }
}

async function sendWhatsAppNotification({ phone, message }) {
  if (process.env.WHATSAPP_API_URL && process.env.WHATSAPP_ACCESS_TOKEN) {
    const response = await axios.post(
      process.env.WHATSAPP_API_URL,
      {
        messaging_product: 'whatsapp',
        to: phone,
        type: 'text',
        text: { body: message }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    )
    return { success: true, data: response.data }
  }

  if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
    const twilioAuth = Buffer.from(
      `${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`
    ).toString('base64')

    const response = await axios.post(
      `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`,
      new URLSearchParams({
        From: process.env.TWILIO_WHATSAPP_FROM,
        To: process.env.TWILIO_WHATSAPP_TO,
        Body: message
      }),
      {
        headers: {
          Authorization: `Basic ${twilioAuth}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )
    return { success: true, data: response.data }
  }

  return { success: false, skipped: true }
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { name, email, phone, subject, message } = body || {}

    if (!name || !email || !message) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Campos obrigatórios não preenchidos'
      })
    }

    const emailTo = requireEnv('EMAIL_TO')

    const emailResult = await sendEmailNotification({
      to: emailTo,
      subject: `Contato do site - ${String(subject || 'Sem assunto').slice(0, 120)}`,
      html: buildEmailHtml({ name, email, phone, subject, message }),
      replyTo: email
    })

    let whatsappResult = { success: false, skipped: true }
    const whatsappPhone = process.env.WHATSAPP_PHONE_NUMBER

    if (whatsappPhone) {
      const whatsappMessage = [
        'Nova solicitação de contato do site',
        `Nome: ${name}`,
        `Email: ${email}`,
        phone ? `Telefone: ${phone}` : null,
        `Assunto: ${subject || '—'}`,
        '',
        'Mensagem:',
        message
      ]
        .filter(Boolean)
        .join('\n')

      whatsappResult = await sendWhatsAppNotification({
        phone: whatsappPhone,
        message: whatsappMessage
      })
    }

    return {
      success: true,
      message: 'Mensagem enviada com sucesso!',
      emailSent: Boolean(emailResult.success),
      whatsappSent: Boolean(whatsappResult.success)
    }
  } catch (error) {
    if (error?.statusCode) throw error

    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor'
    })
  }
})
