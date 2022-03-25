import '../styles/app.css'
import '../styles/global.css'
import CompnyInfo from './compnyInfo.js'
import Link from 'next/link'
import Head from 'next/head'
import $ from  'jquery'

function MarketPlace({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>exchange</title>
        <link rel="shortcut icon" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAoCAMAAABDwLOoAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABIUExURQFK/QJJ/QFK/QNJ/wJJ/AJJ/QJJ/kdwTAFK/QBH/wFK/QNJ/QJJ/QFJ/QJJ/wBK/wFK/QJJ/wFJ/gJJ/gBM/wRJ/AJK/gJK/QmUllwAAAAXdFJOU3+htyv75osAvwvVSPLKeB2wa5RhBDhTvPme5QAAAZxJREFUOMudlNu2gyAMRAGFIoK3qvn/Pz0TLkVr7eo69KHabkLCTCIeb6tX/ftP4vzaKCJSzRemMy3Fj+lumHXW5MVMBt96Xj8xvSOS4+NJJsZz/YUZJ6Kw4YGZlNc0nhjeqJ/xMTExbEkrMk9d05wzg/R83gdmCzVuJzy1S8bHpY3ni1FSzW9HQNeSL1U1lusQtta54RdnhHHnXRbMliNL5C0FL6lxer7sLjLxZR08eSXKUr5UUZkNiQQj6jIBUfcTI4j0EQGE8+SJGVhJe0AsqrswakJCMhMSz8N+ZYTBXr2AWJAc1O0/MPgTGoUlpNu9YdLNFHXvGCECTVmue2aiYql7Rv3EDP9nmpBu5sjA4QeG3UxF08ywIX3V1ETNWaCJhaI5G3I5eAOu43PYfvAYM2xRNPR6YFxREpfsAglY3e21M230vC56Q3tefljriIDnU++4bDA+kDVPVi69U3rQJofmjs4j4tWDuZdRlXp19LWX80w4DB5+fZsJZbbY8RX2w2yJ44BnVBfTu5lRZcTM4cusQyk/zMyb2fsHoz8xnKe5hdAAAAAASUVORK5CYII="></link>
      </Head>
      <nav style={{ backgroundColor: '#fffff' }}>
        <div className='nav'>
          <div className='nav-tar-l'>
            <img data-v-44df0c74 src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAoCAMAAABDwLOoAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABIUExURQFK/QJJ/QFK/QNJ/wJJ/AJJ/QJJ/kdwTAFK/QBH/wFK/QNJ/QJJ/QFJ/QJJ/wBK/wFK/QJJ/wFJ/gJJ/gBM/wRJ/AJK/gJK/QmUllwAAAAXdFJOU3+htyv75osAvwvVSPLKeB2wa5RhBDhTvPme5QAAAZxJREFUOMudlNu2gyAMRAGFIoK3qvn/Pz0TLkVr7eo69KHabkLCTCIeb6tX/ftP4vzaKCJSzRemMy3Fj+lumHXW5MVMBt96Xj8xvSOS4+NJJsZz/YUZJ6Kw4YGZlNc0nhjeqJ/xMTExbEkrMk9d05wzg/R83gdmCzVuJzy1S8bHpY3ni1FSzW9HQNeSL1U1lusQtta54RdnhHHnXRbMliNL5C0FL6lxer7sLjLxZR08eSXKUr5UUZkNiQQj6jIBUfcTI4j0EQGE8+SJGVhJe0AsqrswakJCMhMSz8N+ZYTBXr2AWJAc1O0/MPgTGoUlpNu9YdLNFHXvGCECTVmue2aiYql7Rv3EDP9nmpBu5sjA4QeG3UxF08ywIX3V1ETNWaCJhaI5G3I5eAOu43PYfvAYM2xRNPR6YFxREpfsAglY3e21M230vC56Q3tefljriIDnU++4bDA+kDVPVi69U3rQJofmjs4j4tWDuZdRlXp19LWX80w4DB5+fZsJZbbY8RX2w2yJ44BnVBfTu5lRZcTM4cusQyk/zMyb2fsHoz8xnKe5hdAAAAAASUVORK5CYII=" alt=""></img>
            <Link href='/'>
              <h1><a className='nav-a h1' onClick={()=>{
                  var traget=document.getElementById('li');
                  if(traget.style.display=="none"){
                    traget.style.display='';  
                }
                else{
                  traget.style.display="none";
            }
              }}>Exchange</a></h1>
            </Link>
          </div>
          
          <div className='nav-tar-r menu'>
              <h1><a><span className='nav-a h1 menu' id='menu' onClick={()=>{
    $(" ul.navig").slideToggle("slow" , function(){
      var traget=document.getElementById('li');
      if(traget.style.display=="none"){
        traget.style.display='inline-block';
    }
    if(traget.style.display=="inline-block"){
      traget.style.display='none';
  }
      });
  }}>菜单</span></a></h1>
  
          </div>


          {/* <div>
            <Link href='/market'>
              <a className='nav-a'>
                市场
              </a>
            </Link>
          </div>
          <div>
            <Link href='/mint-item'>
              <a className='nav-a'>
                铸造NFT
              </a>
            </Link>
          </div>
          <div>
            <Link href='/my-nfts'>
              <a className='nav-a'>
                我的NFT
              </a>
            </Link>
          </div>
          <div>
            <Link href='/account-dashboard'>
              <a className='nav-a'>
                我铸造的NFT
              </a>
            </Link>
          </div> */}
        </div>
      </nav>
      <ul className="navig" id='li'>
				   <li><Link href='/market'>
              <a className='nav-a' onClick={()=>{
                  var traget=document.getElementById('li');
                  if(traget.style.display=="none"){
                    traget.style.display='inline-block';
                }
                else{
                  traget.style.display="none";
            }
              }} >
                市场
              </a>
            </Link></li>
				   <li><Link href='/mint-item'>
              <a className='nav-a'onClick={()=>{
                  var traget=document.getElementById('li');
                  if(traget.style.display=="none"){
                    traget.style.display='inline-block';
                }
                else{
                  traget.style.display="none";
            }
              }}>
                铸造NFT
              </a>
            </Link></li>
				   <li><Link href='/my-nfts'>
              <a className='nav-a'onClick={()=>{
                  var traget=document.getElementById('li');
                  if(traget.style.display=="none"){
                    traget.style.display='inline-block';
                }
                else{
                  traget.style.display="none";
            }
              }}>
                我的NFT
              </a>
            </Link></li>
				   <li><Link href='/account-dashboard'>
              <a className='nav-a'onClick={()=>{
                  var traget=document.getElementById('li');
                  if(traget.style.display=="none"){
                    traget.style.display='inline-block';
                }
                else{
                  traget.style.display="none";
            }
              }}>
                我铸造的NFT
              </a>
            </Link></li>
			   </ul>
      <Component {...pageProps} />
      <CompnyInfo />
    </div>
  )
}

export default MarketPlace 