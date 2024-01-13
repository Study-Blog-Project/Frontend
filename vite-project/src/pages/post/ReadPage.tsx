import React, { useState } from 'react'
import Header from '../../components/header/Header'
import Btn from '../../components/button/Btn'
import search from '../../assets/search.png'

function ReadPage() {

  const [isLogin, setIsLogin] = useState<boolean>(true);
  console.log(isLogin)
  return (
    <div className='h-screen w-screen'>
      <div className="w-full ">
        <Header></Header>
      </div>
      <div className='w-full h-full bg-red-100'>
        <div className='w-fit ml-4'>
          <Btn category='text' size="big" txtColor='black' txt='"취업 포트 폴리오용 사이드 프로젝트 프론트엔드 개발자 모집합니다."'></Btn>
        </div>
        <div className='flex w-full justify-between' style={{ borderBottom: '1px solid #B3B3B3' }}>
          <div className='flex justify-around '>
            <Btn category='text' txtColor="black" size="small" txt="아이디"></Btn>
            <span>시간</span>
            <span>조회수</span>
          </div>
          <div className='flex justify-around ' > 
            <Btn buttonColor='primary' txt="모집중" size="small"></Btn>
            {isLogin && (
            <div className='flex'>
              <Btn buttonColor='secondary' txt="수정" size="small"></Btn>
              <Btn buttonColor='headerBtn' txt="삭제" size="small"></Btn>
            </div>
            )}
            {!isLogin && (
            <div className='flex'>
              <Btn buttonColor='headerBtn' txt="관심" size="small"></Btn>
            </div>
            )}
          </div>
        </div>
        <div>
          "모집예시~"
        </div>
      </div>

    </div>
  )
}

export default ReadPage