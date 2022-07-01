/*
*
*	Initialazing new game
*
*/
import { getDatabase, ref, set, child } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-database.js";
import { app } from "./initFirebase.mjs";
import { myUID } from "./auth.mjs";
import { gameAssets } from "./assets.mjs";




function createNewGame(gameID) {
	const gameRef = child(ref(getDatabase(app)), 'games/' + gameID);
	const players = [];
	players[myUID] = {status: "Preparing"};

	const gameData = {
		assets: gameAssets,		
		players: players,
		status: "New",
		owner: myUID		
	}

  return set(gameRef, gameData);
}

export { createNewGame };