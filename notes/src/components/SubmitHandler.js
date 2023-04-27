import loginUser from "@/functions/loginUser";
import registerUser from "@/functions/registerUser";


export default async function SubmitHandler(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const correo = formData.get('correo');
  const contraseña = formData.get('contraseña');
  console.log(correo, contraseña);
  // const isRegistering = formData.get('isRegistering');
  if(isRegistering) {
    await loginUser(correo, contraseña);
  } else {
    await registerUser(correo, contraseña);
  }
}
    

  