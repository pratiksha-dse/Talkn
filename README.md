# ChildFly 

# Theme
Blockchain

# About the Project
We plan to build a couple of versions of ChildFly, one for the people to report and the other for the administration to monitor the reports and distribute ethers. The entire interactive front-end of the website will be built using ReactJs, while the backend will be in Node Js, MongoDB. Ganache and Metamask will be used to generate and manage test ethers and Solidity for writing code responsible for managing transfer of ethers.

# Tech Stack - MERN, Blockchain- Solidity, Ganache
- Front-end - ReactJS
- Database - MongoDB Atlas
- Back-end - NodeJS (ExpressJS)
- Google API used for GSignIn
- Blockchain- Solidity, Ganache

# Installing Packages

    > npm install
    > cd client
    > npm install
    
    Also add a config.env file in the root directory with the format:
    MONGODB = "<MONGODB_URL>"

# Development Mode
    - Terminal 1 (Back-End)
    > nodemon app.js
    - Terminal 2 (Front-End)
    > cd client
    > npm start

# Blockchain- Metamask Account Setup

Set up Metamask account  by adding chrome extension from the following link:
https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en 
Download and set up Ganache from the following address:
https://trufflesuite.com/ganache/ 

Open Ganache, select QuickStart, once the accounts are displayed click on the key icon of the first account and copy the private key of that account.

Now sign into Metamask and add Ganache as a test network in place of Ethereum Mainnet.

Next select  import account option  and paste the private account key at the designated place copied from Ganache. Click on import, now the admin account is hooked up with ganache and contains 100 test ethers.


