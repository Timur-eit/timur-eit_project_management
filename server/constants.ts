interface IConstants {
  port: number,
  pgSettings: {
    user: string,
    host: string,
    database: string,
    password: string,
    port: number
  },  
}

const constants: IConstants = {
  port: 8000,
  pgSettings: {
    user: 'postgres',
    host: 'localhost',
    database: 'crud',
    password: 'blablabla5',
    port: 5432
  }
}

export default constants
