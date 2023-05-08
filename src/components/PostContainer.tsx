import { FC, useState, useEffect } from 'react'
import { postAPI } from '../services/PostService'
import PostItem from './PostItem'
import { IPost } from '../models/IPost'

//сделали такойже PostContainer2 но запрос все равно один rtkQuery кеширует запросы и не дает лишние если ненужно

const PostContainer: FC = () => {
  const [limit, setLimit] = useState(100)
  //rtkQuery Генерирует хуки на базе описанных ендпоинтов
  //fetchAllPosts это самописное назавание useFetchAllPostsQuery(10) это как бы один запрос
  //refetch это перезапросить у сервера, даже если у нас данные закешированы
  const { data: posts, error, isLoading, refetch } = postAPI.useFetchAllPostsQuery(limit, {
    //пулять запросы каждую секунду, еще есть refetchOnFocus и другие  это используется в чатах уведомлениях  аналог вебсокетов
    pollingInterval: 10000
  })
  //этот уже возвращает кортеж [функция вызывая которую мы запускам мутацию, {} объект как и выше]
  //useCreatePostMutation({}) можем передавать селектор и вытягивать какието данные
  //меняем названия чтоб не повторялись
  const [createPost, { error: createError, isLoading: isCreateLoading }] = postAPI.useCreatePostMutation()
  const [deletePost, { }] = postAPI.useDeletePostMutation()
  const [updatePost, { }] = postAPI.useUpdatePostMutation()


  useEffect(() => {
    // setTimeout(() => {
    //   setLimit(3)
    // }, 2000)
  }, [])

  const hadleCreate = async () => {
    const title = prompt('напишите название') || 'не указано'
    //передаем в неё объект типа post
    await createPost({
      title: title,
      body: 'some'
      //id: 458 //этот айди сервер проигнорирует (можно сделать приведение типов)
    } as IPost) //поскольку айдишник сервер назанчает сам и мы не можем его указать, нужно приведение
  }

  const handleRemove = (post: IPost) => {
    deletePost(post)
  }
  const handleUpdate = (post: IPost) => {
    updatePost(post)
  }

  error && console.log(error)
  return (
    <div>
      <div className='post__list'>
        <button onClick={hadleCreate}>Add new post</button>
        <button onClick={() => refetch()}> REFETCH</button>
        {isLoading && <h1>Идет загрузка</h1>}
        {error && <h1>ошибка</h1>}
        {posts && posts.map(post =>
          <PostItem remove={handleRemove} update={handleUpdate} key={post.id} post={post} />
        )}
      </div>
    </div>
  )
}
export default PostContainer