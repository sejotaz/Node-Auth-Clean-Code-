import { UserModel } from "../../data/mongodb";
import { AuthDatasource, CustomError, RegisterUserDto, UserEntity } from "../../domain";
import { BcryptAdapter } from '../../config/bcrypt';
import { UserMapper } from '../mappers/user.mapper';


type HashFuction = (password: string) => string
type CompareFunction = (password: string, hashed: string) => boolean

export class AuthDatasourceImpl implements AuthDatasource{

  constructor(
    private readonly hasPassword: HashFuction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare
  ){}

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {

    const { name, email, password } = registerUserDto

    try {

      //1. Verificar si el correo existe
      const exist = await UserModel.findOne({ email })
      if(exist) throw CustomError.badRequest('User already exist')

      const user = await UserModel.create({
        name: name,
        email: email,
        password: this.hasPassword(password)
      })


      //2. Hash de contraseña

      await user.save()

      //3. Mapear la respuesta de nuestra entidad
      // TODO: Falta una mapper
      return UserMapper.userEntityFromObject(user)
      
    } catch (error) {
      console.log({error})
      if(error instanceof CustomError){
        throw error
      }
      throw CustomError.internalServer()
    }


  }

}