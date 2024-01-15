
import Pin from '../pin/Pin'
import { PinProps } from '../pin/Pin'
interface PostDivProps{
  firstPin?:PinProps
  secondPin?:PinProps
  title?:string
  content?:string
  id?:string
  time?:string
  view?:string
  comment?:string
}
function PostDiv(props: PostDivProps) {
  const {firstPin, secondPin,title,content,id,time,view,comment } = props;
  
  return (
    //배경색 빨강은 제거예정
    <div className="w-full h-full bg-red-100 px-2 py-2 border-b border-solid border-black sm:w-full md:w-full lg:w-full xl:w-full flex flex-col">
      <div className='flex '>
        <div className='ml-2  flex justify-between'>
          {firstPin && <Pin className="mr-2"pinColor={firstPin.pinColor} txt={firstPin.txt}/>}
          {secondPin && <Pin pinColor={secondPin.pinColor} txt={secondPin.txt}/>}
        </div>
        <div className='ml-10'>
          <span>{title}</span>
        </div>
      </div>
      <div className='ml-2 mt-2'>
        <span>{content}</span>
      </div>
      <div className='flex justify-between'>
        <div className='ml-2 mt-2'>
          <span className='mr-4'>{id}</span>
          <span>{time}</span>
        </div>
        <div className='mr-2'>
          <span className='mr-4'>{view}</span>
          <span>{comment}</span>
        </div>
      </div>
    </div>
  );
}

export default PostDiv;