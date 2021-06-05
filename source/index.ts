
import axios from "axios"
import {Error_Codes,Transaction_Status} from "./Codes"
import {ITransactionSearch,ITransactionAttachment,ITransaction,ITransactionFailed,ITransactionStatus,ITransactionInfo,ITransactionVerify,ITransactionVerifySuccess} from "./Interface"


export class IDPay {
    private _apiKey: string;
    readonly debug_mode:boolean = false;
    /**
     * Creates an IDPay Transaction
     * @param apiKey Your IDPay WebService API-Key
     * @param debugMode Debug Mode Status
     * @returns new IDPay Class
    */
    constructor (apiKey:string,debugMode:boolean = false){
        this._apiKey = apiKey
        this.debug_mode = debugMode
    }
    /**
     * Creates an IDPay Transaction
     * @param options Options | amount In **Tomans**
     * @returns ITransaction
    */
    public async createTransaction(options:ITransactionInfo) : Promise<ITransaction>{
        
        return new Promise<ITransaction>(async (res,rej)=>{
            try {
              
              const result = await axios({
                method:"POST",
                url:"https://api.idpay.ir/v1.1/payment",
                responseType:"json",
                data:options,
                headers:{
                  'Content-Type': 'application/json',
                  'X-API-KEY': this._apiKey,
                  'X-SANDBOX': this.debug_mode == true ? 1 : 0,
                }
              });
              res({status_code:result.status,id:result.data.id,link:result.data.link,info:options,
                verify:():Promise<ITransactionVerifySuccess>=>{
                  return new Promise<ITransactionVerifySuccess>(async(resolve, reject) => {
                      try {
                        const a = await this.verifyPayment({
                          id:result.data.id,
                          order_id:options.order_id
                        })
                        resolve(a)
                      } catch (error) {
                        reject(error)
                      }
                  })
                },
                getStatus:():Promise<ITransactionStatus>=>{
                  return new Promise<ITransactionStatus>(async(resolve,reject)=>{
                      try {
                        const a = await this.transactionStatus({
                          id:result.data.id,
                          order_id:options.order_id
                        })
                        resolve(a)
                      } catch (error) {
                        reject(error)
                      }
                  })
                }
              })
            } catch (error) {
              
              if (error.response?.data?.error_code != undefined) {
                
                const er: ITransactionFailed= {
                  status_code: error.response.status ,
                  error_code: error.response.data.error_code,
                  error_message: Error_Codes[error.response.data.error_code] != undefined ? Error_Codes[error.response.data.error_code] : error.response.data.error_message
                }
                rej(er)
              }else 
                rej(error)
            } 
        })
    }
    /**
     * verifys a transaction
     * @param options Options
     * @returns Transaction verification Status 
    */
    public verifyPayment (options:ITransactionVerify) :Promise<ITransactionVerifySuccess>{
      return new Promise<ITransactionVerifySuccess>(async (res,rej)=>{
        try {
        
        const result = await axios({
          method:"POST",
          url:"https://api.idpay.ir/v1.1/payment/verify",
          responseType:"json",
          data:options,
          headers:{
            'Content-Type': 'application/json',
            'X-API-KEY': this._apiKey,
            'X-SANDBOX': this.debug_mode == true ? 1 : 0,
          }
        });
        
        
        let _ = result.data
        let d : ITransactionVerifySuccess = _
        if (d.status != undefined && Transaction_Status[d.status] != undefined) {
          d.message = Transaction_Status[d.status]
        }
        res(d)
      } catch (error) {
        
        if (error.response?.status != undefined) {
          
          const er: ITransactionFailed = {
            status_code: error.response.status ,
            error_code: error.response.data.error_code,
            error_message: Transaction_Status[error.response.data.error_code] != undefined ? Transaction_Status[error.response.data.error_code] : Error_Codes[error.response.data.error_code]
          }
          rej(er)
        }else 
          rej(error)
      } 
      })
    }
    /**
     * gets a transaction status
     * @param options Options
     * @returns Transaction Status 
    */
    public transactionStatus (options:ITransactionVerify) :Promise<ITransactionStatus>{
      return new Promise<ITransactionStatus>(async (res,rej)=>{
        try {
        
        const result = await axios({
          method:"POST",
          url:"https://api.idpay.ir/v1.1/payment/inquiry",
          responseType:"json",
          data:options,
          headers:{
            'Content-Type': 'application/json',
            'X-API-KEY': this._apiKey,
            'X-SANDBOX': this.debug_mode == true ? 1 : 0,
          }
        });
        res(result.data)
      } catch (error) {
        
        if (error.response?.status != undefined) {
          
          const er: ITransactionFailed = {
            status_code: error.response.status ,
            error_code: error.response.data.error_code,
            error_message: Transaction_Status[error.response.data.error_code] != undefined ? Transaction_Status[error.response.data.error_code] : Error_Codes[error.response.data.error_code]
          }
          rej(er)
        }else 
          rej(error)
      } 
      })
    }
    /**
     * gets transaction list
     * @param options Options
     * @returns Attachments | Transactions
    */
    public transactions (options?:ITransactionSearch): Promise<{
      attachments: ITransactionAttachment,
      transactions: Array<ITransactionStatus>,
    }> {
      return new Promise<{
        attachments: ITransactionAttachment,
        transactions: Array<ITransactionStatus>,
      }>(async(res,rej)=>{
        try {
          let params = options?.page == undefined ? "page=0" : `page=${options?.page}`
          params += options?.page_size == undefined ? "&page_size=25" : `page_size=${options?.page_size}`
          const result = await axios({
            method:"POST",
            url:`https://api.idpay.ir/v1.1/payment/transactions?${params}`,
            responseType:"json",
            data:options,
            headers:{
              'Content-Type': 'application/json',
              'X-API-KEY': this._apiKey,
              'X-SANDBOX': this.debug_mode == true ? 1 : 0,
            }
          });
          if (result.status == 204) {
            rej({
              status_code: 204,
              error_code: 204,
              error_message: "No Transaction found"
            })
          }
          const attachments:ITransactionAttachment = result.data.attachment
          const Records:Array<ITransactionStatus> = result.data.records
          res({attachments: attachments,transactions:Records})
        } catch (error) {
          if (error.response?.status != undefined) {
          
            const er: ITransactionFailed = {
              status_code: error.response.status ,
              error_code: error.response.data.error_code,
              error_message: Transaction_Status[error.response.data.error_code] != undefined ? Transaction_Status[error.response.data.error_code] : Error_Codes[error.response.data.error_code]
            }
            rej(er)
          }else 
            rej(error)
        }
      })
    }
}



