import { app } from "./initFirebase.mjs";
import { auth } from "./auth.mjs";

auth(app)
	.then(initGame);


function initGame(param) {
	alert("initGame now!\n" + param);
}
