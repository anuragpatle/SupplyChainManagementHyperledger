const transactModel = require('../models/transact.js');
const apiResponse = require('../utils/apiResponse.js');

exports.transactProduct = async (req, res) => {
    // find who initiates this event by decoding the token and getting the user type
    console.log("request --", req)
    const { id, loggedUserType , productId , userId } = req.body;
    console.log('1');
    if ( !userId || !loggedUserType || !productId || !id) {
        return apiResponse.badRequest(res);
    }
   
    let modelRes;
    if(loggedUserType == 'manufacturer')
    {
        // call send to Wholesaler
        console.log('2');
        modelRes= await transactModel.sendToWholesaler({ productId , userId , id });
    }
    else if(loggedUserType == 'wholesaler')
    {
        console.log('3');
        // call send to Distributor
        modelRes = await transactModel.sendToDistributer({ productId , userId , id });
    }
    else if(loggedUserType == 'distributor')
    {
        console.log('4');
        // call send to Retailer
        modelRes = await transactModel.sendToRetailer({ productId , userId , id  });
    } else {
        console.log('5');
        return apiResponse.badRequest(res);
    }
    console.log('6');
    return apiResponse.send(res, modelRes);
};

exports.transactProductConsumer = async (req, res) => {
    // find who initiates this event by decoding the token and getting the user type
    const { id, loggedUserType, name , productId , userId } = req.body;
    console.log('1');
    if (!name || !userId || !loggedUserType || !productId || !id) {
        return apiResponse.badRequest(res);
    }
    console.log('2');
    let modelRes;
    if(loggedUserType == 'retailer') {
        modelRes= await transactModel.sellToConsumer({ productId , id });
    } else {
        return apiResponse.badRequest(res);
    }

    console.log('3');
    return apiResponse.send(res, modelRes);
};