
import Modal from '../../components/modal/Modal'
import Input from '../../components/input/Input'
import Btn from '../../components/button/Btn'
function Login() {
  console.log("^^")

  return (
    <Modal size={"narrow"}>
      <div className="relative flex flex-col border  items-center border-solid border-black z-10 bg-white rounded-3xl">
        <div>
          <Btn className="mt-3 mb-3" size='small' txt='이미지'></Btn>
        </div>
        <div className="flex mb-3 flex-col ml-10 w-full">
          <Input size='full' className='mb-2' place={"이메일"}></Input>
          <Input size='full' place={"비밀번호"}></Input>
        </div>
        <div className='w-full mb-2 pl-10 mr-10'>
          <Btn className='w-full'  txt='로그인' size="big" ></Btn>
        </div>
        <div className='flex'>
          <Btn size='small' category='text' txt='아이디 찾기' txtColor='black'></Btn>
          <Btn size='small' category='text' txt='비밀번호 찾기' txtColor='black'></Btn>
          <Btn size='small' category='text' txt='회원가입' txtColor='black'></Btn>
        </div>
      </div>
    </Modal>
  )
}

export default Login