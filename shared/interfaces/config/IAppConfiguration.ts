export interface IAppConfiguration {
  general: {
    projectName: string;
  },
  server: {
    env: string;
    port: number;
  }
}
