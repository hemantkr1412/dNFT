// Go to www.alchemy.com and create an account to grab your own api key!
const apiKey = "x0iuJtoFeRSo301NdJbfHATCgDVhFPGw";
const endpoint = `https://polygon-mumbai.g.alchemy.com/v2/${apiKey}`;

export const FetchNFTs = async (owner, contractAddress, setNFTs, retryAttempt) => {

    if (retryAttempt === 5) {
        return;
    }
    if (owner) {
        let data;
        try {
            if (contractAddress) {
                data = await fetch(`${endpoint}/getNFTs?owner=${owner}&contractAddresses%5B%5D=${contractAddress}`).then(data => data.json())
            } else {
                data = await fetch(`${endpoint}/getNFTs?owner=${owner}`).then(data => data.json())
            }
        } catch (e) {
            // FetchNFTs(endpoint, owner, contractAddress, setNFTs, retryAttempt+1)
            console.log(e)
        }

        setNFTs(data.ownedNfts)
        // console.log(data.ownedNfts)
        return data
    }
}

