export interface ITransactionInfo {
    order_id:string,
    amount:number,
    'name'?:string,
    'phone'?:string,
    'mail'?:string,
    'desc'?:string,
    'callback'?:string,
}


export interface ITransactionStatus {
    status: number,
    track_id: number,
    id: string,
    order_id: string,
    amount: number,
    wage: {
        by: "payee" | "payer",
        type: "amoung" | "percent" | "stair",
        amount: number
    },
    date: any,
    payer: {
        name: string,
        phone: string,
        mail: string,
        desc: string
    },
    payment: {
        track_id: string,
        amount: number,
        card_no: string,
        hashed_card_no: string,
        date: any
    },
    verify: {
        date: any
    },
    settlement: {
        track_id: number
        amount: number,
        date: any,
        account? :{
            id: string,
            iban: string,
            number: string,
            bank :{ 
                id: string,
                title:string
            }
        }
    }
}

export interface ITransactionSearch{
    page?: number,
    page_size?:number,
    id?:string,
    order_id?:string,
    amount?:string,
    status?:string | Array<string>,
    track_id?: string,
    payment_card_no?: string,
    payment_hashed_card_no?: string,
    payment_date?: {
        min: any,
        max: any
    },
    settlement_date?: {
        min: any,
        max: any
    },
}

export interface ITransactionAttachment {
    timestamp?: number,
    total_count?: number,
    page_count?: number,
    current_page?: number,
    total_amount?: string,
    page_amount?: number,
}

export interface ITransaction {
    status_code: number,
    id: string,
    link: string
    info:ITransactionInfo,
    verify(): Promise<ITransactionVerifySuccess>,
    getStatus(): Promise<ITransactionStatus>
};


export interface ITransactionFailed {
    status_code: number,
    error_code: number | string,
    error_message: string,
}

export interface ITransactionVerify {
    id: string,
    order_id: string
}

interface ITransactionPayment {
    track_id: number,
    amount:number,
    card_no:string,
    hashed_card_no:string,
    date: any,
}


export interface ITransactionVerifySuccess {
    status: number,
    message: string,
    track_id: number,
    id: string,
    order_id: string,
    amount: number,
    date:any,
    payment:ITransactionPayment,
    verify:{
        date: any
    },
}