/*
*	Init resources for new game
*/

import { getDatabase, ref, child, set } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-database.js";
import { app } from "./initFirebase.mjs";
import { myUID } from "./auth.mjs";

function initNewGame(gameID) {

	const players = [];
	players[myUID] = {
		status: "Preparing"
	}

	const assets = {
		tokens: ["boot", "car", "dog"]
		// ToDo: add money, chanses, etc.
	}

	const gameData = {
		status: "New",
		owner: myUID,
		players: players,
		assets: assets		
	}
	
	const gameRef = child(ref(getDatabase(app)), 'games/' + gameID);
	return set(gameRef, gameData);
}

export { initNewGame };