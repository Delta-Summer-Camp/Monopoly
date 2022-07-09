/*
*
*	Getting gameID from URL or form or create new game
*	Exports the function returning new promise
*
*/
import { app } from "./initFirebase.mjs";
import { myUID } from "./auth.mjs";
import { createNewGame } from "./createNewGame.mjs";
import { getDatabase, ref, set, child, get } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-database.js";

let gameID = null;

function getGameID() {
	console.debug("getGameID()");
	return new Promise((resolve, reject) => {
		console.debug("getGameID(): promise started");
		// read URL Params
	    const params = new URLSearchParams(location.search.substring(1));
	    gameID = parseInt(params.get("gameID"), 10);

	    // if there are no parameters in URL
	    if (!gameID) {
			gameID = prompt("Введи идентификатор игры чтобы присоединиться\n" +
				"или ноль, для того, чтобы начать новую игру:", 0);

			// new game
			if (parseInt(gameID) === 0) {
				gameID = Date.now();

				createNewGame(gameID).then(() => {
					console.debug("getGameID(): change location to /?gameID=" + gameID);
					location.href = '/?gameID=' + gameID;
				});
			} else {
				console.debug("getGameID(): change location to /?gameID=" + gameID);
				location.href = '/?gameID=' + gameID;
			}
		}

	    // we have gameID - let's check it
	    else {
	    	const gameRef = child(ref(getDatabase(app)), 'games/' + gameID);
	    	get(child(gameRef, '/status')).then(snapshot => {
				console.debug("getGameID(): get(gameRef/status)");
				if (snapshot.exists()) {
	    			const gameStatus = snapshot.val();
	    			switch (gameStatus) {
	    				case "New":
							console.debug("getGameID(): resolved: gameID=" + gameID);
							resolve(gameID);
   				 		    break;
			 		    default: // can't get game status
							console.debug("getGameID(): rejected: Неизвестный статус игры");
							reject("Неизвестный статус игры");
	    			}
	    		}
	    		else { // something wrong
					console.debug("getGameID(): rejected: Такого идентификатора игры не существует");
	 		    	reject("Такого идентификатора игры не существует");
	    		}
	    	});
	    }
	});
}

export { getGameID, gameID };
