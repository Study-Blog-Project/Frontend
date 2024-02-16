import { useEffect, useState } from 'react'
import { createGetAllUsersInfoConfig } from '../../components/state/AxiosModule';
import axios from 'axios';
import Input from '../../components/input/Input';
import Btn from '../../components/button/Btn';
import { UserResponseDto } from '../../components/dto/Dto';

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
      setUserData(response.data);
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
      setUserData(response.data)
    })
    .catch(error => {
      // 오류 처리
      console.error('Error:', error);
    });
  }
  
  useEffect(()=>{
    
  },[userData])
  useEffect(()=>{
    fetchAllData();
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