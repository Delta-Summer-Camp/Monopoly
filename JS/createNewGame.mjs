/*
*	Init resources for new game
*/

import { getDatabase, ref, child, set } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-database.js";
import { app } from "./initFirebase.mjs";
import { myUID } from "./auth.mjs";
import { gameAssets } from "./assets.mjs";

function createNewGame(gameID) {

	const players = [];
	players[myUID] = {
		status: "Preparing"
	}

	const gameData = {
		status: "New",
		owner: myUID,
		players: players,
		assets: gameAssets		
	}
	
	const gameRef = child(ref(getDatabase(app)), 'games/' + gameID);
	return set(gameRef, gameData);
}

export { createNewGame };