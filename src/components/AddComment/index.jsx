import React, { useState } from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  createComment,
  getPostComments,
} from '../../redux/slices/comments'

export const Index = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')


  const handleSubmit = () => {
        try {
            const postId = params.id
            dispatch(createComment({ postId, comment }))
            setComment('')
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <>
      <div className={styles.root}>
        <div className={styles.form} onSubmit={e => e.preventDefault()}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            value={comment} 
            onChange={e => setComment(e.target.value)}
            fullWidth
          />
          <Button onClick={handleSubmit} variant="contained">Отправить</Button>
        </div>
      </div>
    </>
  );
};
