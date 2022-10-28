import chalk from 'chalk';

export default class Logging {
    public static logs = (args: any) => this.info(args)
  public static info = (args: any) =>
    console.log(
      chalk.blue(`[${new Date().toLocaleString()}] [Info]`),
      typeof args === 'string' ? chalk.blueBright(args) : args
    );
  public static warn = (args: any) =>
    console.log(
      chalk.yellow(`[${new Date().toLocaleString()}] [Info]`),
      typeof args === 'string' ? chalk.yellowBright(args) : args
    );
  public static error = (args: any) =>
    console.log(
      chalk.red(`[${new Date().toLocaleString()}] [Info]`),
      typeof args === 'string' ? chalk.redBright(args) : args
    );
}
