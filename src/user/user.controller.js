import { encryptedPassword, verifyPassword } from "../config/plugins/encripted-password.plugin.js"
import generateJWT from "../config/plugins/generate-jwt.plugin.js"
import { AppError, catchAsync } from "../errors/index.js"
import { UserService } from "./user.service.js"


const userService = new UserService()

export const login = catchAsync(async(req, res, next) => {
  const { email, password } = req.body;

  //1. validar que el usuario exista en base de datos
  const user = await userService.findOneUserByEmail(email)

  if(!user){
    return next(new AppError('This account does not exist', 404))
  }

  const isCorrectPassword = await verifyPassword(
    password,
    user.password
  )
  //2 validar la contraseña si es correcta
  if(!isCorrectPassword){
    return next(new AppError('Incorrect email or password', 401))
  }
  //3 generar el token
  const token = await generateJWT(user.id)
  //4. enviar la respuesta al cliente
  return res.status(200).json({
    token,
    user: {
      id: user.id,
      fullname: user.fullname,
      email: user.email
    }
  })
  

})

export const register = catchAsync(async(req, res, next) => {
    const { fullname, email, password } = req.body

    let avatar = '';

    const user = await userService.createUser({ fullname, email, password, avatar })

    const token = await generateJWT(user.id)

    return res.status(201).json({
      token,
      user: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
      }
    })
})

export const changePassword = catchAsync(async(req, res, next) => {
  //1. traerme el usuario
  const { sessionUser } = req;

  //2. traerme los datos de la req.body
  const { currentPassword, newPassword } = req.body;

  //3. validar si la contraseña actual y la nueva son iguales, si es asi enviar un error
  if( currentPassword === newPassword ){
    return next(new AppError('The password cannot be equals', 400))
  }

  //4. validar si la contraseña actual es igual a la contraseña en base de datos
  const isCorrectPassword = await verifyPassword(
    currentPassword,
    sessionUser.password
  )
 
  if(!isCorrectPassword){
    return next(new AppError('Incorrect email or password', 401))
  }

  //5. encriptar la nueva contraseña
  const hashedNewPassword = await encryptedPassword(newPassword)

  await userService.updateUser(sessionUser, {
    password: hashedNewPassword,
    chagedPasswordAt: new Date(),
  })

  return res.status(200).json({
    message: 'The user password was updated successfully'
  })
})

