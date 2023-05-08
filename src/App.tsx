import { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch, useAppSelector } from './hooks/redux'
import { fetchUsers } from './store/reducers/ActionCreators'
import { userSlice } from './store/reducers/UserSlice'
import PostContainer from './components/PostContainer'
import PostContainer2 from './components/PostContainer2'


const App: FC = () => {
  // // const {} = useSelector(state => state.) // с этим не видно за точкой что там бывает, но если указать тип state:RootState то и родной селектор будет работать
  // const { count } = useAppSelector(state => state.userReducer)
  // // const { increment } = userSlice.actions
  // const dispatch = useAppDispatch()
  // const { users, isLoading, error } = useAppSelector(state => state.userReducer)

  // useEffect(() => {
  //   dispatch(fetchUsers())
  // }, [])

  return (
    <div className='App'>
      <div style={{display: 'flex'}}>
        <PostContainer/>
        <PostContainer2/>
      </div>
      
    </div>
    // <div className='App'>
    //   {isLoading && <h1>Идет загрузка</h1>}
    //   {error && <h1>{error}</h1>}
    //   {JSON.stringify(users, null, 2)}
    //   <h1>{count}</h1>
    //   {/* <button onClick={() => dispatch(increment(10))} >increment</button> */}
    // </div>
  )
}
export default App