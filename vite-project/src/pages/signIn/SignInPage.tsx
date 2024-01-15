
import Modal from '../../components/modal/Modal'
import Input from '../../components/input/Input'
import Btn from '../../components/button/Btn'
function SignIn (){
  return (
    <Modal>
        <div className="relative flex flex-col border  items-center border-solid border-black z-10 bg-white rounded-3xl ">
          <div className=' py-5 text-2xl font-extrabold'>회원가입</div>
          <div className=" flex flex-col w-full ml-10">
          <CustomLabel text={"이름"}></CustomLabel>
            <Input size="full" className='mb-4'></Input>
          <CustomLabel text={"이메일"}></CustomLabel>
            <Input size="full"  className='mb-4'></Input>
          <CustomLabel text={"비밀번호"}></CustomLabel>
            <Input size="full"  className='mb-4'></Input>
          <CustomLabel text={"비밀번호 확인"}></CustomLabel>
            <Input size="full"  className='mb-4'></Input>
          </div>
          <div className='w-full mb-2 pl-10 mr-10'>
            <Btn className='w-full' txt='가입하기' size="big" ></Btn>
          </div>
        </div>
        
    </Modal>
  )
}

function CustomLabel( { text }: { text: string }) {
  return (
    <span className='text-sm text-neutral-400'>{text}</span>
  );
}


export default SignIn