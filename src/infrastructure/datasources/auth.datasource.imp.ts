import { UserModel } from "../../data/mongodb";
import { AuthDatasource, CustomError, RegisterUserDto, UserEntity } from "../../domain";


export class AuthDatasourceImpl implements AuthDatasource{
  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {

    const { name, email, password } = registerUserDto

    try {

      //1. Verificar si el correo existe
      const exist = await UserModel.findOne({ email })
      if(exist) throw CustomError.badRequest('User already exist')

      const user = await UserModel.create({
        name: name,
        email: email,
        password: password
      })


      //2. Hash de contraseña

      await user.save()

      //3. Mapear la respuesta de nuestra entidad
      // TODO: Falta una mapper
      return new UserEntity(
        user.id, 
        name,
        email,
        password,
        user.roles,
      )
      
    } catch (error) {
      console.log({error})
      if(error instanceof CustomError){
        throw error
      }
      throw CustomError.internalServer()
    }


  }

}