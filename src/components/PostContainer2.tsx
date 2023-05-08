import { FC } from 'react'
import { postAPI } from '../services/PostService'
import PostItem from './PostItem'

const PostContainer2: FC = () => {
  //rtkQuery Генерирует хуки на базе описанных ендпоинтов
  //fetchAllPosts это самописное назавание useFetchAllPostsQuery(10) это как бы один запрос
  const { data: posts, error, isLoading } = postAPI.useFetchAllPostsQuery(10)
  error && console.log(error)
  return (
    <div>
      <div className='post__list'>
        {isLoading && <h1>Идет загрузка</h1>}
        {error && <h1>ошибка</h1> }
        {/* {posts && posts.map(post => 
          <PostItem key={post.id} post={post}/>
          )} */}
      </div>
    </div>
  )
}
export default PostContainer2