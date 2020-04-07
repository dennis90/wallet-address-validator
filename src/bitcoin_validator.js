var isValidP2PKHandP2SHAddress = require('./crypto/p2pkh_p2sha');
var segwit = require('./crypto/segwit_addr');

module.exports = {
    isValidAddress: function (address, currency, networkType) {
        return isValidP2PKHandP2SHAddress(address, currency, networkType) || segwit.isValidAddress(address, currency.segwitHrp, networkType);
    }
};
