const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("KBMarket", function () {
  it("Should mint and trade NFTs", async function () {
    // 测试合约部署
    const Market = await ethers.getContractFactory('KBMarket')
    const market = await Market.deploy()
    await market.deployed()
    const marketAddress = market.address

    const NFT = await ethers.getContractFactory('NFT')
    const nft = await NFT.deploy(marketAddress)
    await nft.deployed()
    const nftAddress = nft.address

    // 测试获取手续费价格和价格
    let listingPrice = await market.listingPrice()
    listingPrice = listingPrice.toString()

    const auctionPrice = await ethers.utils.parseUnits('100', 'ether')

    // 测试铸币功能
    await nft.mintToken('https-t1')
    await nft.mintToken('https-t2')
    // 上架物品
    await market.makeMarketItem(1, auctionPrice, nftAddress, { value: listingPrice })
    await market.makeMarketItem(2, auctionPrice, nftAddress, { value: listingPrice })

    // 测试交易功能
    const [_, buyer] = await ethers.getSigners()

    await market.connect(buyer).createMarketSale(1, nftAddress, { value: auctionPrice })

    let item = await market.getUnsoldToken()

    itemsList = await Promise.all(item.map(async i => {
      // tokenURI: ERC721URIStorage内部方法根据token的id查询uri
      const tokenUri = await nft.tokenURI(i.tokenId)
      let items = {
        price: i.price.toString(),
        tokenId: i.tokenId.toString(),
        seller: i.seller,
        owner: i.owner,
        creater: i.creater,
        tokenUri
      }
      return items;
    }))

    console.log('item', itemsList)

    // 测试转卖物品
    await nft.connect(buyer).setApprovalForAll(marketAddress, true)
    await market.connect(buyer).resellMarketItem(1, auctionPrice, nftAddress, { value: listingPrice })

    item = await market.getUnsoldToken()

    itemsList = await Promise.all(item.map(async i => {
      // tokenURI: ERC721URIStorage内部方法根据token的id查询uri
      const tokenUri = await nft.tokenURI(i.tokenId)
      let items = {
        price: i.price.toString(),
        tokenId: i.tokenId.toString(),
        seller: i.seller,
        owner: i.owner,
        creater: i.creater,
        tokenUri
      }
      return items;
    }))

    console.log('item', itemsList)
  })
});
