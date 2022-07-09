/*
*
*	Module to restore or initialize game state
*
*/
import { getDatabase, ref, set, onValue, child, get, update } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-database.js";
import { app } from "./initFirebase.mjs";
import { myUID } from "./auth.mjs";
import { initPlayer } from "./initPlayer.mjs";

function initGame(gameID) {
	console.debug("initGame()");
	return new Promise((resolve, reject) => {
		console.debug("initGame(): promise started");
		// check the game status and the player state
		const gameRef = child(ref(getDatabase(app)), 'games/' + gameID); 
		get(gameRef).then(snapshot => {
			console.debug("initGame(): get(gameRef)");
			if(!snapshot.exists()) {
				console.debug(`initGame(): rejected: Game ${gameID} doesn't exist`);
				reject(`Game ${gameID} doesn't exist`);
			}
			const game = snapshot.val();
			const player = game.players[myUID];
			switch (game.status) {
				// prepare for game
				case "New":
					// if current player is not created or in "preparing state"
					if (!player || player.status === "Preparing") {
						console.debug("initGame(): call initPlayer()");
						initPlayer(gameID, player).then(player => {
							player.status = "Ready";
							update(child(gameRef, "players/" + myUID), player);
							console.debug(`initGame(): resolved`);
							resolve(gameID);
						});
					}
					// if already prepared
					else {
						console.debug(`initGame(): resolved, player status="${player.status}"`);
						resolve(gameID);
					}
					break;
				case "Ready":
				case "Playing":
					console.debug(`initGame(): resolved`);
					resolve(gameID);
					break;
				default:
					console.debug(`initGame(): rejected: Эту игру невозможно восстановить :(`);
					reject("Эту игру невозможно восстановить :(");
			}
		});

	});

}

export { initGame };