/*
*
*  infoPanel server
*  - info panel is attached to #infoWrapper node (defined in INFO_WRAPPER constant)
*
*/

const INFO_WRAPPER = "#infoWrapper";

import { myUID } from "./auth.mjs";
import { app } from "./initFirebase.mjs";
import { gameID } from "./getGameID.mjs";
import { getDatabase, ref, onValue, child } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-database.js";

let players = null;
let detach = null;

function initInfoPanel() {
    console.debug("initInfoPanel started");

    // create html node
    console.debug("initInfoPanel: create node");
    $(INFO_WRAPPER).append($('<div id="infoPanel"></div>'));

    // set listener
    if (detach) detach();
    detach = onValue(child(ref(getDatabase(app)), `games/${gameID}/players`), snapshot => {
        console.debug("infoPanel: playersRef")
        if(!snapshot.exists) return;
        players = snapshot.val();

        console.debug("initInfoPanel: update");
        if (!players) return;

        const node = $("#infoPanel");
        node.empty();
        //ToDo: sort cards if the playing order was already defined
        for (const player in players) {
            const token = (players[player].token) ? players[player].token : "unknown";
            const nickname = (players[player].nickname) ? players[player].nickname : "";
            const status = (players[player].status) ? players[player].status : "";
            const html =
                '<div class="player_card">\n' +
                '   <div class="player_image_wrapper">\n' +
                '       <img src="img/tokens/' + token + '.png" alt="' + token + '_token">\n' +
                '   </div>\n' +
                '   <div class="player_info">\n' +
                '       <h3 class="player_name">' + nickname + '</h3>\n' +
                '       <p class="player_status">' + status + '</p>\n' +
                '   </div>\n' +
                '</div>';
            const playerNode = $(html);
            if (player === myUID) playerNode.addClass('myself');
            node.append(playerNode);
        }
    });
}

export { initInfoPanel }