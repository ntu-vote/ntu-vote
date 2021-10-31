export interface getOut {
  status:string
  message?: string
  result?: {
    campaigns: any[]
  }
}

export interface getIdvIn {
  params: {
    cpnId: string | undefined
  }
}

export interface getIdvOut {
  status:string
  message?: string
  result?: {
    campaign: any
  }
}
