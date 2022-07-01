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
	return new Promise((resolve, reject) => {
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
					location.href = '/?gameID=' + gameID;
				});
			} else {
				location.href = '/?gameID=' + gameID;
			}
		}

	    // we have gameID - let's check it
	    else {
	    	const gameRef = child(ref(getDatabase(app)), 'games/' + gameID);
	    	get(child(gameRef, '/status')).then(snapshot => {
	    		if (snapshot.exists()) {
	    			const gameStatus = snapshot.val();
	    			switch (gameStatus) {
	    				case "New": 
   				 		    resolve(gameID);
   				 		    break;
			 		    default: // can't get game status
			 		    	reject("Неизвестный статус игры");
	    			}
	    		}
	    		else { // something wrong
	 		    	reject("Такого идентификатора игры не существует");
	    		}
	    	});
	    }
	});
}

export { getGameID, gameID };
