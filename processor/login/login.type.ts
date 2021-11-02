export interface postOut {
    status:string
    message?: string
    params?: {
      username: string,
      uid: number,
      token: string
    }
}
  
export interface postIn {
    params: {
        username: string,
        claimedPassword: string
    }
}