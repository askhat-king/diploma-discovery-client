import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import axios from '../axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { UsersBlock } from '../components/UsersBlock';
import { fetchPosts, fetchTags, fetchPostsByTeachers } from '../redux/slices/posts';

export const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector( state => state.auth.data);
  const {posts, tags} = useSelector( state => state.posts);
  const [tab, setTabs] = useState(0);
  const [users, setUsers] = useState([]);
  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';

  useEffect(() => {
    function fetchBusinesses() {
      if (location.pathname.indexOf('posts/teacher') === 1) {
        setTabs(1)
        dispatch(fetchPostsByTeachers());
        dispatch(fetchTags());
      } else {
        setTabs(0)
        dispatch(fetchPosts());
        dispatch(fetchTags());
      }
    }
    fetchBusinesses()
  }, [dispatch, location.pathname]);

  useEffect(() => {
    axios
      .get('/users')
      .then((res) => {
        setUsers(res.data)

      })
      .catch(err => {
        console.warn(err);
        alert('Ошибка при получении статьи');
      })
  }, []);

  console.log(posts);

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Новые" type='submit' onClick={() => {
          setTabs(0)
          dispatch(fetchPosts());
          dispatch(fetchTags());
          navigate('/');
        }} />
        <Tab label="От учителей" type='submit' onClick={() => {
          setTabs(1)
          dispatch(fetchPostsByTeachers());
          dispatch(fetchTags());
          navigate('/posts/teacher');
        }} />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {( isPostsLoading? [...Array(5)]: posts.items).map((obj, index) => isPostsLoading?(
            <Post key={index} isLoading={true} />
          ):
          (
            <Post
              id={obj._id}
              title={obj.title}
              imageUrl={obj.imageUrl? `${process.env.REACT_APP_API_URL}${obj.imageUrl}`: ''}
              user={obj.user}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              commentsCount={obj.comments?.length || 0}
              tags={obj.tags}
              isEditable={userData?._id === obj.user._id}
            />
          ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <UsersBlock users={users} />
        </Grid>
      </Grid>
    </>
  );
};
