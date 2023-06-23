import crypto from 'crypto'
import type EventEmitter2 from 'eventemitter2'
export type Reviver = Parameters<JSON['parse']>[1]

// "bb5dc8842ca31d4603d6aa11448d1654"
/** Converte uma string em JSON caso seja válida */
export function jsonParse<T = any, U = any>(
  text: any,
  defaultValue: U | any = {},
  noDefaultValue = false,
  reviver?: Reviver
): T | U {
  if (noDefaultValue) defaultValue = undefined
  if (typeof text === 'object' && text !== null) {
    return text || defaultValue
  } else {
    try {
      return JSON.parse(text, reviver) || defaultValue
    } catch {
      return defaultValue
    }
  }
}

export function randomRoomID() {
  return crypto.randomBytes(4).toString('hex').toUpperCase()
}

export function inheritEvents(a: EventEmitter2, b: EventEmitter2) {
  b.on('*', function (this: any, ...args: any[]) {
    a.emit(this.event, ...args)
  })
}

export function deserialize<T = any>(object: any | null, classe: { new (obj: any): any }): T {
  if (!object) return object
  if (Array.isArray(object)) {
    return object.map((object) => deserialize(object, classe)) as any
  }

  if (object instanceof classe) return object
  return new classe(object)
}

export const ERROR_PAGE = `
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>%0</title>
    <link rel="stylesheet" href="/error/index.css" />
    <style>
      body {
        align-items: center;
        background-color: #f8f9fa;
        color: #6c757d;
        display: flex;
        font-family: system-ui, Roboto, Arial, sans-serif;
        height: 100vh;
        justify-content: center;
        margin: 0;
        text-align: center;
        word-break: break-word;
      }

      .container {
        margin-left: auto;
        margin-right: auto;
        padding-left: 15px;
        padding-right: 15px;
        width: 100%;
      }

      @media (min-width: 576px) {
        .container {
          width: 540px;
        }
      }

      .container {
        align-items: center;
        display: flex;
        flex-direction: column;
        margin: 10px;
        margin: auto;
        max-width: 720px;
        width: 100%;
      }

      h1 {
        margin-bottom: 0;
      }

      a {
        border-radius: 0.375rem;
        border: #2f855a 1px solid;
        color: #2f855a;
        cursor: pointer;
        font-weight: 600;
        padding-bottom: 7px;
        padding-left: 15px;
        padding-right: 15px;
        padding-top: 7px;
        text-decoration: none;
        transition: 0.2s ease;
      }

      a:hover {
        background-color: rgba(154, 230, 180, 0.12);
      }

      @media (prefers-color-scheme: dark) {
        body {
          background-color: #212529;
          color: #ced4da;
        }

        svg {
          fill: #ced4da;
        }

        a {
          border-color: #9ae6b4;
          color: #9ae6b4;
        }
      }
    </style>
  </head>

  <body>
    <div class="container">
      <img
        src="https://cdn-icons-png.flaticon.com/512/3381/3381099.png"
        alt="Servidor"
        style="width: 120px; height: 120px"
      />
      <h1>%0</h1>
      <p>%1</p>
      <a href="/">Voltar à página inicial</a>
    </div>
  </body>
</html>
`.trim()
