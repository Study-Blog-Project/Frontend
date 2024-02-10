import React, { useEffect, useState } from 'react'
import { createGetAllUsersInfoConfig } from '../../components/state/AxiosModule';
import axios from 'axios';
import Input from '../../components/input/Input';
import Btn from '../../components/button/Btn';
import { UserResponseDto } from '../../components/dto/Dto';
const test={
  "totalElements": 0,
  "totalPages": 0,
  "size": 0,
  "content": [
    {
      "seq": 1,
      "username": "김미",
      "nickname": "jac",
      "email": "jac@naver.com",
      "role": "ROLE_USER"
    },{
      seq: 2,
      username: "홍길동",
      nickname: "hong",
      email: "hong@example.com",
      role: "ROLE_USER"
    },
    {
      seq: 3,
      username: "이순신",
      nickname: "shin",
      email: "shin@example.com",
      role: "ROLE_USER"
    },
    {
      seq: 4,
      username: "유승민",
      nickname: "yoo",
      email: "yoo@example.com",
      role: "ROLE_USER"
    },
    {
      seq: 5,
      username: "박지성",
      nickname: "park",
      email: "park@example.com",
      role: "ROLE_USER"
    },
    {
      seq: 6,
      username: "손흥민",
      nickname: "son",
      email: "son@example.com",
      role: "ROLE_USER"
    },
    {
      seq: 7,
      username: "김연아",
      nickname: "kim",
      email: "kim@example.com",
      role: "ROLE_USER"
    },
    {
      seq: 8,
      username: "류현진",
      nickname: "ryu",
      email: "ryu@example.com",
      role: "ROLE_USER"
    },
    {
      seq: 9,
      username: "이대호",
      nickname: "lee",
      email: "lee@example.com",
      role: "ROLE_USER"
    },
    {
      seq: 10,
      username: "박찬호",
      nickname: "park",
      email: "park@example.com",
      role: "ROLE_USER"
    },
    {
      seq: 11,
      username: "김연경",
      nickname: "kim",
      email: "kim@example.com",
      role: "ROLE_USER"
    }
  ],
  "number": 0,
  "sort": {
    "empty": true,
    "sorted": true,
    "unsorted": true
  },
  "first": true,
  "last": true,
  "numberOfElements": 0,
  "pageable": {
    "offset": 0,
    "sort": {
      "empty": true,
      "sorted": true,
      "unsorted": true
    },
    "pageNumber": 0,
    "pageSize": 0,
    "unpaged": true,
    "paged": true
  },
  "empty": true
}

function CheckUsersInfo() {
  const [nickName, setnickName] = useState("");
  const configAllData = createGetAllUsersInfoConfig();
  const config = createGetAllUsersInfoConfig(nickName);
  const [userData, setUserData] = useState<UserResponseDto | null>(null); 

  const handleInputChange = (value: string) => {
    setnickName(value)
  };

  const fetchAllData = async()=>{
    axios(configAllData)
    .then(response => {
      
      console.log(response.data);
    })
    .catch(error => {
      // 오류 처리
      console.error('Error:', error);
    });
  }

  const fetchSpecificiUserData = async()=>{
    axios(config)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      // 오류 처리
      console.error('Error:', error);
    });
  }
  
  useEffect(()=>{
    console.log(userData)
  },[userData])
  useEffect(()=>{
    //fetchAllData();
    setUserData(test);
    
  },[])

  return (
    <div className="h-full w-full">
      <div className='flex justify-between space-x-2 mb-2 mx-4 my-4'>
        <Input onChange={(value) => handleInputChange(value)} ></Input>
        <Btn handleBtn={fetchSpecificiUserData} size="default" rounded={true} txt='검색'></Btn>
      </div>
      {userData && (
        <div className="flex flex-col mx-4">
          <div className="flex border p-4">
            <div className="flex-1">이름</div>
            <div className="flex-1">닉네임</div>
            <div className="flex-1">이메일</div>
            <div className="flex-1">역할</div>
          </div>
          {userData.content.map(user => (
            <div key={user.seq} className="flex border p-4">
              <div className="flex-1">{user.username}</div>
              <div className="flex-1">{user.nickname}</div>
              <div className="flex-1">{user.email}</div>
              <div className="flex-1">{user.role === 'ROLE_USER' ? '유저' : '관리자'}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
  
  
}

export default CheckUsersInfo