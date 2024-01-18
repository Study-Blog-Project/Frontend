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

export interface WriteInfo{
  recruit:  string,
  content: string
  category: string,
  title: string,
  id:number,
}