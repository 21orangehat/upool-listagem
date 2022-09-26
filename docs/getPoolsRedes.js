const axios = require("axios") 

const API_ETHEREUM = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3";
const API_POLYGON = "https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-polygon";
const API_OPTIMISM = "https://api.thegraph.com/subgraphs/name/ianlapham/optimism-post-regenesis";
const API_ARBITRUM = "https://api.thegraph.com/subgraphs/name/ianlapham/arbitrum-dev";


query = `
   {
    pools(orderBy: volumeUSD, orderDirection: desc, first: 3){
        id
        volumeUSD,
        liquidity
        totalValueLockedUSD
        token0 {
            symbol
        }
        token1 {
            symbol
        }
    }
}
`

async function getEthereum() {
    const result = await axios.post(API_ETHEREUM, {query: query});

    const pools = result.data.data.pools;

    console.log("As 3 melhores pools da rede Ethereum");
    pools.forEach(function(pool){
        console.log(pool);
    });
    console.log("===========================================================");
}

async function getPolygon() {
    const result = await axios.post(API_POLYGON, {query: query});

    const pools = result.data.data.pools;

    console.log("As 3 melhores pools da rede Polygon");
    pools.forEach(function(pool){
        console.log(pool);
    });
    console.log("===========================================================");
}

async function getOptimism() {
    const result = await axios.post(API_OPTIMISM, {query: query});

    const pools = result.data.data.pools;

    console.log("As 3 melhores pools da rede Optimism");
    pools.forEach(function(pool){
        console.log(pool);
    });
    console.log("===========================================================");
}

async function getArbitrum() {
    const result = await axios.post(API_ARBITRUM, {query: query});

    const pools = result.data.data.pools;

    console.log("As 3 melhores pools da rede Arbitrum");
    pools.forEach(function(pool){
        console.log(pool);
    });
    console.log("===========================================================");
}

async function main(){
    await getEthereum();
    await getPolygon();
    await getOptimism();
    await getArbitrum();
}


main()
