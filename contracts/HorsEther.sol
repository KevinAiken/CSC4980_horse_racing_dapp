pragma solidity ^0.5.0;

contract HorsEther {

    struct Horse{
        uint horseNumber;
        string horseName;
    }

    struct Race {
        uint raceId;
        Horse[] horses;
        Bet[] bets;
    }

    struct Bet {
        address payable bettorAddr;//bettor address
        bool rewarded; // if true, person already has been rewarded
        uint horseNum; //horse on which better is betting
        uint betAmount; //amount they bet
    }
    //get list of races, check evaluated? expires
    //valid races
    uint numOfRaces;
    string[] horseNames = ["horse1","horse2","horse3","horse4","horse5"];

    //bet amount on horse
    mapping(uint => Race) public races; //race array

    function createRace() public {
        uint raceId;
        raceId= numOfRaces++;
        for(uint i=1 ; i<6; i++){
            races[raceId].horses.push(Horse(i, horseNames[i-1]));
        }
    }

    //check if the bettor exist in the race already
    //get the race based in raceId
    //add bettor to the race and add horsesInfo to the race
    //add amount
    function createBet(uint _horseNumber, uint _raceId, uint _amount) public payable{
        require(msg.value >= _amount);
        Race storage r= races[_raceId];
        r.bets.push(Bet(msg.sender, false, _horseNumber, _amount));
    }

    function forceEvaluateRaceWithSpecificWinner(uint _raceIndex, uint _winningHorseIndex) public payable {
        for(uint i = 0; i < races[_raceIndex].bets.length; i++){
            Bet memory tempBet = races[_raceIndex].bets[i];
            if(tempBet.horseNum == _winningHorseIndex) {
                address payable tempAddress = tempBet.bettorAddr;
                //tempAddress.send(tempBet.betAmount*races[_raceIndex].horses.length);
                tempAddress.transfer(tempBet.betAmount*races[_raceIndex].horses.length);
            }
        }
    }

}
