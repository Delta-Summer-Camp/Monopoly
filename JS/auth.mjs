import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js";
import { getDatabase, get, ref, child, set } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-database.js";
var myUID = null;

function auth(app) {
	return new Promise(function(resolve, reject){
		let param = "This session is not authorized!";
		const fbAuth = getAuth(app);

		// check if the authorization has been changed
		onAuthStateChanged(fbAuth, function(user) {
			// ...if not authorized
			if (!user) {
			const provider = new GoogleAuthProvider();

			signInWithPopup(fbAuth, provider)
				.catch(function(error) {
					alert(error.message);
				})				
			}

			// ...if authorized
			else {
				myUID = user.uid;
				const dbRef = ref(getDatabase(app));
				get(child(dbRef, 'users/' + myUID))
					.then(function(snapshon) {
						if (snapshon.exists) {
							const currentPlayer = snapshon.val();
							if(currentPlayer && currentPlayer.ninkname) {
								param = "This session is authorized as " + currentPlayer.ninkname;
								resolve(param);
							}
							else {
								const myName = prompt("Привет! Как тебя зовут?", "Captain Nemo");
								// Ошибка была тут: забыли импортировать функцию 'set()'!
								set(child(dbRef, 'users' + myUID), myName);
								param = "This session is authorized as " + myName;
								resolve(param);
							}
						}
					})
			}
		})
	})
}

export { auth };