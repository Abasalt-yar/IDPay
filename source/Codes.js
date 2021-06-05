const codes = {
    "11" : `User is banned !`,
    "12" : `APIKey not found !`,
    "13" : `This APIKey is restricted to one single IP and your ip doesn't match !`,
    "14" : `Your WebService is not verified yet !`,
    "21" : `linked bank account is not verified yet !`,
    "22" : `WebService not found !`,
    "23" : `WebService verification failed !`,
    "24" : `linked bank account is disabled`,
    "31" : `Transaction ID is Empty !`,
    "32" : `Order ID is Empty !`,
    "33" : `Amount is Empty !`,
    "34" : `Amount is lower than 1,000 Tomans !`,
    "35" : `Amount is higher than 50,000,000 Tomans !`,
    "36" : `Amount has reached the limit !`,
    "37" : `CallBack Address Is Empty !`,
    "38" : `Your CallBack Domain doesn't match with the WebService CallBack Domain !`,
    "41" : `Transaction status Filtering must be array of documented statuses !`,
    "42" : `Payment Date Filtering must be an array of {min,max} (timestamp) !`,
    "43" : `Clearing Date Filtering must be an array of {min,max} (timestamp) !`,
    "51" : `Transaction not found !`,
    "52" : `No results for inquiry`,
    "53" : `Can't verify payment !`,
    "54" : `payment verification time has passed !`,
}


const status = {
    "1": `Payment not made`,
    "2": `Payment failed`,
    "3": `There was a problem`,
    "4": `Blocked`,
    "5": `Money refunded to payer`,
    "6": `Money refunded by system`,
    "7": `Payment canceled`,
    "8": `In payment gateway`,
    "10": `Waiting for verification`,
    "100": `Payment verified`,
    "101": `Payment is already verified`,
    "200": `Deposited to recipient`,
}

module.exports = {Error_Codes:codes,Transaction_Status: status}