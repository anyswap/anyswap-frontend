import config from '../../../config/index.js'
export function dirSwitch(type) {
  if (config.reverseSwitch) {
    return type ? 0 : 1
  } else {
    return type ? 1 : 0
  }
}
