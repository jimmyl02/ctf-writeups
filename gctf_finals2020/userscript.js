// ==UserScript==
// @name         Google CTF terminal wrapper
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Interact with terminals
// @author       Jimmy
// @match        http://dev.jmy.li
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function hex2a(hex) {
        var str = '';
        for (var i = 0; i < hex.length; i += 2) {
            var v = parseInt(hex.substr(i, 2), 16);
            if (v) str += String.fromCharCode(v);
        }
        return str;
    }

    const controlSocket = new WebSocket('wss://remote-js.gnk.io/c?key=9fo2c7cfg9pyhwk19yk1y0r0bll3v9dl');

    function log(msg){
        if(controlSocket.readyState == WebSocket.OPEN){
            controlSocket.send(JSON.stringify(msg));
        }
    }

    controlSocket.addEventListener('open', _event => {
        console.log('log socket connected');
    });

    controlSocket.addEventListener('message', event => {
        let receivedData;
        try{
            receivedData = JSON.parse(event.data.split(': ')[1]);
        }catch(e){
        }
        if(!receivedData) return;
        if(receivedData.type == 'terminal'){
            const terminalName = receivedData.terminalName;
            const sendData = receivedData.sendData;

            const prev_textToHex = utils.textToHex;
            utils.textToHex = function(text){
                return text
            };
            // if data is coming from the websocket, it must be hexlified
            globals.game.terminals.get(terminalName).inputCb(sendData);
            utils.textToHex = prev_textToHex;
            console.log('data sent to terminal ' + terminalName);
        }
    });

    let prev_onMessage = main.wsOnMessage;
    main.wsOnMessage = function(event){
        const msg = JSON.parse(event.data);
        prev_onMessage(event);
        if(msg.type == 'terminal'){
            if(msg.eventType == 'data'){
                let logMessage = {'type': 'terminal', 'challengeID': msg.challengeID, 'data': hex2a(msg.data), 'b64data': btoa(hex2a(msg.data))};
                log(logMessage);
            }else{
                log(msg);
            }
        }
    };
    let tmpprev_send = main.wsOnSend;
    main.wsOnSend = function(msg) {
    console.log(msg);
        tmpprev_send(msg);
    };
})();
