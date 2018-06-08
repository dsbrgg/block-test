const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/:addrs', (req, res, next) => {
    // public wallet address
    let address = req.params.addrs;

    // function to fetch the Weis data on blockcypher
    async function getBalance(addrs) {
        let response;

        // Try/Catch block to guarantee a value is returned, else reject with the error
        try {
            response = await axios.get(`https://api.blockcypher.com/v1/eth/main/addrs/${addrs}/balance`);
        } catch(e) {
            return Promise.reject(e);
        }
        
        // balance object with the Weis currensy converted into Ethereum (1 Ether === 10^18)
        const balance = { ether : (response.data.balance/Math.pow(10, 18)) };

        res.status(200).send(balance);
    }

    getBalance(address)
        .catch((error) => {
            return res.status(500).send({error : 'An error ocurred in while fetching the data.'});
        });
}); 

module.exports = router;
