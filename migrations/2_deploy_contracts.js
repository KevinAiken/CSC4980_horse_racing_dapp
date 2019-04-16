const MyStringStore = artifacts.require("MyStringStore");
const HorsEther = artifacts.require("HorsEther");

module.exports = function(deployer) {
    deployer.deploy(MyStringStore);
    deployer.deploy(HorsEther);
};