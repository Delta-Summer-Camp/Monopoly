import { app } from "./initFirebase.mjs";
import { auth } from "./auth.mjs";
import { getGameID } from "./getGameID.mjs";
import { initGame } from "./initGame.mjs";

auth(app)
	.then(getGameID)
	.then(initGame)
	.then(nextStep);


function nextStep(param) {
	alert("Next step now!\n" + param);
}
