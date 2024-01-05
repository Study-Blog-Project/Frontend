import React from 'react'

function SignIn (){
  return (
    <div className="fixed top-0 left-0 flex flex-col justify-center items-center w-full h-full bg-gray-200 ">
      <div className="border border-solid  border-black w-1/2 h-1/2 ">
        <div>회원가입</div>
        <div className="flex flex-col flex-1">
          <div> <span>이름</span>
          <input></input>
          </div>
          <div> <span>이메일</span>
          <input></input>
          </div>      
          <div> <span>비밀번호</span>
          <input></input>
          </div>      
          <div> <span>비밀번호 확인</span>
          <input></input>
          </div>
        </div>
        <div>
          가입하기
        </div>
      </div>
    </div>
  )
}

export default SignIn