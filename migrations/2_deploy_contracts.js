const HorsEther = artifacts.require("HorsEther");

module.exports = function(deployer) {
    deployer.deploy(HorsEther);
};