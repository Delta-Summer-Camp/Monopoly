/*
*	Getting gameID from URL
*/

import { getDatabase, get, ref, child, set } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-database.js";
import { app } from "./initFirebase.mjs";
import { myUID } from "./auth.mjs";
import { createNewGame } from "./createNewGame.mjs";

let gameID = null;

function getGameID() {
	return new Promise((resolve, reject) => {
		// read URL Params
		const params = new URLSearchParams(location.search.substring(1));
		gameID = parseInt(params.get("gameID"), 10);

		// if there is not gameID...
		if (!gameID) {
			gameID = prompt("Введи идентификатор игры чтобы присоединиться\n" +
				"или ноль, чтобы начать новую игру", 0);
		}

		// ...if zero:
		if (gameID == 0) {
			gameID = Date.now();

			createNewGame(gameID)
				.then(() => {
					location.href = '/?gameID=' + gameID;
				});
		}

		// ...otherways check if the game exists and active
		else {
			const gameRef = child(ref(getDatabase(app)), 'games/' + gameID);
			get(child(gameRef, '/status')).then(snapshot => {
				if (snapshot.exists()) {
					const gameStatus = snapshot.val();
					switch (gameStatus) {
						case "New": // new game - Ok
							resolve(gameID);
							break;
						default: // something wrong
							alert("Неизвестный статус игры");
							reject();
					}
				}
				else {
					alert("Такой игры не существует");
					location.href = '/';
					reject();
				}
			})
		}
	});
}

export { getGameID, gameID }