// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// zeppeling imports
import "@openzeppelin/contracts@4.5.0/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.5.0/access/Ownable.sol";
import "@openzeppelin/contracts@4.5.0/utils/Counters.sol";

// Address: 0x7B7c04e25433801B8306C48889F9a112532d4A11


//Creation Metaverse Smart Contract with NFT Tokens
contract Metaverse is ERC721, Ownable{
    // Constructor
    constructor() ERC721("META","OMCLAR"){
        
    }

    // Counters to regulate the amount of NFT Token minted
    using Counters for Counters.Counter;
    Counters.Counter private supply;

    // Total NFT Tokens
    uint256 public maxSupply = 100;


    // Cost NFT Token
    uint256 public cost = 0.1 ether;


    // NTFS Owners
    mapping (address => Building[]) NFTOwners;

    // Metaverse Building
    struct Building{
        string name;
        uint8 w;
        uint8 h;
        uint8 d;
        int8 x;
        int8 y;
        int8 z;
    }

    // Array of Metaverse buildings
    Building[] public buildings;

    // Get Buildings of Metaverse    
    function getBuildings() public view returns (Building[] memory){
        return buildings;
    }

    // Get total Supply
    function getTotalSupply() public view returns(uint256){
        return supply.current();
    }

    // Mint NFT Metaverse token
    function mint(string memory _name, uint8 _w, uint8 _h, uint8 _d, int8 _x, int8 _y, int8 _z) public payable {
        require(supply.current() <= maxSupply, "MAX supply reached!!");
        require(msg.value >= cost, "Insuficient funds!!");
        
        supply.increment();
         _safeMint(msg.sender, supply.current());
         Building memory _newBuild = Building(_name, _w, _h, _d, _x, _y, _z);
         buildings.push(_newBuild);
         NFTOwners[msg.sender].push(_newBuild);
    }

    // Getpaid NFTs Metaverse
    function withdraw() external payable onlyOwner{
        address payable _owner = payable(owner());
        _owner.transfer(address(this).balance);
    }

    // Get Owner Buildings
    function getOwnerBuildings() public view returns(Building[] memory){
        return NFTOwners[msg.sender];
    }
}

