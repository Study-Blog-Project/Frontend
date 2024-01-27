
import PostDiv from '../../components/postDiv/PostDiv';
import Header from '../../components/header/Header';
import Banner from '../../components/banner/Banner';
import Input from '../../components/input/Input';
import Btn from '../../components/button/Btn';
import Tab from '../../components/tab/Tab';
import { BoardResponseDto,MainListInfo } from '../../components/dto/Dto';
import { useEffect,useState } from 'react';
import { createMainlistConfig } from '../../components/state/AxiosModule';
import axios from 'axios';
import Pagination from '../../components/button/Pagination';
import { useAuthStore } from '../../components/state/Login';
import { useNavigate } from 'react-router-dom';


function MainPage() {
  const test={};
  const navigate = useNavigate();
  const [page,setPage] = useState<number>(0);
  const [mainListInfo, setMainListInfo] = useState<MainListInfo>({
    order: page-1,
    category: '전체',
  });
  const {isLogin} = useAuthStore();
  const [boardResponse, setBoardResponse] = useState<BoardResponseDto | null>(null);

  const [selectedTabContent, setSelectedTabContent] = useState<string | null>(null);
  const handleTabSelect = (content: string) => {
    setSelectedTabContent(content);
  };
  
  const handlePageChange = (newPage: number) => {
    console.log(newPage)
    setMainListInfo((prevInfo) => ({
      ...prevInfo,
      order: newPage - 1,
    }));
  };

  useEffect(()=>{
    if(boardResponse){
        const { pageable } = boardResponse;

        if (pageable) {
          const { pageNumber, pageSize, sort, offset, paged, unpaged } = pageable;
          setPage(pageNumber);
      }
      
    }
  },[boardResponse])

  useEffect(()=>{
    const fetchData= async () =>{
      const config = createMainlistConfig(mainListInfo); 
      console.log(mainListInfo)
      try {
        const response = await axios(config);
  
        if (response.data.statusCode === 200) {
  
          console.log('성공', response.data);
          setBoardResponse(response.data); 
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
  },[mainListInfo])
  

  useEffect(()=>{
      if (selectedTabContent !== null) {
      setMainListInfo((prevInfo) => ({
        ...prevInfo,
        category: selectedTabContent
      }));
    }
  },[selectedTabContent])


  const linkToPost = (boardId: number) => {
    navigate(`/read/${boardId}`);
  };


  const PostDivs = (boardResponse: BoardResponseDto) => {
    return boardResponse.content.map((boardItem) => (
      <PostDiv
        key={boardItem.boardId}
        firstPin={{txt: boardItem.recurit}}
        secondPin={{txt: boardItem.type}}
        title={boardItem.title}
        boardId={boardItem.boardId}
        content={boardItem.content}
        id={boardItem.nickname} 
        time={boardItem.time}
        view={boardItem.hitCnt}
        comment={boardItem.replyCnt}
        handlePost={() => linkToPost(boardItem.boardId)}
      />
    ));
  };


  return (
    <div className='w-screen h-screen'>
      <div><Header isLogin={isLogin}></Header></div>
      <div className='flex justify-center'>
        <Banner size="full" bannerColor='secondary' txt="프로젝트 팀원을 모집해보세요." txtColor='white'>{"협업을 통한 경험 노하우 쌓기!"}</Banner>
      </div>
      <div className='ml-16 mb-2'>
        <Tab onTabSelect={handleTabSelect} content={["전체","코테","프로젝트","cs","etc"]}></Tab>
      </div>
      <div className='flex justify-between mb-2'>
        <Input className="ml-12" size="full" placeHolder='팀프로젝트,코테,스터디를 검색해보세요!' ></Input>
        <Btn className='mr-3' size="default" txt='검색'></Btn>
      </div>
      <div>
         {boardResponse && PostDivs(boardResponse)}
      </div>
      <div>
        {boardResponse && 
          <Pagination
          currentPage={page}
          totalPages={boardResponse.totalPages}
          onPageChange={handlePageChange}
          >
          </Pagination>
        }
      </div>
    </div>
  );
}

export default MainPage;
