
import { ModifyPostInfo } from "../../components/dto/Dto"


function ModifyPostPage() {

  const [ModifyPostInfo, setModifyPostInfo] = useState<ModifyPostInfo>({
    title: "",
    category: "",
    content: "",
    boardId:0, //수정
  });

  return (
    <div>ModifyPostPage</div>
  )
}

export default ModifyPostPage