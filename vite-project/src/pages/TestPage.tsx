//import Tab from '../components/tab/Tab'
import axios from "axios";
import Pagination from '../components/button/Pagination';
function TestPage() {
  console.log("^^");
  const handlePageChange = (newPage: number) => {
    console.log(newPage)
  };
  




  return <div className="w-screen">
    <Pagination totalPages={11} currentPage={11} onPageChange={handlePageChange} ></Pagination>
  </div>;
}

export default TestPage;
