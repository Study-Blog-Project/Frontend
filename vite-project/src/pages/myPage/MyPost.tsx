import React from "react";
import Header from "../../components/header/Header";
import Btn from "../../components/button/Btn";
import Tab from "../../components/tab/Tab";
import PostDiv from "../../components/postDiv/PostDiv";
function MyPost() {
  return (
    <div className="h-screen  w-screen">
      
      <div className="w-full ">
        <Header></Header>
      </div>

      <div className="flex flex-row w-full h-full">

        <div className="bg-red-100 basis-1/4">
          <div className="flex flex-col w-full h-1/5 bg-blue-100 mt-10">
            <Btn category="text" size="default" txt="내가 작성한 글" txtColor="black"></Btn>
            <Btn category="text" size="default" txt="사용자 정보" txtColor="black"></Btn>
            <Btn category="text" size="default" txt="관심 스터디" txtColor="black"></Btn>
          </div>
        </div>

        <div className="bg-blue-100 basis-3/4 ">
          <div className="w-full bg-red-100 h-24 mt-5 border-2 border-gray-400 border-solid rounded-lg flex pl-6 items-center">
            <Tab content={["전체","코테","프로젝트","cs","etc"]}></Tab>
          </div>
          <div className="w-full bg-green-100 h-24 flex pl-6 items-center justify-between border-b border-solid border-gray-400 ">
            <Tab content={["전체","모집중","모집완료"]}></Tab>
            <div className="basis-32 pr-8 ">
              <Btn size="default" txt="글쓰기" buttonColor="secondary"></Btn>
            </div>
          </div>
          <div className="w-full flex flex-col">
            <PostDiv 
            firstPin={{ pinColor: 'red', txt: 'Sample text', }}
            secondPin={{ pinColor: 'green', txt: 'aaaaaaa', }}
            title="안녕하쇼"
            content="반갑"
            id="아이디"
            time="시간"
            view="조회수"
            comment='댓글수'
          />
            <PostDiv 
            firstPin={{ pinColor: 'red', txt: 'Sample text', }}
            secondPin={{ pinColor: 'green', txt: 'aaaaaaa', }}
            title="안녕하쇼"
            content="반갑"
            id="아이디"
            time="시간"
            view="조회수"
            comment='댓글수'
          />
            <PostDiv 
            firstPin={{ pinColor: 'red', txt: 'Sample text', }}
            secondPin={{ pinColor: 'green', txt: 'aaaaaaa', }}
            title="안녕하쇼"
            content="반갑"
            id="아이디"
            time="시간"
            view="조회수"
            comment='댓글수'
          />
          </div>
        </div>

      </div>
    </div>
  );
}

export default MyPost;
