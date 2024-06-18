import { Validators } from "../../../config"


export class RegisterUserDto {
 private constructor(
    public name: string,
    public email: string,
    public password: string,
  ){}

  static create(object: {[key: string]: any}): [string?, RegisterUserDto?] {

    const { name, email, password} = object

    if(!name) return ['Name is Required'] 
    if(!email) return ['Email is Required'] 
    if(!Validators.email.test(email)) return ['Email is not valid']
    if(!password) return ['Password is Required']
    if(password.length < 6 ) return ['Password too short']

    return[
      undefined,
      new RegisterUserDto(name, email, password) 
    ]
  }
}