// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract NFT is ERC721URIStorage {
    // Counters: 计数器,123456...
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    address contractAddress;

    constructor(address marketPlaceAddress) ERC721('Zgnb', 'ZG') {
        contractAddress = marketPlaceAddress;
    }

    function mintToken(string memory url) public returns(uint) {
        _tokenIds.increment();
        uint newTokenId = _tokenIds.current();
        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, url);
        setApprovalForAll(contractAddress, true);
        return newTokenId;
    }
}