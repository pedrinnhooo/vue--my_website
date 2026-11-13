import nodemailer from 'nodemailer'
import axios from 'axios'

const BRAND = {
  name: process.env.SITE_BRAND_NAME || 'Portfolio',
  void: '#05030b',
  surface: '#10081a',
  card: '#140c22',
  ink: '#f7f2ff',
  mute: '#b8adc8',
  soft: '#7d728f',
  line: 'rgba(192,132,252,0.22)',
  accent: '#c084fc',
  accentDeep: '#7c3aed'
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

function buildEmailHtml({
  name,
  email,
  phone,
  subject,
  message,
  ip,
  brand = BRAND
}) {
  const safeMsg = escapeHtml(message).replace(/\n/g, '<br>')
  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safePhone = escapeHtml(phone || '')
  const safeSubject = escapeHtml(subject || 'Contato')
  const safeIp = escapeHtml(ip || '—')
  const now = new Date().toLocaleString('pt-BR')
  const year = new Date().getFullYear()
  const brandName = escapeHtml(brand.name)

  const row = (label, value) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid ${brand.line};font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:${brand.soft};width:110px;vertical-align:top;">
        ${label}
      </td>
      <td style="padding:10px 0;border-bottom:1px solid ${brand.line};font-family:Arial,Helvetica,sans-serif;font-size:15px;color:${brand.ink};vertical-align:top;">
        ${value}
      </td>
    </tr>`

  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">
  <title>${brandName} • Nova mensagem</title>
</head>
<body style="margin:0;padding:0;background:${brand.void};">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:${brand.void};">
    <tr>
      <td align="center" style="padding:28px 16px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width:600px;max-width:100%;background:${brand.card};border:1px solid ${brand.line};border-radius:22px;overflow:hidden;">
          <tr>
            <td style="padding:0;background:linear-gradient(135deg,${brand.accentDeep} 0%,#9333ea 48%,${brand.accent} 100%);height:4px;font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:28px 28px 8px;font-family:Arial,Helvetica,sans-serif;">
              <p style="margin:0 0 10px;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:${brand.accent};">Contact · Inbox</p>
              <h1 style="margin:0;font-size:26px;line-height:1.2;letter-spacing:-0.03em;color:${brand.ink};font-weight:700;">
                ${brandName}
              </h1>
              <p style="margin:10px 0 0;font-size:15px;color:${brand.mute};">
                Nova mensagem do site · <span style="color:${brand.ink};">${safeSubject}</span>
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:18px 28px 8px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
                style="background:${brand.surface};border:1px solid ${brand.line};border-radius:16px;">
                <tr>
                  <td style="padding:18px 20px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      ${row('Nome', safeName)}
                      ${row('E-mail', `<a href="mailto:${safeEmail}" style="color:${brand.accent};text-decoration:none;">${safeEmail}</a>`)}
                      ${safePhone ? row('Telefone', `<a href="tel:${safePhone}" style="color:${brand.accent};text-decoration:none;">${safePhone}</a>`) : ''}
                      ${row('Assunto', safeSubject)}
                      ${row('IP', `<span style="font-family:Consolas,Monaco,monospace;font-size:13px;color:${brand.mute};">${safeIp}</span>`)}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:16px 28px 8px;font-family:Arial,Helvetica,sans-serif;">
              <p style="margin:0 0 10px;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:${brand.soft};">Mensagem</p>
              <div style="padding:16px 18px;border-radius:14px;border:1px solid ${brand.line};border-left:3px solid ${brand.accent};background:${brand.surface};font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.65;color:${brand.ink};">
                ${safeMsg}
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:18px 28px 28px;font-family:Arial,Helvetica,sans-serif;">
              <a href="mailto:${safeEmail}?subject=${encodeURIComponent(`Re: ${subject || 'Contato'}`)}"
                 style="display:inline-block;padding:12px 20px;border-radius:999px;background:#ffffff;color:#111111;font-size:14px;font-weight:700;text-decoration:none;">
                Responder
              </a>
              <p style="margin:18px 0 0;font-size:12px;line-height:1.5;color:${brand.soft};">
                Enviado automaticamente em ${now}.<br>
                © ${year} ${brandName}
              </p>
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
    const ip = getClientIp(event)
    const rate = checkContactRateLimit(ip)

    setResponseHeader(event, 'X-RateLimit-Limit', String(rate.limit))
    setResponseHeader(event, 'X-RateLimit-Remaining', String(rate.remaining))
    setResponseHeader(event, 'X-RateLimit-Reset', String(Math.floor(rate.resetAt / 1000)))

    if (!rate.allowed) {
      setResponseHeader(event, 'Retry-After', String(rate.retryAfterSec))
      throw createError({
        statusCode: 429,
        statusMessage: 'Muitas mensagens deste IP. Tente novamente mais tarde.'
      })
    }

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
      html: buildEmailHtml({ name, email, phone, subject, message, ip }),
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
        `IP: ${ip}`,
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
