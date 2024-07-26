import {compareSync, hashSync} from 'bcryptjs'

export class BcryptAdapter {

  static hash(passowrd: string): string {
    return hashSync( passowrd )
  }

  static compare(password: string, hashed: string): boolean{
    return compareSync(password, hashed)
  }

}