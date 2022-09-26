const axios = require("axios") 

const API_POLYGON = "https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-polygon";

// https://info.uniswap.org/#/polygon/pools/0xa374094527e1673a86de625aa59517c5de346d32
query = `
   {
    pools(where: {
      id: "0xa374094527e1673a86de625aa59517c5de346d32"
    }
     orderBy: totalValueLockedUSD,
     orderDirection: desc
   )
   {
    id
    feeTier
    totalValueLockedUSD
    token0Price
    token1Price  
    token0 {
      id
      symbol
      name
      decimals
    }
    token1 {
      id
      symbol
      name
      decimals
    }
    poolDayData(orderBy: date, orderDirection:desc,first:1)
    {
      date
      volumeUSD
      tvlUSD
      feesUSD
      liquidity
      high
      low
      volumeToken0
      volumeToken1
      close
      open
    }
   }
}
`

async function getInfoPool() {
    const result = await axios.post(API_POLYGON, {query: query});

    const pool = result.data.data.pools[0];

    console.log("Detalhes da Pool MATIC/USDC na rede Polygon");
    console.log(pool);
    console.log("===========================================================");
}


getInfoPool()
