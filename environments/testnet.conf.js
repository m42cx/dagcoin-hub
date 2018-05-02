/*jslint node: true */
"use strict";

exports.clientName = 'dagcoin-tn';
exports.minClientVersion = '1.4.5';

// https://console.developers.google.com
exports.pushApiProjectNumber = 0;
exports.pushApiKey = '';

exports.port = 26612;
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

exports.MERCHANT_INTEGRATION_API = 'https://dev-api.dagpay.io/api/invoices';

/* new testnet*/
exports.initial_witnesses = [
	'DKXEANWQQDYVTWQEJS5MBLMGGQBC5BFT',
	'Z2XQRGHWRCGDWP2DK4PIHXFEIZ3O7PRB'
];

exports.initial_peers = [
	'https://test-hub.dagcoin.org/spoon/'
];

console.log('finished hub conf');
