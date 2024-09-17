const { createClient } = 'redis';
const {moment} = 'moment';

//Initialize redis
const redisClient = createClient({
    url: 'redis://localhost:6379' // Default port for Redis
});
redisClient.on('error', err => console.log('Redis Client Error', err));

const FIXED_WINDOW_SIZE_IN_SEC = 60; // 1min window size
const MAX_REQUEST_FREE_USER = 20; 
const MAX_REQUEST_PRO_USER = 50;
const MAX_REQUEST_PREMIUM_USER = 100;

const rateLimitMiddleware = async (req,res,next)=>{

    await redisClient.connect();

    try{
        if(!redisClient){
            throw new Error("Redis client does not exist");
        }

        //Get user identifier
        const email = req.authMiddleware.email;
        const tier = req.authMiddleware.tier;
        const REQUEST_LIMIT = tier === 0?MAX_REQUEST_FREE_USER:(tier === 1)?MAX_REQUEST_PRO_USER:MAX_REQUEST_PREMIUM_USER;
        const records = await redisClient.get(email);
        const currentRequestTime = moment();

        //If there's no record atm in redis
        if(records == null){
            let newRecord = [];

            //Set timestamp and ip for the request
            let requestLog = {
                ip:req.ip,
                requestTimestamp:currentRequestTime.unix()
            }

            newRecord.push(requestLog);

            await redisClient.set(email,JSON.stringify(newRecord));
            next();
        }

        let data = JSON.parse(records);

        //Determine the window frame
        const windowStartTimestamp = currentRequestTime.subtract(FIXED_WINDOW_SIZE_IN_SEC,'sec').unix();

        //If data exist in the window frame
        const requestRecords = data.filter(entry => entry.requestTimestamp > windowStartTimestamp);

        //Check if the request limit has exceeded for the current frame
        if(requestRecords.length >= REQUEST_LIMIT){
            res.status(429).json({status:'429',msg:"Rate limit exceeded. Try again after some time"});
        }else{

            //Save the new request
            let requestLog = {
                ip:req.ip,
                requestTimestamp:currentRequestTime.unix()
            }
            data.push(requestLog);
            await redisClient.set(email,JSON.stringify(data));
            next();
        }
    }catch(err){
        console.log("Error (RateLimit): ",err);
        return res.status(500).json({
            status:500,
            msg:"Internal server error"
        })

    }
 }

module.exports = {rateLimitMiddleware}