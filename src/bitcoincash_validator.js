var cashaddr = require('cashaddrjs');

var isValidP2PKHandP2SHAddress = require('./crypto/p2pkh_p2sha');

function decodeCashAddressWithPrefix(address, networkType) {
    try {
        var decoded = cashaddr.decode(address)
        if (decoded.prefix === 'bitcoincash') {
            return networkType === 'prod' || networkType === 'both';
        }
        return networkType === 'testnet' || networkType === 'both';
    } catch (e) {
    }
    return false;
}

var DEFAULT_NETWORK_TYPE = 'prod';

function validateCashAddr(address, networkType) {
    var networkType = networkType || DEFAULT_NETWORK_TYPE;

    if (address.indexOf(':') !== -1) {
        return decodeCashAddressWithPrefix(address, networkType);
    } else {
        var prefixes = ['bitcoincash', 'bchtest', 'bchreg'];

        for (var i = 0; i < prefixes.length; ++i) {
            if (decodeCashAddressWithPrefix(prefixes[i] + ':' + address, networkType)) {
                return true;
            }
        }

        return false;
    }
}

module.exports = {
    isValidAddress: function (address, currency, networkType) {
        return isValidP2PKHandP2SHAddress(address, currency, networkType) || validateCashAddr(address, networkType);
    }
};
