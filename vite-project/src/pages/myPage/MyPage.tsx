import  { useEffect, useState } from 'react';

import Tab from "../../components/tab/Tab";
import MainLoyout from '../../layout/MainLoyout';
import MyPost from './MyPost';
import MyInfo from './MyInfo';
import MyLikePost from './MyLikePost';



function MyPage() {
  const [selectedInfoTabContent, setSelectedInfoTabContent] = useState<string>('내가 작성한 글');
  const params = location.href;

  // useEffect(()=>{
  //   if(params){
  //     if(params.includes("dashBoard")){
  //       isAllPost=true;
  //     }
  //   }
  // },[params])
  //const [page,setPage] = useState<number>(0);

  const [renderedComponent, setRenderedComponent] = useState<JSX.Element | null>(null); 
  
  const handleInfoTabSelect = (content: string) => {
    setSelectedInfoTabContent(content); // 선택된 Info 탭의 내용 설정
  };









  
  


  useEffect(() => {

    // 여기서 selectedInfoTabContent에 따라 렌더링될 컴포넌트를 설정합니다.
    if (selectedInfoTabContent === '내가 작성한 글') {
      if(params){
        if(params.includes("dashBoard")){
          setRenderedComponent(
            <MyPost isAllPost={true} />
          );
        }
        else{
          setRenderedComponent(
            <MyPost isAllPost={false} />
          );
        }
      }
      
    } else if (selectedInfoTabContent === '사용자 정보') {
      setRenderedComponent(
        <div>
          <MyInfo></MyInfo>
        </div>
      );
    } else if (selectedInfoTabContent === '관심 글') {
      setRenderedComponent(
        
        <div>
          <MyLikePost/>
        </div>
      );
    } else {
      // 이 외의 경우를 처리하거나 필요에 따라 빈 값으로 설정합니다.
      setRenderedComponent(null);
    }
  }, [selectedInfoTabContent, params]);

  return (
    <MainLoyout>
    <div className="h-full  w-full">
        <div className="flex flex-row w-full h-full">
          <div className=" basis-1/3">
            <div className="w-full h-1/4  mt-10">
              <Tab className="flex flex-col p-2" content={["내가 작성한 글", "사용자 정보", "관심 글"]} onTabSelect={handleInfoTabSelect} />
            </div>
          </div>
          <div className=" basis-3/4 ">
            {renderedComponent}
          </div>
        </div>
      </div>
    </MainLoyout>
  );
}

export default MyPage;
