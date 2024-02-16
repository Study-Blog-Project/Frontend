import { Routes, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import MainPage from "./pages/main/MainPage";
import WritePage from "./pages/post/WritePage";
import ReadPage from "./pages/post/ReadPage";
import ModifyPostPage from "./pages/post/ModifyPostPage";
import MyPage from "./pages/myPage/MyPage";
import CheckUsersInfo from "./pages/admin/CheckUsersInfo";

function App() {


  return (
    <CookiesProvider>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/write" element={<WritePage />} />
        <Route path="/read/:boardId" element={<ReadPage />} />
        <Route path="/modify/:boardId" element={<ModifyPostPage />} />
        <Route path="/myPage" element={<MyPage />} />
        <Route path="/admin/checkUsersInfo" element={<CheckUsersInfo />} />
        <Route path="/admin/dashBoard" element={<MyPage />} />
      </Routes>
    </CookiesProvider>
  );
}

export default App
