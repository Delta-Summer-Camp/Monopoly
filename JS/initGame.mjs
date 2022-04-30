/*
*
*	Module to restore game state
*
*/

import { getDatabase, get, ref, child } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-database.js";
import { app } from "./initFirebase.mjs";
import { myUID } from "./auth.mjs";

function initGame(gameID) {
	return new Promise((resolve, reject) => {
		const gameRef = child(ref(getDatabase(app)), 'games/' + gameID);
		get(gameRef).then(snapshot => {
			if(!snapshot.exists()) {
				alert("Game " + gameID + " doesn't exist!");
				reject();
			}

			const game = snapshot.val();
			const player = game.players[myUID];
			switch (game.status) {
				case "New":
					// ToDo:
					if (!player || player === "Preparing") {
						initPlayer(gameID, player).then(resolve)
					}
					break;
				default:
					alert("Эту игру невозможно восстановить...");
					reject();
			}
		});
	})
}

export { initGame }