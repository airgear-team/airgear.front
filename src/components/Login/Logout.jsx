import {googleLogout} from '@react-oauth/google';
import style from './login.module.scss';




function Logout() {

  const handleLogout = async () => {

    try {
      await googleLogout();
      console.log('logout')
    } catch (error) {
      console.log(error);
    }
  }
  return (
      <button className={style.googleLogout} onClick={handleLogout}>Logout</button>

  )
}
console.log('logout ok', Logout)







export default Logout