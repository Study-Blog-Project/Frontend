
import Chip from '../chip/Chip'
import { PinProps } from '../chip/Chip'
interface PostDivProps{
  firstPin?:PinProps
  secondPin?:PinProps
  title?:string
  content?:string
  id?:string
  boardId?: number;
  time?:string
  view?:number
  comment?:number
  handlePost?: (boardId: number) => void;
}
function PostDiv(props: PostDivProps) {
  const {firstPin, secondPin,title,content,id,boardId,time,view,comment,handlePost } = props;

  const handleClick = () => {
    if (handlePost && boardId) {
      handlePost(boardId);
    }
  };

  return (
    //배경색 빨강은 제거예정
    <div onClick={handleClick}className="w-full h-full px-2 py-4 border-b border-solid border-gray-100 sm:w-full md:w-full lg:w-full xl:w-full flex flex-col">
      <div className='flex mb-1'>
        <div className='ml-2 flex items-center'>
          {firstPin && <Chip className="mr-1" chipColor={firstPin.chipColor} txt={firstPin.txt}/>}
          {secondPin && <Chip chipColor={secondPin.chipColor} txt={secondPin.txt}/>}
        </div>
        <div className='ml-4 flex-1'>
          <span className="text-lg font-bold text-gray-800">{title}</span>
        </div>
      </div>
      <div className='px-3 line-clamp-1 overflow-hidden text-sm text-gray-600 h-5'>
        {content}
      </div>
      <div className='flex justify-between mt-3 px-2 text-xs text-gray-400'>
        <div className=''>
          <span className='mr-4'>아이디 {id}</span>
          <span>시간 {time}</span>
        </div>
        <div className=''>
          <span className='mr-4'>조회수 {view}</span>
          <span>댓글수 {comment}</span>
        </div>
      </div>
    </div>
  );
}

export default PostDiv;
