/* eslint-disable no-console */
import chalk from 'chalk'

export default function log(level: string, user: string | undefined, ...contents: any[]) {
  const date = new Date()
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')
  const fmtDate = `${day}/${month} ${hours}:${minutes}:${seconds}`

  let str = ''
  str += chalk.gray(fmtDate) + ' ['
  switch (level.toLowerCase()) {
    case 'error':
    case 'failed':
      str += chalk.redBright(level)
      break
    case 'success':
    case 'ok':
      str += chalk.greenBright(level)
      break
    case 'event':
    case 'change':
      str += chalk.magentaBright(level)
      break
    case 'info':
      str += chalk.cyanBright(level)
      break
    case 'warning':
      str += chalk.yellowBright(level)
      break
    default:
      str += level
  }
  str += ']'
  if (user) str += ' ' + chalk.underline.yellow(user) + chalk.yellow(':')
  console.log(str, ...contents)
}
