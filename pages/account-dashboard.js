import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from 'web3modal'
import { nftMarketAddress, nftAddress } from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import KBMarket from '../artifacts/contracts/KBMarket.sol/KBMarket.json'

export default function AccountDashBoard() {
    const [nfts, setNFts] = useState([])
    const [sold, setSold] = useState([])
    const [loadingState, setLoadingState] = useState('not-loaded')

    useEffect(() => {
        loadNFTs()
    }, [])

    async function loadNFTs() {
        const web3Modal = new Web3Modal()
        const connect = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connect)
        const singer = provider.getSigner()
        const NFTContract = new ethers.Contract(nftAddress, NFT.abi, provider)
        const MarketContract = new ethers.Contract(nftMarketAddress, KBMarket.abi, singer)
        const data = await MarketContract.getMySellingToken()

        let items = await Promise.all(data.map(async i => {
            const tokenUri = await NFTContract.tokenURI(i.tokenId)
            const meta = await axios.get(tokenUri)
            const price = ethers.utils.formatUnits(i.price.toString(), 'ether')
            let item = {
                price: price,
                tokenId: i.tokenId.toNumber(),
                seller: i.seller,
                owner: i.owner,
                image: meta.data.image,
                name: meta.data.name,
                description: meta.data.description
            }
            return item
        }))
        const soldItem = setSold(items.filter(i => i.sold))
        setSold(soldItem)
        setNFts(items)
        setLoadingState('loaded')
    }

    if (loadingState === 'loaded' && !nfts.length) return (
        <h1 className='px-20 py-7 text-4x1'>你没有铸造任何NFT</h1>
    )

    return (
        <div className='flex justify-center p-4'>
            <div className='px-4' style={{ maxWidth: '1600px' }}>
            <h1 style={{ fontSize: '20px', color: 'purple' }}>已铸造的NFT</h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4'>
                    {
                        // 循环现有nft并在页面展示
                        nfts.map((nft, i) => (
                            <div key={i} className='border shadow rounded-x1 overflow-hidden'>
                                <img src={nft.image} />
                                <div className='p-4'>
                                    <p style={{ height: '64px' }} className='text-3x1 font-semibold'>{nft.name}</p>
                                    <div style={{ height: '72px', overflow: 'hidden' }}>
                                        <p className='text-gray-400'>{nft.description}</p>
                                    </div>
                                </div>
                                <div className='p-4 bg-black'>
                                    <p className='text-3x-1 mb-4 font-bold text-white'>{nft.price} ETH</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
