# 🏇 Horseether

## What is Horseether?
An application for you and your friends to bet on horse races on the Blockchain with Ethereum!

## 💯 Project facts
* Developed by Alexander Mitchell, Kevin Aiken, Jenny Choi, Kevin Luna, and Aarohi Savaliya.

## 🏎 Getting up and Running

> You can access this program by cloning the repo to your local machine via SSH.

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
..* Create a workspace in Ganache and enter your Metamask mneumonic in the "Accounts & Keys" section
* Click on Metamask icon and click on the tab that says "Main Ethereum Network" and select "Custom RPC".
* In the box titled "New RPC URL" (to the right of "New Network") enter http://127.0.0.1:7545 and click Save.

6. Start the application
```BASH 
> We are in the app folder
$ npm start
```

7. Navigate to your application and enjoy!


## How to play
1. Click the button to begin
2. Choose a race, a horse, and place a bet
3. You will receive money if you won and no money if you lost
4. Play again!

This section will be removed
**For developers (Us)**
1. Clone the project to your local machine


2. Check if you have node installed. If not follow the [nvm setup] (https://nodesource.com/blog/installing-node-js-tutorial-using-nvm-on-mac-os-x-and-ubuntu/)
> Do this step outside of the project

3. Navigate to your app folder and do the following command
```bash
$ npm install
```
> This will install of your needed node packages

4. Download Ganache [here] (https://truffleframework.com/ganache).
> This allows us to have our own local Blockchain.

4. Open the project in your preferred text editor.
> Make sure that your you have the proper Ethereum and Solidity tools installed.

5. Follow the instructions on the app Readme. [Here] (https://github.com/KevinAiken/CSC4980_horse_racing_dapp/tree/master/app).

6. Get to coding! 🤘

## Making contributions to the Project
We would like for each contributor to create their own branch that they have tested and push it up to master with a Pull Request once they have finished.
Once tested and approved it will be folded in master.

**For users**


## 🚶‍♀️ App walkthrough
This is where pictures and a possible screen capture of how the app works would go.





Directory layout is the same as truffle init, with a react app in ./app
