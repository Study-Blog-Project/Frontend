
import PostDiv from '../../components/postDiv/PostDiv';
import Header from '../../components/header/Header';
import Banner from '../../components/banner/Banner';
import Input from '../../components/input/Input';
import Btn from '../../components/button/Btn';
import Tab from '../../components/tab/Tab';

function MainPage() {
  return (
    <div className='h-screen w-screen'>
      <div><Header></Header></div>
      <div className='flex justify-center'>
        <Banner size="full" bannerColor='secondary' txt="프로젝트 팀원을 모집해보세요." txtColor='white'>{"협업을 통한 경험 노하우 쌓기!"}</Banner>
      </div>
      <div className='ml-16'>
        <Tab content={["전체","코테","프로젝트","cs","etc"]}></Tab>
      </div>
      <div className='flex justify-between '>
        <Input size="full" place='팀프로젝트,코테,스터디를 검색해보세요!' className='ml-12'></Input>
        <Btn className='mr-3' size="default" txt='검색'></Btn>
      </div>
      <div>
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
      
      <div>
        {/* 여기에 페이지 div */}
      </div>
    </div>
  );
}

export default MainPage;
