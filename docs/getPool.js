const axios = require("axios") 

const URL_ETHEREUM = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3"


query = `
{
    pools(where: {
      id: "0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640"
    }
     orderBy: totalValueLockedUSD,
     orderDirection: desc
   ){
     id
     totalValueLockedUSD
     token0Price
     token1Price
     volumeUSD
     feesUSD
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
   }
   }
`

async function main() {
    const result = await axios.post(URL_ETHEREUM, {query: query});

    const pool = result.data.data.pools[0];

    console.log(pool);

}

main()
