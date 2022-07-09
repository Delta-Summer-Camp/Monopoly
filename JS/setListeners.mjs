/*
*
*	Block of the listeners
*
*/
import { getDatabase, ref, onValue, child } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-database.js";
import { app } from "./initFirebase.mjs";

let players = null;

function setListeners(gameID) {
	console.debug("setListeners()");
	return Promise.all([
		setPlayersListener(gameID)
	]);

	function setPlayersListener(gameID) {
		console.debug("setListeners(): setPlayersListener()");
		return new Promise((resolve, reject) => {
			console.debug("setListeners(): setPlayersListener() promise started");
			const playersRef = child(ref(getDatabase(app)), '/games/' + gameID + '/players/');
			onValue(playersRef, snapshot => {
				console.debug("setListeners(): setPlayersListener(): onValue(playersRef)");
				if (snapshot.exists) {
					players = snapshot.val();
					resolve(gameID);
				} 
				else {
					console.debug("setListeners(): setPlayersListener(): rejected: Проблема с доступом к данным игроков!");
					reject("Проблема с доступом к данным игроков!");
				}
			})
		})
	}
}

export { setListeners, players };