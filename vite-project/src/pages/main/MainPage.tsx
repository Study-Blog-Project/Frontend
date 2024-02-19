import PostDiv from "../../components/postDiv/PostDiv";

import Input from "../../components/input/Input";
import Btn from "../../components/button/Btn";
import Tab from "../../components/tab/Tab";
import { BoardResponseDto } from "../../components/dto/Dto";
import { useEffect, useState } from "react";
import { createMainlistConfig } from "../../components/state/AxiosModule";
import axios from "axios";
import Pagination from "../../components/button/Pagination";
import { useNavigate, useSearchParams } from "react-router-dom";
import MainLoyout from "../../layout/MainLoyout";
import { useAuthStore } from "../../components/state/Login";

const categoryList = [
  { category: "전체", value: "전체" },
  { category: "코테", value: "코테" },
  { category: "프로젝트", value: "프로젝트" },
  { category: "CS", value: "CS" },
  { category: "기타", value: "기타" },
];

const orderList = [
  { order: "최신순", value: "0" },
  { order: "인기순", value: "1" },
];

function MainPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams(); // URLSearchParams
  const {isLogin} = useAuthStore();
  const [page, setPage] = useState<string | null>("0");

  const [boardResponse, setBoardResponse] = useState<BoardResponseDto | null>(null);

  const [selectedTabContent, setSelectedTabContent] = useState<string | null>("전체");
  const [selectedOrderContent, setSelectedOrderContent] = useState<string | null>("0");

  const [searchValue, setSearchValue] = useState<string | null>("");

  const handleInputChange = (value: string) => {
    setSearchValue(value);
  };
  const submitSearchInfo = () => {
    if (selectedOrderContent !== null && page !== null && searchValue !== null && selectedTabContent !== null) {
      setSearchParams({
        page: "0",
        category: selectedTabContent,
        order: selectedOrderContent,
        title: searchValue,
      });
    }
    if (selectedTabContent !== null && selectedOrderContent !== null && page !== null && searchValue !== null) {
      const config = createMainlistConfig({
        category: selectedTabContent,
        order: selectedOrderContent,
        page: page,
        title: searchValue,
      });
      console.log(config);
      axios(config)
        .then((response) => {
          setBoardResponse(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  const handleCategoryTabSelect = (content: string) => {
    setSelectedTabContent(content); // 선택된 탭 콘텐츠 설정
    setCategory(content); // 선택된 탭에 따라 카테고리 업데이트
  };

  const handleOrderTabSelect = (content: string) => {
    const selectedValue = orderList.find((item) => item.order === content)?.value ?? "1";
    setSelectedOrderContent(selectedValue); // 선택된 탭 콘텐츠 설정
    setOrder(selectedValue); // 선택된 탭에 따라 카테고리 업데이트
  };

  const handlePageChange = (newPage: number) => {
    console.log("newPage" + newPage);
    newPage = newPage - 1;
    const page = newPage.toString();
    if (selectedOrderContent !== null && selectedTabContent !== null) {
      setSearchParams({
        page: page,
        category: selectedTabContent,
        order: selectedOrderContent,
      });
    }
    if (selectedTabContent !== null && selectedOrderContent !== null) {
      const config = createMainlistConfig({
        category: selectedTabContent,
        order: selectedOrderContent,
        page: page,
      });
      console.log(config);
      axios(config)
        .then((response) => {
          setBoardResponse(response.data);
          // scroll to top slowly
          window.scrollTo({ top: 0, behavior: "smooth" });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  // useEffect(()=>{
  //   if(isLogin === true){
  //     console.log("isLogin:",isLogin)
  //     const config = createMainlistConfig({
  //       category: "전체",
  //       order: "0",
  //     });
  //     axios(config)
  //     .then((response) => {
  //       setBoardResponse(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  //   }
  // },[isLogin])

  // Category 설정
  const getCategory = () => {
    console.log(categoryList.find((x) => x.value === searchParams.get("category"))?.category ?? "전체");
    return categoryList.find((x) => x.value === searchParams.get("category"))?.category ?? "전체";
  };
  //order설정
  const getOrder = () => {
    console.log(orderList.find((x) => x.order === searchParams.get("order"))?.order ?? "1");
    return orderList.find((x) => x.order === searchParams.get("order"))?.order ?? "1";
  };

  const setCategory = (category: string) => {
    console.log(selectedOrderContent, "^^^^^^^^");
    if (selectedOrderContent !== null && page !== null) {
      setSearchParams({
        page: "0",
        category: categoryList.find((x) => x.category === category)?.value ?? "전체",
        order: selectedOrderContent,
      });
    }

    console.log("^^");

    const selectedCategory = categoryList.find((x) => x.category === category)?.value ?? "전체";
    console.log(selectedCategory);
    if (page !== null && selectedOrderContent !== null) {
      const config = createMainlistConfig({
        category: selectedCategory,
        order: selectedOrderContent,
        page: page,
      });
      console.log(config);
      axios(config)
        .then((response) => {
          setBoardResponse(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const setOrder = (order: string) => {
    if (selectedTabContent !== null && page !== null) {
      setSearchParams({
        page: "0",
        category: selectedTabContent,
        order:order
      });
    }
    console.log(orderList)
    const selectedOrder = order
    console.log(selectedOrder);

    if (selectedTabContent !== null && page !== null) {
      const config = createMainlistConfig({
        category: selectedTabContent,
        order: selectedOrder,
        page: page,
      });
      console.log(config);

      axios(config)
        .then((response) => {
          console.log(response.data);
          setBoardResponse(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    console.log(boardResponse);
    if (boardResponse) {
      const { pageable } = boardResponse;

      if (pageable) {
        const { pageNumber } = pageable;
        setPage(pageNumber.toString());
      }
    }
  }, [boardResponse]);

  const fetchData = async () => {
    const config = createMainlistConfig({
      category: searchParams.get("category") || "전체",
      order: searchParams.get("order") || "0",
    });
    console.log(config);
    axios(config)
      .then((response) => {
        setBoardResponse(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    console.log("^^")
    fetchData();
  }, [isLogin]);



  const linkToPost = (boardId: number) => {
    navigate(`/read/${boardId}`);
  };

  const PostDivs = (boardResponse: BoardResponseDto) => {
    return boardResponse.content.map((boardItem) => (
      <PostDiv
        key={boardItem.boardId}
        firstPin={{ txt: boardItem.recurit }}
        secondPin={{ txt: boardItem.type }}
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
      <div className="flex justify-between w-full">
        <Tab onTabSelect={handleCategoryTabSelect} content={categoryList.map((x) => x.category)} defaultSelected={getCategory()}></Tab>
        <Tab className="justify-end" onTabSelect={handleOrderTabSelect} content={orderList.map((x) => x.order)} defaultSelected={getOrder()}></Tab>
      </div>
      <div className="flex justify-between space-x-2 mb-2">
        <Input onChange={(value) => handleInputChange(value)} size="full" placeHolder="팀프로젝트,코테,스터디를 검색해보세요!"></Input>
        <Btn handleBtn={submitSearchInfo} size="default" rounded={true} txt="검색"></Btn>
      </div>
      <div className="cursor-pointer">{boardResponse && PostDivs(boardResponse)}</div>
      <div className="flex justify-center items-center py-4">
        {boardResponse && <Pagination currentPage={Number(page)} totalPages={boardResponse.totalPages} onPageChange={handlePageChange}></Pagination>}
      </div>
    </MainLoyout>
  );
}

export default MainPage;
