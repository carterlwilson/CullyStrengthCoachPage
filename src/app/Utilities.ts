/* eslint-disable @typescript-eslint/no-extraneous-class */
import DataPersistence from '../services/DataPersistence'

class Utilities {
  static IsAdminUser = async (username: string): Promise<boolean> => {
    const dataPersistence = new DataPersistence()
    const role = await dataPersistence.getUserRole(username)
    if (role === 1) return true
    else return false
  }
}

export default Utilities
