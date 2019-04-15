const Race = artifacts.require("./Race.sol");
const Purchase = artifacts.require("./Purchase.sol");
const Mortal = artifacts.require("./Mortal.sol");
const Greeter = artifacts.require("./Greeter.sol");
const MyStringStore = artifacts.require("MyStringStore");


module.exports = function(deployer) {
    deployer.deploy(Race);
    deployer.deploy(Purchase);
    deployer.deploy(Mortal);
    deployer.deploy(Greeter, "Hello world");
    deployer.deploy(MyStringStore);
};