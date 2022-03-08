import abi from "./abi/abi.json" assert {type: "json"};

// SC: 0x5a0c8772782b116ac271d559c7eFE4C50E86322D

const blockchain = new Promise((res, err) =>{
    // Metamask is not available
    if(typeof window.ethereum == undefined){
        err("You should install Metamask");
    }

    // Instance Web3
    let web3 = new Web3(window.ethereum);
    let contract = new web3.eth.Contract(abi, "0x34424C79574A9748458eE7Df5d97d1cA7B45fdeA");

    // Get my Metamask address
    web3.eth.getAccounts().then((accounts)=>{
        console.log("-> My account is: ", accounts[0]);
    } );


    // Get current supply of NFT Token
    web3.eth.getAccounts().then((accounts)=>{
        contract.methods.getTotalSupply().call({from: accounts[0]}).then((supply) =>{
            console.log("-> Current supply of NTF Token: ", supply);
        })
    } );


    // Get MaxSupply of NFT Token
    web3.eth.getAccounts().then((accounts)=>{
        contract.methods.maxSupply().call({from: accounts[0]}).then((maxSupply) =>{
            console.log("-> Max supply of NTF Token: ", maxSupply);
        })
    } );

    // Get your own buildings in the metaverse
    web3.eth.getAccounts().then((accounts)=>{
        contract.methods.getOwnerBuildings().call({from: accounts[0]}).then((buildings) =>{
            console.log("-> Your buildings: ", buildings);
        })
    } );


    // Get all the buildings in the metaverse
    web3.eth.getAccounts().then((accounts)=>{
        contract.methods.getTotalSupply().call({from: accounts[0]}).then((supply) =>{
           contract.methods.getBuildings().call({from: accounts[0]}).then((data)=>{
               res({supply: supply, buildings: data});
           });
        });
    } );
});

export default blockchain;