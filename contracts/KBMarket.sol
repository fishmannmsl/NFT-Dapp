// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

// ReentrancyGuard: 针对多请求安全性,防止重入攻击

contract KBMarket is ReentrancyGuard {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    Counters.Counter private _tokenSold;

    address payable owner;

    // 商品上架手续费
    uint256 public listingPrice = 0.045 ether;

    constructor() {
        owner = payable(msg.sender);
    }

    struct MarketItem {
        uint256 itemId;
        uint256 price;
        uint256 tokenId;
        address nftAddress;
        address payable owner;
        address payable seller;
        address creater;
        bool sold;
    }

    mapping(uint256 => MarketItem) private idToTokenItem;

    event MarketTokenMinted(
        uint256 indexed itemId,
        uint256 price,
        uint256 indexed tokenId,
        address indexed nftAddress,
        address owner,
        address seller,
        address creater,
        bool sold
    );

    // 上架物品
    function makeMarketItem(
        uint256 tokenId,
        uint256 price,
        address nftAddress
    ) public payable nonReentrant {
        require(price > 0, "Price must be at least one wei");
        require(
            msg.value == listingPrice,
            "Send value must be equal to listing price"
        );
        _tokenIds.increment();
        uint256 itemId = _tokenIds.current();
        idToTokenItem[itemId] = MarketItem(
            itemId,
            price,
            tokenId,
            nftAddress,
            payable(address(0)),
            payable(msg.sender),
            msg.sender,
            false
        );
        // 授权市场托管NFT
        // 因为在NFT合约中的铸币过程中已经调用了setApprovalForAll方法授权marketPlaceAddress
        // 所以在此无需调用
        IERC721(nftAddress).transferFrom(msg.sender, address(this), tokenId);

        emit MarketTokenMinted(
            itemId,
            price,
            tokenId,
            nftAddress,
            payable(address(0)),
            payable(msg.sender),
            msg.sender,
            false
        );
    }

    // 转卖物品
    function resellMarketItem(
        uint256 tokenId,
        uint256 price,
        address nftAddress
    ) public payable nonReentrant {
        require(price > 0, "Price must be at least one wei");
        require(
            msg.value == listingPrice,
            "Send value must be equal to listing price"
        );
        idToTokenItem[tokenId].owner = payable(address(0));
        idToTokenItem[tokenId].seller = payable(msg.sender);
        idToTokenItem[tokenId].sold = false;

        IERC721(nftAddress).transferFrom(msg.sender, address(this), tokenId);
        _tokenSold.decrement();
    }

    // 交易物品
    function createMarketSale(uint256 itemId, address nftAddress)
        public
        payable
        nonReentrant
    {
        uint256 price = idToTokenItem[itemId].price;
        require(msg.value == price, "Send value must be equal to token price");
        uint256 tokenId = idToTokenItem[itemId].tokenId;
        // 将钱转给售卖者
        idToTokenItem[itemId].seller.transfer(msg.value);
        // 调用者依然是在nftAddress已经授权的marketPlaceAddress
        IERC721(nftAddress).transferFrom(address(this), msg.sender, tokenId);
        idToTokenItem[itemId].owner = payable(msg.sender);
        idToTokenItem[itemId].sold = true;
        _tokenSold.increment();
        // 支付手续费
        payable(owner).transfer(listingPrice);
    }

    // 获取未卖出商品
    function getUnsoldToken() public view returns(MarketItem[] memory) {
        uint itemCount = _tokenIds.current();
        uint unsoldItemCount = _tokenIds.current() - _tokenSold.current();
        uint currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        for(uint i = 0; i < itemCount; i++) {
            if(!idToTokenItem[i + 1].sold) {
                uint currentId = i + 1;
                MarketItem storage currentItem = idToTokenItem[currentId];
                items[currentIndex] = currentItem; 
                currentIndex += 1;
            }
        } 
        return items; 
    }

    // 获取我拥有的商品
    function getMyToken() public view returns (MarketItem[] memory) {
        uint256 itemCount = _tokenIds.current();
        uint256 myCount = 0;
        uint256 currentIndex = 0;

        for (uint i = 0; i < itemCount; i++) {
            if (idToTokenItem[i + 1].owner == msg.sender) {
                myCount++;
            }
        }
        MarketItem[] memory items = new MarketItem[](myCount);
        for (uint256 i = 0; i < itemCount; i++) {
            if (idToTokenItem[i + 1].owner == msg.sender) {
                uint256 currentId = idToTokenItem[i + 1].itemId;
                MarketItem storage currentItem = idToTokenItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex++;
            }
        }
        return items;
    }

    // 获取我售卖(售卖中和已售卖)的商品
    function getMySellingToken() public view returns (MarketItem[] memory) {
        uint256 itemCount = _tokenIds.current();
        uint256 myCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < itemCount; i++) {
            if (idToTokenItem[i + 1].creater == msg.sender) {
                myCount++;
            }
        }
        MarketItem[] memory items = new MarketItem[](myCount);
        for (uint256 i = 0; i < itemCount; i++) {
            if (idToTokenItem[i + 1].creater == msg.sender) {
                uint256 currentId = idToTokenItem[i + 1].itemId;
                MarketItem storage currentItem = idToTokenItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex++;
            }
        }
        return items;
    }
}
