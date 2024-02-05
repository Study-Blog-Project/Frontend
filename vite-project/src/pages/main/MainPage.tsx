
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
import {Link, useNavigate, useSearchParams} from 'react-router-dom';
import MainLoyout from "../../layout/MainLoyout";

// <Tab onTabSelect={handleTabSelect} content={["전체","코테","프로젝트","cs","etc"]} defaultSelected={"전체"}></Tab>
const categoryList = [
  { category: '전체', value: '전체' },
  { category: '코테', value: '코테' },
  { category: '프로젝트', value: '프로젝트' },
  { category: 'CS', value: 'CS' },
  { category: '기타', value: '기타' },
];

function MainPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams(); // URLSearchParams

  const [page,setPage] = useState<number>(0);
  const [mainListInfo, setMainListInfo] = useState<MainListInfo>({
    category: "CS",
    order: 0
  });
  const [boardResponse, setBoardResponse] = useState<BoardResponseDto | null>(null);

  const [selectedTabContent, setSelectedTabContent] = useState<string | null>(null);
  
  const handleTabSelect = (content: string) => {
    setSelectedTabContent(content); // 선택된 탭 콘텐츠 설정
    setCategory(content); // 선택된 탭에 따라 카테고리 업데이트
  
    // 선택된 탭에 해당하는 쿼리스트링 설정

  };
  
  
  const handlePageChange = (newPage: number) => {
    console.log("newPage"+newPage)
    setMainListInfo((prevInfo) => ({
      ...prevInfo,
      order: newPage - 1,
    }));
  };
  useEffect(()=>{
    console.log("AAA")
  },[mainListInfo])

  // Category 설정
  const getCategory = () => {
    return categoryList.find(x => x.value === searchParams.get('category'))?.category ?? '전체'
  }

  const setCategory = (category: string) => {
    // Category 설정
    setSearchParams({category: categoryList.find(x => x.category === category)?.value ?? 'ALL'})

    console.log("^^")
 
    const selectedCategory = categoryList.find(x => x.category === category)?.value ?? 'ALL';
    console.log(selectedCategory)
    
    const config = createMainlistConfig({
      category: selectedCategory,
      order:0,
    });
  
    axios(config)
      .then(response => {
        //console.log(response.data);
        setBoardResponse(response.data);
   
      })
      .catch(error => {
        console.error(error);
      });
  };
  

  useEffect(()=>{
    console.log(boardResponse)
    if(boardResponse){
        const { pageable } = boardResponse;

        if (pageable) {
          const { pageNumber, pageSize, sort, offset, paged, unpaged } = pageable;
          setPage(pageNumber);
      }
      
    }
  },[boardResponse])

  const fetchData = async () => {
    const config = createMainlistConfig({
      category: searchParams.get('category') || 'CS',
      order: Number(searchParams.get('order')) || 1,
    });

    try {
      const response = await axios(config);
      if (response.data.statusCode === 200) {
        setBoardResponse(response.data);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(()=>{
    fetchData();
  },[])
  


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
      <div className='flex justify-between space-x-2 mb-2'>
        <Input size="full" placeHolder='팀프로젝트,코테,스터디를 검색해보세요!' ></Input>
        <Btn size="default" rounded={true} txt='검색'></Btn>
      </div>
      <div className='cursor-pointer'>
        {boardResponse && PostDivs(boardResponse)}
      </div>
      <div className="flex justify-center items-center">
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
