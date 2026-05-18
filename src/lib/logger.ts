type LogContext = Record<string, unknown>

function formatMessage(level: string, message: string, context?: LogContext): string {
  const ts = new Date().toISOString()
  const ctx = context ? ` ${JSON.stringify(context)}` : ''
  return `[${ts}] ${level.toUpperCase()} ${message}${ctx}`
}

export const logger = {
  info(message: string, context?: LogContext) {
    console.log(formatMessage('info', message, context))
  },
  warn(message: string, context?: LogContext) {
    console.warn(formatMessage('warn', message, context))
  },
  error(message: string, context?: LogContext) {
    console.error(formatMessage('error', message, context))
  },
}
