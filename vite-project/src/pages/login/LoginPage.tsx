
import Modal from '../../components/modal/Modal'
import Input from '../../components/input/Input'
import Btn from '../../components/button/Btn'
function Login() {
  console.log("^^")

  return (
    <Modal size={"narrow"}>
      <div className="relative flex flex-col border  items-center border-solid border-black z-10 bg-white rounded-3xl">
        <div>
          <Btn className="mt-3" size='small' txt='이미지'></Btn>
        </div>
        <div className="flex flex-col w-2/3">
          <Input place={"이메일"}></Input>
          <Input place={"비밀번호"}></Input>
        </div>
        <div>
          <Btn  txt='로그인' size="big" ></Btn>
        </div>
        <div className='flex justify-between w-2/3'>
          <div className='flex'>
          <Btn size='small' category='text' txt='아이디 찾기' txtColor='black'></Btn>
          <Btn size='small' category='text' txt='비밀번호 찾기' txtColor='black'></Btn>
          </div>
          <div>
          <Btn size='small' category='text' txt='회원가입' txtColor='black'></Btn>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default Login