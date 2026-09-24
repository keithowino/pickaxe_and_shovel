import bcrypt from "bcrypt";

class PasswordService {
	constructor() {
		/**
		 * We would eventually consider moving saltRounds
		 * into configuration rather than hard-coding it.
		 */
		this.saltRounds = 12;
	}

	async hash(password) {
		return bcrypt.hash(password, this.saltRounds);
	}

	async compare(plainPassword, hashedPassword) {
		return bcrypt.compare(plainPassword, hashedPassword);
	}
}

export default new PasswordService();
