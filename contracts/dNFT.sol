// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyToken is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIdCounter;
      struct UserInfo{
          bool isUser;
          bool isRewarded;
          bool isRedeemed; 
          uint256 tokenId;
          string tokenURI;
      }
    mapping(address=>UserInfo) public addressToUser;
    constructor() ERC721("MyToken", "MTK") {}
    event MintLog(address indexed _from,address indexed _to, string indexed _nftURI,uint _tokenId ,string message, bool isRewarded, bool isRedeemed);
    // event UpdateLog(address indexed _from,address indexed _to, string indexed _nftURI,string message,bool isRewarded, bool isRedeemed);
    function safeMint(address to, string memory newUri, string memory message, bool _isRewarded) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId,newUri);
        addressToUser[to] = UserInfo(true,_isRewarded,false,tokenId,newUri);
        emit MintLog(msg.sender, to, newUri,tokenId,message,_isRewarded,false);
    }
    
    // The following functions are overrides required by Solidity.
    
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }
     
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
    
    function changeUserNFT(uint _tokenId,string memory newURI,string memory _msg,bool _isRewarded,bool _isRedeemed) public onlyOwner{
    _setTokenURI(_tokenId,newURI);
    addressToUser[_ownerOf(_tokenId)] = UserInfo(true,_isRewarded,_isRedeemed,_tokenId,newURI);
    emit MintLog(msg.sender,_ownerOf(_tokenId),newURI,_tokenId,_msg,_isRewarded,_isRedeemed);
    }

}

//0x389dcc98fb3DBf51012012875De6A6BEe4DdAa0b

//mind map_3 json - https://gateway.pinata.cloud/ipfs/QmYnnjkVv2i39bGM334r3eqnHGzMw4cTUsDQDA14kHs5Gd
//ultimate mind map_2 json - https://gateway.pinata.cloud/ipfs/QmbvKBYJb2Lbd1Mhu9vpMhfkgf7ecxNFiv3x1hJMPUsPpr
// / string[] IPFS_URI_1 = ["https://gateway.pinata.cloud/ipfs/QmVwrmmy89LQzBZ4hJboEjR8RpgPjcENwKw87bmP5WobV2",
    // "https://gateway.pinata.cloud/ipfs/QmcUKSi4qqGrxfQ68zi1zjm2rgQUBopm1re7r31MWqdsar",
    // "https://gateway.pinata.cloud/ipfs/QmdMi4eofMsAC6fxJf67irhN6wsxTgMAMawkysHmLhtEp1"];
    // string[] IPFS_URI_3 = ["https://gateway.pinata.cloud/ipfs/QmQ1SGH9LrHRnfPTJuPpvuUUbd1qc6yaedV382sjjNKbFX",
    // "https://gateway.pinata.cloud/ipfs/QmRg6VcEryXW6vmk4YudveZpr5rfbZBg3F63KfonmeExZd",
    // "https://gateway.pinata.cloud/ipfs/QmRSB9wCy2kwfK5p7mTimn8xuzLqbgyPmbmevMD8wpitRL"];