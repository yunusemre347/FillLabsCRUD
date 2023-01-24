
type GetIDFunction = (id: string) => void;

interface UserState  {
    _id?: string
    firstname: string;
    lastname: string;
  }
type SingleUserProps = {
    user: UserState,
    getID: GetIDFunction,
    button: string
}



export const SingleUser = ({user,getID,button}:SingleUserProps) => {
  const ident : string |undefined = user?._id
  return (
    <div className='single-user' key={user._id}>
          <div><span>&nbsp; {user?.firstname}</span></div><div><span> &nbsp;{user?.lastname}</span></div>
        <input className='row' style={button=="Create" ? {display:"none"} : {display:"inline"}} type={"radio"} onChange={()=>(ident? getID(ident):"")} name={"1"} ></input>
    </div> 
  )
}
