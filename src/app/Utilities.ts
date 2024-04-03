/* eslint-disable @typescript-eslint/no-extraneous-class */
class Utilities {
  static IsAdminUser = (role: number): boolean => {
    if (role === 1) return true
    else return false
  }
}

export default Utilities
