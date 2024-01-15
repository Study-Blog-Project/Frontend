//import Tab from '../components/tab/Tab'
import axios from 'axios';
//import Pagination from '../components/button/Pagination';
function TestPage() {
  console.log("^^")
  const postData = {
    name: '김구',
    pwd: '1234',
    email: '2dd2dd@naver.c1om',
    checkPwd: '23'
  };
  
  axios.post('http://localhost:8080/sign', postData)
  .then(response => {
    console.log('성공적으로 요청을 보냈습니다.', response.data);
  })
  .catch(error => {
    console.error('요청을 보내는 중 오류가 발생했습니다.', error);
  });

  return (
    <div className='w-screen'>
      
    </div>
  )
}

export default TestPage