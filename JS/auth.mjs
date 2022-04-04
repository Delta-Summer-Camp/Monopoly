import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js";
import { getDatabase, get, ref, child, set } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-database.js";
var myUID = null;

function auth(app) {
	return new Promise((resolve, reject) => {
		let param = "This session is not authorized!";
		const fbAuth = getAuth(app);

		// check if the authorization has been changed
		onAuthStateChanged(fbAuth, user => {
			// ...if not authorized
			if (!user) {
			const provider = new GoogleAuthProvider();

			signInWithPopup(fbAuth, provider)
				.catch(error => {
					alert(error.message);
				})				
			}

			// ...if authorized
			else {
				myUID = user.uid;
				const dbRef = ref(getDatabase(app));
				get(child(dbRef, 'users/' + myUID))
					.then(snapshot => {
						if (snapshot.exists) {
							const currentPlayer = snapshot.val();
							if(currentPlayer && currentPlayer.nickname) {
								param = "This session is authorized as " + currentPlayer.nickname;
								resolve(param);
							}
							else {
								const myName = prompt("Привет! Как тебя зовут?", "Captain Nemo");
								// Ошибка была тут: забыли импортировать функцию 'set()'!
								set(child(dbRef, 'users/' + myUID + '/nickname'), myName);
								param = "This session is authorized with new user " + myName;
								resolve(param);
							}
						}
					})
			}
		})
	})
}

export { auth };