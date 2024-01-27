export interface LoginInfo{
  email: string,
  pwd: string
}

export interface SignInInfo{
  name:  string,
  pwd: string
  email: string,
  checkPwd: string,
}

export interface WritePostInfo{
  content: string
  category: string,
  title: string,
  id:number,
}

export interface ModifyPostInfo{
  boardId: number,
  content: string,
  category: string,
  title:string,
}
//-------------------------------메인페이지
export interface MainListInfo{
  order: number,
  category: string,
}





export interface BoardItemDto {
  nickname: string;
  boardId: number;
  recurit: string;
  type: string;
  content: string;
  title: string;
  time: string;
  hitCnt: number;
  replyCnt: number;
  boardCnt: number;
}

export interface PageableDto {
  pageNumber: number;
  pageSize: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface BoardResponseDto {
  content: BoardItemDto[];
  pageable: PageableDto;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}
//-------------------------------상세게시글
export interface ReadPostInfo{
  boardId:number
}

export interface ReplyDto {
  replyId: number;
  replyer: string;
  content: string;
  updateTime: Date;
  myReply: boolean;
}

export interface ReplyResponseDto {
  getTotal: number;
  replies: ReplyDto[];
}

export interface PostDto {
  title: string;
  userId: string;
  updateTime: Date;
  content: string;
  viewCnt: number;
  replyResponseDto: ReplyResponseDto;
}
