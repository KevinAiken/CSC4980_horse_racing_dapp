# 🏇 Horseether

## What is Horseether?
An application for you and your friends to bet on horse races on the Blockchain with Ethereum!

## 💯 Project facts
* Developed by Kevin Aiken, Alexander Mitchell, Jenny Choi, Kevin Luna, and Aarohi Savaliya.

## Technology stack
### Frontend
1. React
2. Reacstrap
3. Drizzle

### Blockchain
1. Truffle
2. Ganache
3. Metamask
3. Solidity

## 🏎 Getting up and Running

> You can access this program by cloning the repo to your local machine.

## Project Layout
The main directory of the project contains a default layout truffle initiated Solidity project. In addition to this, in the /app folder there is a React app bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to set things up.

1. Clone the project to your local machine
```BASH 
$ git clone git@github.com:KevinAiken/CSC4980_horse_racing_dapp.git
```
> or download the zip and open the project on your local machine

2. Make sure that you have all the tools needed to use the app installed:

> How to install tools
* Metamask [app] (https://metamask.io/).
* Ganache [app] (https://truffleframework.com/ganache).
* Truffle
```BASH 
$ npm install -g truffle
```

3. Navigate to the project folder via your terminal and install all the project node modules 
```BASH 
$ cd app
$ npm install
```
 
4. Make sure that you are logged into your Metamask account.

5. Connect Ganache to your Metamask
You can see how to do this by doing the following:
* Create a workspace in Ganache and enter your Metamask mneumonic in the "Accounts & Keys" section
* Click on Metamask icon and click on the tab that says "Main Ethereum Network" and select "Custom RPC".
* In the box titled "New RPC URL" (to the right of "New Network") enter http://127.0.0.1:7545 and click Save.

6. Start the application
> We are in the app folder
```BASH 
$ npm start
```

7. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.


## How to make new races
Before you start placing bets you'll need to act as the admin and create some races to bet on. Keep on mind a race must be in the future. 
1. Navigate to [http://localhost:3000/admin](localhost:3000/admin) to view the admin panel.
2. Type in a race time in ISO 8601 format under "Race Time". After this time bettors can no longer bet on the race, and the race becomes eligible to be evaluated. What evaluation is and how to do it is covered later.
3. Enter the Admin Password, 'password'. 
4. Press create a race.
5. "Overrall Number of races" should increment.
6. Click load races below. Your race should appear in the table.


## How to evaluate a race
After a race's time passes, it becomes eligible to be evaluated. Evaluating a race runs a contract function that psuedo-randomly selected a winner, marks the race evaluated, and transfers funds to bettors following the formula (theirBetValue x numberOfHorses x .8) The other 20% is a fee to the game operator.
1. Make sure your contract is properly funded. The contract needs enough Ethereum to be able to pay out potential bets. 
2. Navigate to [http://localhost:3000/admin](localhost:3000/admin) to view the admin panel.
3. Under the create a race form there is a form for evaluating races. 
4. Enter the Race Index of the race you would like to evaluate. This number can be found by clicking "Load Races" and viewing your race in the table. The race time must be in the past.
5. Enter the Admin Password, 'password'.
6. Click "Evaluate Race". 
7. Clicking "Load Races" should refresh the races and let you see the winner and that "Race Evaluated" is now true.


## How to place a bet
1. Click the "Get Started" on the home page or navigate to [http://localhost:3000/bet](localhost:3000/bet).
2. Click "Load Races" to load races that are available to bet on.
3. Enter the number of the race you would like to bet on based on the races table.
4. Select a horse number. Horses are numbered sequentially.
5. Enter your bet amount in Ethereum. Decimal amounts are also acceptable.
6. Once a race is evaluated you will receive Ethereum if you bet on the winning horse and nothing if you bet on a losing horse.


## How to view past races
To view the results of past races go to [http://localhost:3000/past-races](localhost:3000/past-races) and click "Load Races".

## 🚶‍♀️ App walkthrough
This is where pictures and a possible screen capture of how the app works would go.
