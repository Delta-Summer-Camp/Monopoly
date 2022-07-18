/*
*
*	Player preparation: choose the token, init the chat, etc.
*
*/
import { getDatabase, ref, set, onValue, child, get, update } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-database.js";
import { app } from "./initFirebase.mjs";
import { gameAssets, moneySet } from "./assets.mjs";

function initPlayer(gameID, player) {
	console.debug("initPlayer()");
	// Create modal dialog 'Choose Token', manage this process, store tokens state in database at the end
	// Returns in promise 'player' object
	return new Promise((resolve, reject) => {
		console.debug("initPlayer(): promise started");
		if (player && player.token) {
			console.debug("initPlayer(): resolved, player already has token");
			resolve(player);
		}

		// if the player in not registered yet
		if (!player) player = {status: "New"}; // ToDo: we need to store this status to database

		// build modal dialog
		let modalWrapperNode = $("#modalWrapper");
		if (modalWrapperNode.length) modalWrapperNode.remove();

		let chooseTokenDialog =
		"<div id='chooseTokenDialog'>" +
			"<h1>Выбери себе фишку:</h1>" +
			"<div id='tokens'>";

		const tokens = gameAssets.tokens;
		let freeTokens = 0; // Will count available tokens
		for (const token in tokens) {
			chooseTokenDialog +=
				"<div class='token' id='" + token + "'>" +
				"<img src='img/tokens/" + token + ".png' alt='" + tokens[token].title + "'>" +
				"</div>";
			if (tokens[token].available) ++freeTokens;
		}

		if (!freeTokens) {
			console.debug("initPlayer(): rejected: Не осталось свободных фишек! :(");
			reject("Не осталось свободных фишек! :(");
		}

		chooseTokenDialog +=
			"</div>" +
		"</div>";

		modalWrapperNode = $("<div class='modal' id='modalWrapper'></div>");
		modalWrapperNode.append(chooseTokenDialog);
		$("body").append(modalWrapperNode);

		// manage tokens
		const tokensRef = child(ref(getDatabase(app)), 'games/' + gameID + '/assets/tokens');
		const offListener = onValue(tokensRef, snapshot => {
			if (snapshot.exists) {
				const tokens = snapshot.val();

				for (const token in tokens) {
					const tokenNode = $("#" + token);
					if (!tokens[token].available) {
						tokenNode.addClass('used');
					} else {
						tokenNode
							.hover(
								()=>{
									tokenNode.addClass("focused");
								},
								()=>{
									tokenNode.removeClass("focused");
								})
							.on('click', ()=>{
								offListener();
								update(child(tokensRef, token), {available: false});

								player.token = token;
								player.assets = {money: moneySet};
								$("#modalWrapper").remove();
								console.debug("initPlayer(): resolved, player has chosen token");
								resolve(player);
							})
					}
				}
			}
			else {
				console.debug("initPlayer(): rejected: Возникла ошибка в модуле выбора фишки!")
				reject("Возникла ошибка в модуле выбора фишки!");
			}
		})
	});
}

export { initPlayer };