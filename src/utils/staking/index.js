import axios from 'axios'
import config from '../../config'

export function getSupply () {
  return new Promise(resolve => {
    axios.get(config.api + 'supply').then(res => {
      // console.log(res)
      resolve(res.data)
    }).catch(err => {
      console.log(err)
      resolve(err)
    })
  })
}