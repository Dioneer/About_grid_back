import { db } from './dbConnection.js'
import { tableInint } from './userModel.js'

export const saveUserData = async (userName, email, message) => {
	try {
		await db.sync();

		const textAfterSaving = `User ${userName} message was saved`
		const textAfterUdpate = `User ${userName} was update`

		const foundUser = await tableInint.findOne({ where: { email } });

		if (!foundUser) {
			await tableInint.create({ userName, email, message });
			return textAfterSaving;
		}

		if (foundUser.name != userName) {
			await tableInint.update({ userName }, { where: { email } });
			return textAfterUdpate;
		}
	} catch (e) {
		throw new Error("UserData", e);
	}
}
