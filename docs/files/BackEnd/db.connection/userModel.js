import { db } from './dbConnection.js'
import { DataTypes } from 'sequelize'

export const tableInint = db.define("AboutUserData", {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
		allowNull: false,
		uniqe: true
	},
	userName: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		uniqe: true
	},
	message: {
		type: DataTypes.STRING(10000),
		allowNull: false,
	},
}, {
	timestamps: true,
	updatedAt: false,
});

