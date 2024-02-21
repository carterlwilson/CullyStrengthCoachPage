/* eslint-disable @typescript-eslint/no-extraneous-class */
import { type UserMetadata } from '../types/types'

class Utilities {
  static IsAdminUser = async (userMetadata: UserMetadata): Promise<boolean> => {
    if (userMetadata.Role === 1) return true
    else return false
  }
}

export default Utilities
