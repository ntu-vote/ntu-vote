export interface getIn {
  query: {
    a: string | undefined
    b: string | undefined
  }
}

export interface getOut {
  error: string | undefined
  response?: {
    sum: string
  }
}
