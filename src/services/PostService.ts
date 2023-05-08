import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IPost } from '../models/IPost'

export const postAPI = createApi({
  reducerPath: 'postAPI',
  // baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  //у меня добавленный пост через createPost сразу отображался в браузере а ему пришлось ставить теги
  //теги
  tagTypes: ['Post'],
  endpoints: (build) => ({
    //build.query для get, mutation для put, post
    fetchAllPosts: build.query<IPost[], number>({
      query: (limit = 5) => ({
        url: '/posts',
        params: {
          _limit: limit
        }
      }),
      //этот эндпоинт обеспечивает доставку данных
      providesTags: (result) => ['Post']
    }),
    createPost: build.mutation<IPost, IPost>({
      query: (post) => ({
        url: '/posts',
        method: 'POST',
        body: post
      }),
      //этот эндпоинт говорит что эти данные становятся неактуальными и rtkQuery должен эти данные заново получить
      invalidatesTags: ['Post']
    }),
    updatePost: build.mutation<IPost, IPost>({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: 'PUT',
        body: post
      }),
      //этот эндпоинт говорит что эти данные становятся неактуальными и rtkQuery должен эти данные заново получить
      invalidatesTags: ['Post']
    }),
    deletePost: build.mutation<IPost, IPost>({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: 'DELETE'
      }),
      //этот эндпоинт говорит что эти данные становятся неактуальными и rtkQuery должен эти данные заново получить
      invalidatesTags: ['Post']
    })
  })
})