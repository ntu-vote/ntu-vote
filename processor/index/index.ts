import validator from 'validator'

import * as IIndexProcessor from './index.type'
import { add } from '../../service/math'

export default class IndexProcessor {
  public static get = async (input: IIndexProcessor.getIn) => {
    const output: IIndexProcessor.getOut = {
      error: undefined,
    }
    if (input.query.a === undefined || input.query.b === undefined) {
      output.error = 'Missing a variable'
      return output
    }
    if (!(validator.isInt(input.query.a) && validator.isInt(input.query.b))) {
      output.error = 'Input variables must be integers'
      return output
    }
    output.response = {
      sum: add(parseInt(input.query.a), parseInt(input.query.b)).toString(),
    }
    return output
  }
}
