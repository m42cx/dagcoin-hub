/*jslint node: true */
"use strict";

exports.clientName = 'dagcoin';
exports.minClientVersion = '1.4.5';

// https://console.developers.google.com
exports.pushApiProjectNumber = 0;
exports.pushApiKey = '';

exports.port = 26611;
exports.getUnitPort = 28952;

//exports.myUrl = 'wss://mydomain.com/bb';
exports.bServeAsHub = true;
exports.bSaveJointJson = true;
exports.bLight = false;

// this is used by wallet vendor only, to redirect bug reports to developers' email
exports.bug_sink_email = 'admin@example.org';
exports.bugs_from_email = 'bugs@example.org';

exports.HEARTBEAT_TIMEOUT = 300*1000;

exports.storage = 'sqlite';

exports.paymentApi = 'https://testnetexplorer.dagcoin.org/mocks/getPaymentById?paymentId=';

exports.MERCHANT_INTEGRATION_API = 'https://api.dagpay.io/api/invoices';

exports.initial_witnesses = [
	'2VJOB2VQQZ4R5TBHUJGIN43HTS73JTZH',
    'BBM4ZVFQA3ORAHUFEG4XGT6DOV2JPL2R',
    'IJRCQHPSYPPLEXJNK4LVZ5H3QYG6Z2EG',
    'NDXC6TDJPRYPS6QJXXPIQGOYRXRLHUSZ',
    'SGH3I2FEPKW5BYOU6BLQBDE5MGXGMIMY',
    'TVUUXCILVJGDHJGMJYKA7LP5D6ZIFV37'
];

exports.initial_peers = [
];

console.log('finished hub conf');
