import { auth } from "./auth.mjs";
import { getGameID } from "./getGameID.mjs";
import { setListeners } from "./setListeners.mjs";
import { initGame } from "./initGame.mjs";

auth()
	.then(getGameID)
	.then(initGame)
	.then(setListeners)
	.then(manageGame)
	.catch(reason => {
		alert(reason);
		location.href = "/";
	});


function manageGame(param) {
	 alert ("initGame now!\r" + param); 
}