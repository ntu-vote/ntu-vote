export interface getKeyIn {
  headers: {
    authorization: string
  }
}

export interface getKeyOut {
  status: string
  message?: string
  result?: {
    pubKey: string
    prvKey: string
  }
}

export interface postCastIn {
  headers: {
    authorization: string
  }
  body: {
    cpnId: any
    cid: any
    votedProof: string | undefined
    ballotProof: string | undefined
  }
}

export interface postCastOut {
  status: string
  message?: string
}
