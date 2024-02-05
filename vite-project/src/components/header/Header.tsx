import  { useEffect } from 'react'
import Btn from '../button/Btn';
interface headerProps{
  isLogin?:boolean
}
function Header({isLogin}:headerProps) {
  

  //const [isLogin, setIsLogin] = useState<boolean>(true);
  
  useEffect(()=>{
    //let border="";

  },[isLogin])
  return (
    <div className='flex justify-between items-center px-2 py-2 mb-2'>
      {!isLogin && <div>
        이미지
      </div>}
      <div className='flex-grow text-center'>
        로고
      </div>
      <div>
        {!isLogin && <div className='flex'>
          <Btn category='outlined' txt="로그인" size="small"></Btn>
          <Btn category='outlined' buttonColor="headerBtn" txt="회원가입" size="small"></Btn>
        </div>}
        {isLogin && <div>
          <Btn category='outlined' size="small" txt="마페"></Btn>
        </div>}
      </div>
    </div>
  )
}

export default Header
