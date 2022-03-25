import Link from 'next/link'

export default function Home() {
    return (
        <div>
            <div className='wrapper'>
                <div className='index-title'>
                    <h1>NFT</h1>
                    <h2>让价值自由流通</h2>
                    <div>
                        <Link href='/mint-item'>
                            <button>
                                <span style={{ color: '#ffffff' }}>发布数字藏品</span>
                            </button>
                        </Link>
                        <Link href='/market'>
                            <button>
                                <span style={{ color: '#ffffff' }}>浏览商品</span>
                            </button>
                        </Link>
                    </div>
                </div>
                <video autoplay={'autoplay'} loop={'loop'} muted={"muted"} className='swiper-video'>
                    <source src={`/video/a.mp4`} type="video/mp4"></source>
                </video>
            </div>
            {/* <div className='index-main'>
                <h3>优势</h3>
                <div className='advantage'>
                    <dl className='advantage-info'>
                        <dt>
                            <img data-v-f2fc9792="" src="/img/advantage/advantage-4.png"></img>
                        </dt>
                        <dd>
                            <h5>藏品众多</h5>
                            <br></br>
                            <p>拥有独家数字藏品，众多前卫创作者，藏品分类涵盖范围广。</p>
                        </dd>
                    </dl>
                    <dl className='advantage-info'>
                        <dt>
                            <img data-v-f2fc9792="" src="/img/advantage/advantage-1.png"></img>
                        </dt>
                        <dd>
                            <h5>安全可信</h5>
                            <br></br>
                            <p>依托区块链溯源，藏品铸造链上留痕，来源可溯，记录可查，版权可信。</p>
                        </dd>
                    </dl>
                    <dl className='advantage-info'>
                        <dt>
                            <img data-v-f2fc9792="" src="/img/advantage/advantage-3.png"></img>
                        </dt>
                        <dd>
                            <h5>费用更低</h5>
                            <br></br>
                            <p>发行手续费低于行业平均水平；数字藏品交易佣金比例低。</p>
                        </dd>
                    </dl>
                    <dl className='advantage-info'>
                        <dt>
                            <img data-v-f2fc9792="" src="/img//advantage/advantage-2.png"></img>
                        </dt>
                        <dd>
                            <h5>铸造更快</h5>
                            <br></br>
                            <p>流程操作更便捷，藏品生成更迅速。</p>
                        </dd>
                    </dl>
                </div>
            </div> */}
            <div className='index-main'>
                <h3>新手教程</h3>
                <div className='cource'>
                    <ul>
                        <Link href='https://www.jianshu.com/p/65b909d09157'><li>
                            <img data-v-f2fc9792="" src="/img/cource/cource-3.png"></img>
                            <div>
                                <h4>创建账号教程</h4>
                                <p>连接Matemask账号，提交身份资料，进行身份认证，目前平台提供个人身份及企业身份认证，个人身份认证</p>
                            </div>
                        </li></Link>
                        <Link href='https://weibo.com/ttarticle/p/show?id=2309404733193088533127'>
                        <li>
                            <img data-v-f2fc9792="" src="/img/cource/cource-1.png"></img>
                            <div>
                                <h4>购买数字藏品教程</h4>
                                <p>了解藏品的拍卖和购买流程，帮您完成购买心仪的数字藏品的愿望。</p>
                            </div>
                        </li></Link>
                        <Link href='https://www.xiaohongshu.com/discovery/item/61f3fb980000000021039ecb'>
                        <li>
                            <img data-v-f2fc9792="" src="/img/cource/cource-2.png"></img>
                            <div>
                                <h4>发布数字藏品教程</h4>
                                <p>上传您的藏品（图像、视频、音频或3D艺术），添加标题和描述，并自定义您的 数字藏品，包括属性、统计数据和可解锁的内容</p>
                            </div>
                        </li></Link>
                    </ul>
                </div>
            </div>
        </div>
    )
}