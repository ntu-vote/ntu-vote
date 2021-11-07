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
    cpnId: string | undefined
    cid: string | undefined
    votedProof: string | undefined
    ballotProof: string | undefined
  }
}

export interface postCastOut {
  status: string
  message?: string
}
