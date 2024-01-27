
import PostDiv from '../../components/postDiv/PostDiv';
import Banner from '../../components/banner/Banner';
import Input from '../../components/input/Input';
import Btn from '../../components/button/Btn';
import Tab from '../../components/tab/Tab';
import { BoardResponseDto,MainListInfo } from '../../components/dto/Dto';
import React, { useEffect,useState } from 'react';
import { createMainlistConfig } from '../../components/state/AxiosModule';
import axios from 'axios';
import Pagination from '../../components/button/Pagination';
import {useNavigate, useSearchParams} from 'react-router-dom';
import MainLoyout from "../../layout/MainLoyout";

// <Tab onTabSelect={handleTabSelect} content={["전체","코테","프로젝트","cs","etc"]} defaultSelected={"전체"}></Tab>
const categoryList = [
  { category: '전체', value: 'ALL' },
  { category: '코테', value: 'CODING_TEST' },
  { category: '프로젝트', value: 'PROJECT' },
  { category: 'CS', value: 'CS' },
  { category: '기타', value: 'ETC' },
];

function MainPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams(); // URLSearchParams

  const [page,setPage] = useState<number>(0);
  const [mainListInfo, setMainListInfo] = useState<MainListInfo>({
    order: page-1,
    category: 'CS',
  });
  const [boardResponse, setBoardResponse] = useState<BoardResponseDto | null>(null);

  const [selectedTabContent, setSelectedTabContent] = useState<string | null>(null);
  const handleTabSelect = (content: string) => {
    setSelectedTabContent(content);
    setCategory(content);
  };
  
  const handlePageChange = (newPage: number) => {
    console.log(newPage)
    setMainListInfo((prevInfo) => ({
      ...prevInfo,
      order: newPage - 1,
    }));
  };

  // Category 설정
  const getCategory = () => {
    return categoryList.find(x => x.value === searchParams.get('category'))?.category ?? '전체'
  }
  // Category 설정
  const setCategory = (category: string) => {
    setSearchParams({category: categoryList.find(x => x.category === category)?.value ?? 'ALL'})
  }

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
    <MainLoyout>
      <Tab onTabSelect={handleTabSelect} content={categoryList.map(x => x.category)} defaultSelected={getCategory()}></Tab>
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
    </MainLoyout>

  );
}

export default MainPage;
