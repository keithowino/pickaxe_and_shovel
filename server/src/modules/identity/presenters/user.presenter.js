import { getId } from "../../../shared/index.js";

class UserPresenter {
	present(user) {
		if (!user) {
			return null;
		}

		return {
			id: getId(user),
			email: user.email,
			roles: user.roles,
		};
	}

	presentMany(users) {
		return users.map((user) => this.present(user));
	}
}

export default new UserPresenter();
