import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js";

function auth(app) {
	return new Promise(function(resolve, reject){
		let param = "This session is not authorized!";
		const fbAuth = getAuth(app);

		if (fbAuth) {
			param = "We are authrized!";
			resolve(param);
		}
	})
}

export { auth };
