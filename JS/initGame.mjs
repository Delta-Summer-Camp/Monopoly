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
	return new Promise((resolve, reject) => {
		// check the game status and the player state
		const gameRef = child(ref(getDatabase(app)), 'games/' + gameID); 
		get(gameRef).then(snapshot => {
			if(!snapshot.exists()) {
				reject("Game " + gameID + " doesn't exist");
			}
			const game = snapshot.val();
			const player = game.players[myUID];
			switch (game.status) {
				// prepare for game
				case "New":
					// if current player is not created or in "preparing state"
					if (!player || player.status === "Preparing") {
						initPlayer(gameID, player).then(player => {
							player.status = "Ready";
							update(child(gameRef, "players/" + myUID), player);
							resolve(gameID);
						});
					} 
					break;
				case "Ready":
				case "Playing":
					resolve(gameID);
					break;
				default:
					reject("Эту игру невозможно восстановить :(");
			}
		});

	});

}

export { initGame };