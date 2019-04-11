var Race = artifacts.require("./Race.sol");
var Purchase = artifacts.require("./Purchase.sol");

module.exports = function(deployer) {
    deployer.deploy(Race);
    deployer.deploy(Purchase);
};