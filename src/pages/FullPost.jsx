import React,{ useEffect } from "react";
import { useState } from 'react'
import {useParams} from 'react-router-dom';
import ReactMarkdown from 'react-markdown'
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import axios from "../axios";
import { fetchAuthMe, selectIsAuth} from "../redux/slices/auth";
import {
  createComment,
  getPostComments,
} from '../redux/slices/comments'
import { Link } from "react-router-dom";

export const FullPost = () => {
  const userData = useSelector(state => state.auth.data);
  const { comments } = useSelector((state) => state.comment)
  const isAuth = useSelector(selectIsAuth);
  const [comment, setComment] = useState('');
  const params = useParams()
  const dispatch = useDispatch()
  const[data, setData] = React.useState();
  const[isLoading, setLoading] = React.useState(true);
  const { id }= useParams();
  

  React.useEffect(() =>{
    axios.get(`/posts/${id}`).then((res) => {
      setData(res.data);
      setLoading(false);
    }).catch((err) =>{
      console.warn(err);
      alert('Ошибка при получении статьи');
    });
  }, []);


  const fetchComments = useCallback(async () => {
    try {
        dispatch(getPostComments(params.id))
        console.log('chmo')
    } catch (error) {
        console.log(error)
    }
}, [params.id, dispatch])

useEffect(() => {
  fetchComments()
}, [fetchComments])

  if(isLoading){
    return <Post isLoading={isLoading} isFullPost/>;
  }
  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={ data.imageUrl? `${process.env.REACT_APP_API_URL}${data.imageUrl}`: ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={data.comments?.length || 0}
        tags={data.tags}
        isFullPost
      >
      <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock items={comments} isLoading={isLoading}>
      <Index />
      </CommentsBlock>
    </>
  );
};  
