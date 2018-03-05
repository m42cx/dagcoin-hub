var db = require('byteballcore/db');
var conf = require('byteballcore/conf');
var eventBus = require('byteballcore/event_bus.js');
var https = require('https');
var log4js = require('log4js');
log4js.configure({
    appenders: { notification: { type: 'file', filename: 'notification.log' } },
    categories: { default: { appenders: ['notification'], level: 'debug' } }
});
const loggerNotification = log4js.getLogger('notification');

loggerNotification.info("Started");

eventBus.on('peer_sent_new_message', function(ws, objDeviceMessage) {
    var iv  = objDeviceMessage.encrypted_package ? objDeviceMessage.encrypted_package.iv : 'undefined';
    // loggerNotification.info(ws ? JSON.stringify(ws) : 'ws null');
    // loggerNotification.info("PEER SENT NEW MESSAGE To: " + objDeviceMessage.to + " iv: " + iv);
    if  (objDeviceMessage.to === '0W7LISTIP6NFJUK4VEQTMV74RERBNNIS7') {
	    loggerNotification.info("PEER SENT NEW MESSAGE: " + JSON.stringify(objDeviceMessage));
    }
    sendPushAboutMessage(objDeviceMessage.to);
});

eventBus.on('new_my_transactions', function(units) {
    loggerNotification.info("NEW TRANSACTION units: " + units);
    // sendPushIncomingTransaction(objDeviceMessage.to);
});

eventBus.on("incomingTransaction", function(xxxx) {
    loggerNotification.info("INCOM :" + xxxx);
});

eventBus.on("enableNotification", function(deviceAddress, registrationId) {
    db.query("SELECT device_address FROM push_registrations WHERE device_address=? LIMIT 0,1", [deviceAddress], function(rows) {
        if (rows.length === 0) {
            db.query("INSERT "+db.getIgnore()+" INTO push_registrations (registrationId, device_address) VALUES (?, ?)", [registrationId, deviceAddress], function() {
                loggerNotification.info("NOTIFICATION ENABLED DevAddress/RegId: " + deviceAddress + " / " + registrationId);
                // sendRest([registrationId], 'Your notification is enabled');
            });

        } else if (rows.length) {
            if (rows[0].registration_id !== registrationId) {
                db.query("UPDATE push_registrations SET registrationId = ? WHERE device_address = ?", [registrationId, deviceAddress], function() {
                    loggerNotification.info("NOTIFICATION UPDATED DevAddress/RegId: " + deviceAddress + " / " + registrationId);
                    // sendRest([registrationId], 'Your notification is updated');
                })
            }
        }
    });
});

eventBus.on("disableNotification", function(deviceAddress, registrationId) {
    db.query("DELETE FROM push_registrations WHERE registrationId=? and device_address=?", [registrationId, deviceAddress], function() {
    	loggerNotification.info("NOTIFICATION DISABLED DevAddress/RegId: " + deviceAddress + " / " + registrationId);
    });
});

function sendRest(registrationIds, message, type) {
    var options = {
        host: 'android.googleapis.com',
        port: 443,
        path: '/gcm/send',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'key=' + conf.pushApiKey
        }
    };

    var req = https.request(options, function(res) {
        res.on('data', function(d) {
            if (res.statusCode !== 200) {
                loggerNotification.error('Error push rest. code: ' + res.statusCode + ' Text: ' + d);
                loggerNotification.error('RegIds:' + JSON.stringify(registrationIds));
            }
        });
    });
    req.write(JSON.stringify({
        "registration_ids": registrationIds,
        "data": {
            "message": message,
            "title": "Dagcoin",
            "vibrate": 1,
            "sound": 1,
	    "type": !type ? '' : type
        }
    }));
    req.end();

    req.on('error', function(e) {
        loggerNotification.error(e);
    });
}

function sendPushAboutMessage(device_address) {
    db.query("SELECT registrationId FROM push_registrations WHERE device_address=?", [device_address], function(rows) {
        if (rows.length > 0) {
            sendRest([rows[0].registrationId], "New message", "msg");
        }
    });
}

function sendPushIncomingTransaction(device_address) {
    db.query("SELECT registrationId FROM push_registrations WHERE device_address=?", [device_address], function(rows) {
        if (rows.length > 0) {
            sendRest([rows[0].registrationId], "Incoming transaction");
        }
    });
}

exports.sendPushAboutMessage = sendPushAboutMessage;
exports.sendPushIncomingTransaction = sendPushIncomingTransaction;
