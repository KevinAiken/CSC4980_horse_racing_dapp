pragma solidity ^0.5.0;

contract HorsEther {
    uint numOfRaces= 0;
    string[] horseNames = ["horse1","horse2","horse3","horse4","horse5"];

    struct Horse{
        uint horseNumber;
        string horseName;
    }

    struct Race {
        uint raceId;
        Horse[] horses;
        Bet[] bets;
        bool paidOut;
        bool isExpired;
        uint numOfBets;
    }

    struct Bet {
        address payable bettorAddr;//bettor address
        bool rewarded; // if true, person already has been rewarded
        uint horseNum; //horse on which better is betting
        uint betAmount; //amount they bet
    }

    //bet amount on horse
    mapping(uint => Race) public races; //race array
    mapping(uint=> Horse) public horseInfo;
    event ChooseWinner(string _horseName );

    function createRace() public {
        uint raceId;
        numOfRaces++;
        raceId= numOfRaces;
        for(uint i=1 ; i<6; i++){
            races[raceId].horses.push(Horse(i, horseNames[i-1]));
            horseInfo[i]= Horse(i, horseNames[i-1]);
        }
        races[raceId].paidOut= false;
        races[raceId].isExpired= false;
        races[raceId].numOfBets=0;

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
        // require(races[_raceId].isExpired == false, "Race has been expired");

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

    //call when race set as hasExpired
    function chooseWinner(uint raceId) public returns (uint){
        //
        Race storage race= races[raceId];
        uint winningHorse;
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

    //return raceIds that are still going on - not expired and not paidOut
    function getValidRaceIds() public returns (uint[] memory){
        uint[] memory validRaces= new uint[](numOfRaces);
        uint index=0;

        for (uint i = 1; i <= numOfRaces; i++) {
            if( races[i].paidOut== false && races[i].isExpired == false){
                validRaces[index]= i;
                index++;
            }
        }
        return validRaces;
    }

    //expired but not paidOut
    function getRacesNotPaidOut() public returns (uint[] memory){
        uint[] memory notPaidOut= new uint[](numOfRaces);
        uint index=0;
        for (uint i = 1; i <= numOfRaces; i++) {
            if( races[i].paidOut== false && races[i].isExpired == true){
                notPaidOut[index]= i;
                index++;
            }
        }
        return notPaidOut;
    }

    //can only be set by Admin
    function setAsExpired(uint _raceId) public{
        races[_raceId].isExpired= true;
    }

}
