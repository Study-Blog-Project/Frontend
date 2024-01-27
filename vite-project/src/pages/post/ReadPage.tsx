//import  { useState } from 'react'
import Header from '../../components/header/Header'
import Btn from '../../components/button/Btn'
//import search from '../../assets/search.png'
import { useParams } from 'react-router-dom';
import { useAuthStore } from '../../components/state/Login';
import { useEffect, useState } from 'react';
import { createReadPostConfig } from '../../components/state/AxiosModule';
import { PostDto, ReadPostInfo } from '../../components/dto/Dto';
import axios from 'axios';
function ReadPage() {
  const {isLogin} = useAuthStore();
  const { boardId } = useParams();
  
  const [readPageInfo, setReadPageInfo] = useState<ReadPostInfo>({
    boardId:0
  });
  const [postResponse, setPostResponse] = useState<PostDto | null>(null);
  useEffect(()=>{
    const boardIdAsNumber = Number(boardId);
    setReadPageInfo({ boardId: boardIdAsNumber });

    const fetchData = async () =>{
      const config = createReadPostConfig(readPageInfo); 
      try {
        const response = await axios(config);
        if (response.data.statusCode === 200) {
          console.log('성공', response.data);
          setPostResponse(response.data); 
        }
      } catch (error: any) {
        console.log(error)
        const { status, data } = error.response;
        console.log(data.message)
        if (status === 404) {
         
          if (data.message === '사용자를 찾지 못했습니다.') {
            console.error('사용자를 찾지 못했습니다.');
          } else {
            console.error(data.message);
          }
        }
      }
    }
    fetchData();
  },[])
  console.log(isLogin)
  return (
    <div className='h-full w-full'>
      <div className="w-full ">
        <Header></Header>
      </div>
      <div className='w-full h-full bg-red-100'>
        <div className='ml-4'>
          <Btn category='text' size="big" txtColor='black' txt='취업 포트 폴리오용 사이드 프로젝트 프론트엔드 개발자 모집합니다.'></Btn>
        </div>
        <div className='flex w-full justify-between pb-2' style={{ borderBottom: '1px solid #B3B3B3' }}>
          <div className='ml-4 flex justify-around '>
            <Btn category='text' txtColor="black" size="small" txt="아이디"></Btn>
            <span className='mr-2'>시간</span>
            <span>조회수</span>
          </div>
          <div className='mr-4 flex justify-around ' > 
            <Btn buttonColor='primary' className='mr-2' txt="모집중" size="small"></Btn>
            {isLogin && (
            <div className='flex'>
              <Btn className='mr-2' buttonColor='secondary' txt="수정" size="small"></Btn>
              <Btn  buttonColor='headerBtn' txt="삭제" size="small"></Btn>
            </div>
            )}
            {!isLogin && (
            <div className='flex'>
              <Btn buttonColor='headerBtn' txt="관심" size="small"></Btn>
            </div>
            )}
          </div>
        </div>
        <div className='px-4 py-4'>
          "모집예시~"
        </div>
      </div>

    </div>
  )
}

export default ReadPage