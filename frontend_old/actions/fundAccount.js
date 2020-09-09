import axios from 'axios'
import config from '../public/config'

export function fundAccount(destination) {
  return axios.post(`/tft_faucet/api/transfer`, { data: { destination } })
}
