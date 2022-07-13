/*
*
*  infoPanel server
*
 */

import { myUID } from "./auth.mjs";
import { app } from "./initFirebase.mjs";
import { gameID } from "./getGameID.mjs";
import { getDatabase, ref, set, onValue, child, get } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-database.js";

let players = null;
let detach = null;

const infoPanel = {
    // creates the InfoPanel node and set the listener
    getNode: function () {
        console.debug("infoPanel: getNode()");

        // create html node
        console.debug("InfoPanel: create node");
        let node = $('<div id="infoPanel"></div>');

        // set listener
        if (detach) detach();
        const dbRef = ref(getDatabase(app));
        const playersRef = child(dbRef, `games/${gameID}/players`);
        detach = onValue(playersRef, snapshot => {
            console.debug("infoPanel: playersRef")
            if(!snapshot.exists) return;
            players = snapshot.val();
            this.update();
        })
        return node;
    },

    // Update the InfoPanel
    update: function () {
        console.debug("infoPanel: update()");

        if (!players) return;

        let node = $("#infoPanel");
        node.empty();
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
    }
}

export { infoPanel }