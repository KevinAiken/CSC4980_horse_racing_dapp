pragma solidity ^0.5.0;

contract HorsEther {

    struct Horse{
        uint horseNumber;
        byte32 horseName;
    }

    struct Race {
        uint raceId;
        Horse[] horses;
        Bet[] bets;
        uint numOfBets;
        mapping(address => Bet) betsInfo;
    }

    struct Bet {
        address bettorAddr;//bettor address
        bool rewarded; // if true, person already has been rewarded
        uint horseNum; //horse on which better is betting
        uint betAmount; //amount they bet
    }
    //get list of races, check evaluated? expires
    //valid races
    uint numOfRaces;

    mapping(uint => Horse) public horsesInfo; //bet amount on horse
    mapping(uint => Race) public races; //race array


    function createRace() public {
        Horse[] storage _horses;
        _horses.push(Horse(1,"Horse1"));
        Bet[] storage _bets;
        raceId= numOfRaces++;
        races[raceId] = Race(_bets, _horses);
    }

    //check if the bettor exist in the race already
    //get the race based in raceId
    //add bettor to the race and add horsesInfo to the race
    //add amount
    function createBet(uint _horseNumber, uint raceId, uint amount) public payable{
        require(!checkBettorExists(msg.sender));
        require(msg.value >= amount);
        Race storage r= races[raceId];
        r.bets[r.numOfBets++]= Bet(msg.sender, false, _horseNumber, amount);
        horsesInfo[_horseNumber] += msg.value;
        r.horses.push(horsesInfo);
    }

    //check if the bettor has already participated in betting for specific race
    function checkBettorExists(address bettor, uint raceId) public view returns(bool){
        Race storage r= races[raceId];
        for(uint i = 0; i < r.bettorsInfo.length; i++){
            if(r.bettorsInfo[i].addr == bettor) return true;
        }
        return false;
    }

}
