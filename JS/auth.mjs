/*
*  Authentification module, exports auth(app) function that make all autharization steps and returs the promice
*/
import { app } from "./initFirebase.mjs";
import { getAuth, signOut, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js";
import { getDatabase, ref, set, onValue, child, get } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-database.js";

var myUID = null;
function auth() {
	return new Promise(resolve => {
		let param = "This session is not authorized!";
		const fbAuth = getAuth(app);

		// Check if the authorization has been changed
		onAuthStateChanged(fbAuth, user => {

			// ...if not authorized
			if (!user) {
				const provider = new GoogleAuthProvider();

				signInWithPopup(fbAuth, provider) 
					.catch(error => {
						alert(error.message);
					})

			}

			// ...if authorithed check if we know who is it
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
								const myName = prompt("Привет! Как тебя зовут?", "Captain Nemo")
								set(child(dbRef, 'users/' + myUID + '/nickname'), myName);
								param = "This session is authorized with new user " + myName;
								resolve(param);
							}
						}
					})
			}

		})
	});
}

export { auth, myUID };