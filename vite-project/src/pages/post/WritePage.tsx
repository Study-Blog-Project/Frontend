import HtmlEditor from "../../components/htmlEditor/HtmlEditor";
import Banner from "../../components/banner/Banner";
function WritePage() {

 return (
   <div className="w-full h-full">
    <div className="w-full flex justify-center py-4" >
      <Banner className="text-3xl font-black" size="full" txt="프로젝트 모집 예시를 참고해 주세요."></Banner>
    </div>
    <div className="ml-12 pb-4 text-2xl font-bold">
      <span>
        제목에 핵심 내용을 요약해보세요.
      </span>
    </div>
    <div className="flex ml-12 pb-4">
      <span>
        모집 구분
      </span>
      <div className="ml-8">
        etc
      </div>
    </div>
    <div className="w-full h-screen" >
      <HtmlEditor></HtmlEditor>
    </div>
     
   </div>
 );
}
export default WritePage;