import { app } from "./initFirebase.mjs";
import { auth } from "./auth.mjs";
import { getGameID } from "./getGameID.mjs"

auth(app)
	.then(getGameID)
	.then(nextStep);


function nextStep(param) {
	alert("Next step now!\n" + param);
}
