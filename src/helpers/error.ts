import { boomify, forbidden, internal, isBoom } from '@hapi/boom'
import { NextFunction, Request, Response } from 'express'
import { ERROR_PAGE } from '.'

export default function error(error: any, req: Request, res: Response, next: NextFunction) {
  if (error.code === 'EBADCSRFTOKEN') {
    error = forbidden(
      'Falha na verificação do token CSRF, verifique se os cookies estão ativados ou recarregue a página'
    )
  }

  if (!isBoom(error)) {
    console.error(error)
    error.statusCode
      ? (error = boomify(error, { statusCode: error.statusCode }))
      : (error = internal(error.message))
  }

  res.status(error.output.statusCode)

  const accept = req.accepts(['json', 'html'])

  // Envia em formato JSON
  if (accept === 'json') {
    return res.json(Object.assign(error.output.payload, { message: error.message }))
  }

  try {
    // Envia a página HTML de erro
    let html = ERROR_PAGE
    html = html.replace(
      /%0/g,
      `${error.output.payload.statusCode || ''} ${error.output.payload.error || ''}`
    )
    html = html.replace(/%1/g, error.output.payload.error === error.message ? '' : error.message)
    res.send(html)
  } catch {
    // Envia um HTML simples de erro
    res.send(`
      <h1 style="text-align:center;font-family:sans-serif">
        ${error?.output?.payload?.statusCode || ''} ${error?.output?.payload?.error || 'Erro'}
      </h1>
      <p style="text-align:center;font-family:sans-serif">
        ${error?.output?.payload?.error === error?.message ? '' : error?.message}
      </p>
    `)
  }
}
