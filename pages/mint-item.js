import { ethers } from 'ethers'
import { useState } from 'react'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import Web3Modal from 'web3modal'
import { nftMarketAddress, nftAddress } from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import KBMarket from '../artifacts/contracts/KBMarket.sol/KBMarket.json'
import { useRouter } from 'next/router'

// 使用ipfs托管nft里存储的数据
const client = ipfsHttpClient('http://127.0.0.1:5001/api/v0')
//const client = ipfsHttpClient('http://127.0.0.1/tcp/8080')

export default function MintItem() {
    const [fileUrl, setFileUrl] = useState(null)
    const [formInput, setFormInput] = useState({
        price: '',
        name: '',
        description: ''
    })
    const router = useRouter()

    // nft图片处理
    async function onChange(e) {
        const file = e.target.files[0]
        try {
            //往ipfs里添加元素
            console.log(client)
            const added = await client.add(
                file,
                {
                    progress: (prog) => {
                        console.log(`upload: ${prog}`)
                    }
                }
            )
            console.log(added)
            const url = `http://localhost:8080/ipfs/${added.path}`
            setFileUrl(url)
        } catch (error) {
            console.log('Upload file error:', error)
        }
    }

    // nft其他信息处理
    async function createItemInfo() {
        const { name, description, price } = formInput
        if (!name || !description || !price || !fileUrl) return
        const data = JSON.stringify({
            name,
            description,
            image: fileUrl
        })
        try {
            // ipfs二次存储,为整合图片后的其他信息
            const added = await client.add(data)
            const url = `http://localhost:8080/ipfs/${added.path}`
            createItem(url)
        } catch (error) {
            console.log('Upload file error:', error)
        }
    }

    // 上架物品
    async function createItem(url) {
        const web3Modal = new Web3Modal()
        const connect = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connect)
        const signer = provider.getSigner()

        // 铸币
        let contract = new ethers.Contract(nftAddress, NFT.abi, signer)
        let transaction = await contract.mintToken(url)
        let tx = await transaction.wait()
        let event = tx.events[0]
        let value = event.args[2]
        let tokenId = value.toNumber()
        const price = ethers.utils.parseUnits(formInput.price, 'ether')

        // 上架
        contract = new ethers.Contract(nftMarketAddress, KBMarket.abi, signer)
        let listingPrice = await contract.listingPrice()
        listingPrice = listingPrice.toString()

        transaction = await contract.makeMarketItem(tokenId, price, nftAddress, {
            value: listingPrice
        })
        await transaction.wait()
        router.push('/')
    }

    return (
        <div className='flex justify-center'>
            <div className='w-1/2 flex flex-col pb-12'>
                <input
                    placeholder='输入名称'
                    className='mt-8 border rounded p-4'
                    onChange={e => setFormInput({ ...formInput, name: e.target.value })}
                />
                <textarea
                    placeholder='输入描述'
                    className='mt-2 border rounded p-4'
                    onChange={e => setFormInput({ ...formInput, description: e.target.value })}
                />
                <input
                    placeholder='输入价格(单位:ETH)'
                    className='mt-2 border rounded p-4'
                    onChange={e => setFormInput({ ...formInput, price: e.target.value })}
                />
                <input
                    type='file'
                    name='Asset'
                    className='mt-4'
                    onChange={onChange}
                /> {
                    fileUrl && (
                        <img className='rounded mt-4' width='350px' src={fileUrl} />
                    )}
                <button onClick={createItemInfo}
                    className='font-bold mt-4 bg-blue-500 text-white rounded p-4 shadow-lg'
                >
                    铸造 NFT
                </button>
            </div>
        </div>
    )
}