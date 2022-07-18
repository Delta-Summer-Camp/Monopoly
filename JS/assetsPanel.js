/*
*
*  assetsPanel server
*  - assets panel is attached to #assetsWrapper node (defined in ASSETS_WRAPPER constant)
*
*/

const ASSETS_BLOCK = "#assetsBlock";
const CASH_BLOCK = "#cashBlock";

import { myUID } from "./auth.mjs";
import { app } from "./initFirebase.mjs";
import { gameID } from "./getGameID.mjs";
import { getDatabase, ref, onValue, child } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-database.js";

let detach = null;

function initAssetsPanel() {
    console.debug("initAssetsPanel started");

    // set listener
    if (detach) detach();
    detach = onValue(child(ref(getDatabase(app)), `games/${gameID}/players/${myUID}/assets`), snapshot => {
        console.debug("initAssetsPanel: onValue(.../assets)")

        if(!snapshot.exists) return;
        const assets = snapshot.val();
        if (!assets) return;

        // manage cash panel
        for (const banknote in assets.money) {
            $(`${CASH_BLOCK} #quantity-${banknote}`).text(assets.money[banknote]);
        }

        // ToDo: manage properties and chances block
    });
}

export { initAssetsPanel }