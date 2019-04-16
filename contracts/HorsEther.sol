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
        bool paidOut;
        uint expireTime; //minutes
        uint numOfBets;
    }

    struct Bet {
        address payable bettorAddr;//bettor address
        bool rewarded; // if true, person already has been rewarded
        uint horseNum; //horse on which better is betting
        uint betAmount; //amount they bet
    }

    function init() public{
        createRace();
    }

    uint numOfRaces;
    string[] horseNames = ["horse1","horse2","horse3","horse4","horse5"];

    //bet amount on horse
    mapping(uint => Race) public races; //race array
    mapping(uint=> Horse) public horseInfo;
    event ChooseWinner(string _horseName );

    function createRace() public {
        uint raceId;
        raceId= numOfRaces++;
        for(uint i=1 ; i<6; i++){
            races[raceId].horses.push(Horse(i, horseNames[i-1]));
            horseInfo[i]= Horse(i, horseNames[i-1]);
        }
        races[raceId].paidOut= false;
        races[raceId].expireTime= now + 5 minutes;
        races[raceId].numOfBets=0;
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


    //check if the bettor exist in the race already
    //get the race based in raceId
    //add bettor to the race and add horsesInfo to the race
    //add amount
    function createBet(uint _horseNumber, uint _raceId, uint _amount) public payable{
        require(!checkBettorExists(msg.sender, _raceId),
            "Cannot bet on same horse more than once");
        require(msg.value >= _amount,
            "Bet amount must be equal or less than sent amount");
        require(races[_raceId].expireTime <= 0, "Race has been expired");

        Race storage r= races[_raceId];
        r.bets.push(Bet(msg.sender, false, _horseNumber, _amount));
        r.numOfBets +=1;
    }

    //check if the bettor has already participated in betting for specific race
    function checkBettorExists(address bettor, uint raceId) public view returns(bool){
        Race storage r= races[raceId];
        for(uint i = 0; i < r.bets.length; i++){
            if(r.bets[i].bettorAddr == bettor) return true;
        }
        return false;
    }

    //gets valid races
    function getValidRaceIds() public view returns (uint[] memory){
        uint[] memory raceIds;

        for (uint i = 0; i < numOfRaces; i++) {
            Race storage race = races[i];
            if(race.paidOut== false && race.expireTime <= 0){
                raceIds[i] = race.raceId;
            }

            return raceIds;
        }
    }

    //TODO call when time expires ****
    function chooseWinner(uint raceId) public returns (uint){
        //
        Race storage race= races[raceId];
        uint winningHorse;
        //**** chooe winner
        winningHorse= 3;// TODO need to add random number
        emit ChooseWinner( horseInfo[winningHorse].horseName);
        return winningHorse;
    }

    function payOutWinners(uint winningHorse, uint raceId ) public payable{
        Race memory race= races[raceId];
        for(uint i=0; i< race.numOfBets; i++){
            Bet memory bet= race.bets[i];
            if(bet.horseNum == winningHorse){
                uint winningAmt = ((bet.betAmount * horseNames.length) - ((bet.betAmount * horseNames.length) /10));
                bet.bettorAddr.transfer(winningAmt);
                bet.rewarded= true;
            }
        }
        race.paidOut= true;
    }




}
