import * as log from 'https://deno.land/std/log/mod.ts';


export class Logger {
  static readonly maxLogSize = 500 * 1024; // 500 kb

  static initLogger() {
    log.setup({
       handlers: {
         console: new log.handlers.ConsoleHandler('DEBUG'),
         file: new log.handlers.FileHandler('ERROR', {
           filename: './logs/log.txt',
           formatter: '{levelName} {msg}'
         }),
         rotate: new log.handlers.RotatingFileHandler('ERROR', {
           maxBytes: this.maxLogSize,
           maxBackupCount: 2,
           filename: './logs/log.txt'
         })
       },

      loggers: {
        default: {
          level: 'DEBUG',
          handlers: ['console', 'file']
        },
        tasks: {
          level: 'ERROR',
          handlers: ['console', 'file']
        }
      }
    })
  }

  static appLogger = log.getLogger();
}


