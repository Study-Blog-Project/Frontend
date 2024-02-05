import { Routes, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import  LoginPage from "./pages/login/LoginPage";
import SignInPage from "./pages/signIn/SignInPage";
import MainPage from "./pages/main/MainPage";
import WritePage from "./pages/post/WritePage";
import TestPage from "./pages/TestPage";
import ReadPage from "./pages/post/ReadPage";

import ModifyPostPage from "./pages/post/ModifyPostPage";
import MyPage from "./pages/myPage/MyPage";

function App() {


  return (
    <CookiesProvider>
      <Routes>
        <Route path="/" element={<TestPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signIn" element={<SignInPage />}></Route>
        <Route path="/main" element={<MainPage />}></Route>
        <Route path="/write" element={<WritePage />}></Route>
        <Route path="/read/:boardId" element={<ReadPage />} />
        <Route path="/modify/:boardId" element={<ModifyPostPage />} />
        <Route path="/myPage" element={<MyPage />}>
          
          
        </Route>
        
      </Routes>
    </CookiesProvider>
  );
}

export default App
