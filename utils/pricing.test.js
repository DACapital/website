import test from 'ava'
import {calcDacForEth} from './pricing'

test('zero', t => {
  t.true(calcDacForEth(0, 0).equals(0))
})
