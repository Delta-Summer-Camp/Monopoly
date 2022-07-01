/*
*
*	Block of the listeners
*
*/
import { getDatabase, ref, onValue, child } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-database.js";
import { app } from "./initFirebase.mjs";

let players = null;

function setListeners(gameID) {
	return Promise.all([
		setPlayersListener(gameID)
	]);

	function setPlayersListener(gameID) {
		return new Promise((resolve, reject) => {
			const playersRef = child(ref(getDatabase(app)), '/games/' + gameID + '/players/');
			onValue(playersRef, snapshot => {
				if (snapshot.exists) {
					players = snapshot.val();
					resolve(gameID);
				} 
				else reject("Проблема с доступом к данным игроков!");
			})

		})
	}
}

export { setListeners, players };