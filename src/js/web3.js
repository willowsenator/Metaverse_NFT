import abi from "../abi/abi.json" assert {type: "json"};

// SC: 0x5a0c8772782b116ac271d559c7eFE4C50E86322D

let contract;
let account;
let totalSupply;

const blockchain = new Promise((res, err) => {
    // Metamask is not available
    if (typeof window.ethereum == undefined) {
        err("You should install Metamask");
    }

    // Instance Web3
    let web3 = new Web3(window.ethereum);

    contract = new web3.eth.Contract(abi, "0x34424C79574A9748458eE7Df5d97d1cA7B45fdeA");


    web3.eth.getAccounts().then((accounts) => {
        account = accounts[0];

        // Get my Metamask address
        console.log("-> My account is: ", account);

        // Get current supply of NFT Token
        contract.methods.getTotalSupply().call({from: account}).then((supply) => {
            totalSupply = supply;
            console.log("-> Current supply of NTF Token: ", supply);
        });

        // Get MaxSupply of NFT Token
        contract.methods.maxSupply().call({from: account}).then((maxSupply) => {
            console.log("-> Max supply of NTF Token: ", maxSupply);
        });

        // Get your own buildings in the Metaverse
        contract.methods.getOwnerBuildings().call({from: account}).then((buildings) => {
            console.log("-> Your buildings: ", buildings);
        })

        // Get all the buildings in the metaverse
            contract.methods.getBuildings().call({from: accounts[0]}).then((data) => {
                res({supply: totalSupply, buildings: data});
            });
    } );
});

export default blockchain;


function mint(nft_name, width, height, depth, x, y, z){
    contract.methods.mint(nft_name, width, height, depth, x, y, z).send({from: account}).then(data=>{
       console.log("NFT available in the Metaverse!!");
    });
}

export {mint};