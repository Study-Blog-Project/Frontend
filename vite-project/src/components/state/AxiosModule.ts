
import axios, { AxiosRequestConfig } from "axios";
import { LoginInfo ,SignInInfo , WritePostInfo,MainListInfo,ReadPostInfo,UserPostInfo, UserListRequestInfo, ModifyPostInfo, DeletePostInfo, ModifyUserInfo, AddParentCommentInfo, AddChildCommentInfo, ModifyCommentInfo} from "../dto/Dto";
import { getAccessToken, getRefreshToken } from "./TokenAction";


//인스턴스만들기
//로그인돼있는지 , 토큰 만료검사 한 1분전쯤이면 리프래시토큰으로 재발급



const BASE_URL = 'http://54.180.21.153:8080';

export type ConfigType = {
  method: string;
  url: string;
  params?: { [key: string]: any }; // eslint-disable-line
  data?: { [key: string]: any }; // eslint-disable-line
  headers?: any; // eslint-disable-line
};

export type AwaitApiType<T> = {
  success: boolean;
  message: string;
  data: T;
  total?: number;
};

export type HeadersType = {
  [key: string]: any; // eslint-disable-line
};

export type AwaitApiResponseType<T> = {
  success: boolean;
  result: AwaitApiType<T> | null;
  error: any; // eslint-disable-line
  headers?: HeadersType;
};

export const authInstance = axios.create({
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

const awaitApi = async (
  _config: ConfigType
  // eslint-disable-next-line
): Promise<AwaitApiResponseType<any>> => {
  try {
    const response = await authInstance({
      baseURL: BASE_URL,
      ..._config
    });
    return {
      success: true,
      result: response.data,
      error: false,
      headers: response.headers
    };
  } catch (e) {
    return {
      success: false,
      result: null,
      error: e
    };
  }
};





export const createSignInConfig = (requestBody: SignInInfo): AxiosRequestConfig => {
  const config: AxiosRequestConfig = {
    baseURL: 'http://54.180.21.153:8080', 
    url: '/sign',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: requestBody,
  };

  return config;
};

// export const createLoginConfig = (requestBody: LoginInfo): AxiosRequestConfig => {
//   const config: AxiosRequestConfig = {
//     baseURL: 'http://54.180.21.153',
//     url: '/get',
//     method: 'get',
//     headers: {
//       'Content-Type': 'application/json',
//     },
    
//     withCredentials: true,
//   };

//   return config;
// };
export const createLoginConfig = (requestBody: LoginInfo): AxiosRequestConfig => {
  const config: AxiosRequestConfig = {
    baseURL: 'http://54.180.21.153:8080',
    url: '/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: requestBody,
    withCredentials: true,
  };

  return config;
};


export const createWriteConfig = (requestBody: WritePostInfo): AxiosRequestConfig => {
  const refresh = getRefreshToken()
  const access = getAccessToken()
  const config: AxiosRequestConfig = {
    baseURL: 'http://54.180.21.153:8080',
    url: '/board/member/writing',
    method: 'POST',
    headers: {
      'Access_Token': access,
      'Refresh-Token': refresh,
      'Content-Type': 'application/json',
    },
    data: requestBody,
  };

  return config;
};

// export const createMainlistConfig = (requestBody:any): AxiosRequestConfig => {
//   const config: AxiosRequestConfig = {
//     baseURL: 'http://54.180.21.153:8080',
//     url: '/',
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     params: requestBody,
//     withCredentials: true,
//   };

//   return config;
// };
export const createMainlistConfig = (requestBody:any): AxiosRequestConfig => {
  const refresh = getRefreshToken()
  const access = getAccessToken()
  const config: AxiosRequestConfig = {
    baseURL: 'http://54.180.21.153:8080',
    url: '/',
    method: 'GET',
    headers: {
      'Access_Token': access,
      'Refresh_Token': refresh,
      'Content-Type': 'application/json',
    },
    params: requestBody,
    withCredentials: true,
  };

  return config;
};

export const createReadPostConfig = (requestBody: string): AxiosRequestConfig => {
  const refresh = getRefreshToken()
  const access = getAccessToken()
  const config: AxiosRequestConfig = {
    baseURL: 'http://54.180.21.153:8080', 
    url: `/board/${requestBody}`,
    method: 'GET',
    headers: {
      'Access_Token': access,
      'Refresh_Token': refresh,
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  };

  return config;
};

export const createUserPostConfig = (requestBody: UserListRequestInfo): AxiosRequestConfig => {
  const { recruit, category, order } = requestBody;
  const access = getAccessToken();
  const refresh = getRefreshToken();
  const config: AxiosRequestConfig = {
    baseURL: 'http://54.180.21.153:8080', 
    url: `/user/list`,
    method: 'GET',
    headers: {
      'Access_Token': access,
      'Refresh_Token': refresh,
      'Content-Type': 'application/json',
    },
    params: {
      recruit,
      category,
      order,
    },
    withCredentials: true,
  };

  return config;
};

export const createModifyPostConfig = (requestBody: ModifyPostInfo): AxiosRequestConfig => {

  const access = getAccessToken();
  const refresh = getRefreshToken();

  const config: AxiosRequestConfig = {
    baseURL: 'http://54.180.21.153:8080', 
    url: `/board/member/updateWrite`,
    method: 'PATCH',
    headers: {
      'Access_Token': access,
      'Refresh_Token': refresh,
      'Content-Type': 'application/json',
    },
    data: requestBody,
    withCredentials: true,
  };

  return config;
};

export const createRemovePostConfig = (requestBody: DeletePostInfo): AxiosRequestConfig => {

  const access = getAccessToken();
  const refresh = getRefreshToken();

  const config: AxiosRequestConfig = {
    baseURL: 'http://54.180.21.153:8080', 
    url: `/board/member/delete`,
    method: 'DELETE',
    headers: {
      'Access_Token': access,
      'Refresh_Token': refresh,
      'Content-Type': 'application/json',
    },
    params: requestBody,
    withCredentials: true,
  };

  return config;
};

export const createGetUserInfoConfig = (): AxiosRequestConfig => {

  const access = getAccessToken();
  const refresh = getRefreshToken();

  const config: AxiosRequestConfig = {
    baseURL: 'http://54.180.21.153:8080', 
    url: `/user/info`,
    method: 'GET',
    headers: {
      'Access_Token': access,
      'Refresh_Token': refresh,
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  };

  return config;
};


export const createModifyUserInfoConfig = (requestBody:ModifyUserInfo): AxiosRequestConfig => {

  const access = getAccessToken();
  const refresh = getRefreshToken();

  const config: AxiosRequestConfig = {
    baseURL: 'http://54.180.21.153:8080', 
    url: `/user/info/update`,
    method: 'PATCH',
    headers: {
      'Access_Token': access,
      'Refresh_Token': refresh,
      'Content-Type': 'application/json',
    },
    data: requestBody,
    withCredentials: true,
  };

  return config;
};

export const createAddCommentConfig = (requestBody:AddChildCommentInfo|AddParentCommentInfo): AxiosRequestConfig => {

  const access = getAccessToken();
  const refresh = getRefreshToken();

  const config: AxiosRequestConfig = {
    baseURL: 'http://54.180.21.153:8080', 
    url: `/reply/insertReply`,
    method: 'POST',
    headers: {
      'Access_Token': access,
      'Refresh_Token': refresh,
      'Content-Type': 'application/json',
    },
    data: requestBody,

  };

  return config;
};

export const createModifyCommentConfig = (requestBody:ModifyCommentInfo): AxiosRequestConfig => {

  const access = getAccessToken();
  const refresh = getRefreshToken();

  const config: AxiosRequestConfig = {
    baseURL: 'http://54.180.21.153:8080', 
    url: `/reply/updateReply`,
    method: 'PATCH',
    headers: {
      'Access_Token': access,
      'Refresh_Token': refresh,
      'Content-Type': 'application/json',
    },
    data: requestBody,
    withCredentials: true,
  };

  return config;
};


// axios(config)
//   .then((response) => {
//     console.log(response);
//     fetchData();
//   })
//   .catch((error) => {
//     console.log(error);
//   });



export const createDeleteCommentConfig = (requestBody:string): AxiosRequestConfig => {

  const access = getAccessToken();
  const refresh = getRefreshToken();

  const config: AxiosRequestConfig = {
    baseURL: 'http://54.180.21.153:8080', 
    url: `/reply/deleteReply`,
    method: 'DELETE',
    headers: {
      'Access_Token': access,
      'Refresh_Token': refresh,
      'Content-Type': 'application/json',
    },
    params: {
      rno: requestBody, 
    },
    withCredentials: true,
  };

  return config;
};

export const deleteComment = async (replyId: number) => {
  const access = getAccessToken();
  const refresh = getRefreshToken();

  return awaitApi(
    {
      method: 'DELETE',
      url: `/reply/deleteReply`,
      headers: {
        'Access_Token': access,
        'Refresh_Token': refresh,
        'Content-Type': 'application/json',
      },
      params: {
        rno: replyId.toString(),
      },
    },
  );
}

export const createMyLikePostConfig = (requestBody:UserListRequestInfo): AxiosRequestConfig => {

  const { recruit, category, order } = requestBody;
  const access = getAccessToken();
  const refresh = getRefreshToken();
  const config: AxiosRequestConfig = {
    baseURL: 'http://54.180.21.153:8080', 
    url: `/user/userPostLike`,
    method: 'GET',
    headers: {
      'Access_Token': access,
      'Refresh_Token': refresh,
      'Content-Type': 'application/json',
    },
    params: {
      recruit,
      category,
      order,
    },
    withCredentials: true,
  };

  return config;
};

export const createGetAllUsersInfoConfig = (username?:string): AxiosRequestConfig => {


  const access = getAccessToken();
  const refresh = getRefreshToken();
  const config: AxiosRequestConfig = {
    baseURL: 'http://54.180.21.153:8080', 
    url: `/admin/userAll`,
    method: 'GET',
    headers: {
      'Access_Token': access,
      'Refresh_Token': refresh,
      'Content-Type': 'application/json',
    },
    params: {
      username: username,
    },
    withCredentials: true,
  };

  return config;
};
