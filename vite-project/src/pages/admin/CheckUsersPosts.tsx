import { useEffect } from 'react';
import Header from "../../components/header/Header";
import MyPost from '../myPage/MyPost';
import MainLoyout from '../../layout/MainLoyout';
import { useAuthStore } from '../../components/state/Login';
function CheckUsersPosts() {
  const {role} = useAuthStore();

  useEffect(()=>{

  },[])


  return (
    <MainLoyout>
    <div className="h-full  w-full">
      <div className="w-full ">
        <Header />
      </div>
      <div className="flex flex-row w-full h-full">
          <MyPost role={role}/>
      </div>
    </div>
    </MainLoyout>
  );
}

export default CheckUsersPosts;
