import * as dotenv from 'dotenv'
import Sequelize from 'sequelize'

dotenv.config()

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD,
	{
		host: process.env.DB_HOST,
		dialect: 'mysql',
	});

export { db }