import {IDPay} from "IDPay"


const a = new IDPay("",true);
(async()=>{
  try {
    
    
    //  const b = await a.createTransaction({
    //    order_id: "1",
    //    amount: 1000,
    //    callback:""
    //  })
    //  console.log(b)

    // const c = await a.verifyPayment({id:"",order_id:"1"})
    // console.log(c)

    // const d = await a.transactionStatus({id:"",order_id:"1"})
    // console.log(d)

    // const e = await a.transactions()
    // console.log(e)
    
  } catch (error) {
    console.log(error)
    
  }
})()