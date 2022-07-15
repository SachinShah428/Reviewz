import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Rating } from 'react-simple-star-rating'

import { createPost, updatePost } from '../../actions/posts';
import useStyles from './styles';

const Form = ({ currentId, setCurrentId }) => {

  const [postData, setPostData] = useState({ title: '', streamingApp: '', review: '', rating2 : 0 , creator : '' });
  const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    if (post) {
      handleRating ( post.rating2 ) ;
      setPostData(post);
    }
  }, [post]);

  const [rating, setRating] = useState(0) ;

  const handleRating = ( rating ) => {
    setRating(rating) ;
    setPostData({ ...postData, rating2 : rating })
  }
  
  const clear = () => {
    setCurrentId(0);
    setRating('') ;
    setPostData({ title: '', streamingApp: '', review: '', rating2: 0 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentId === 0) {
      dispatch(createPost({ ...postData, Cname: user?.result?.name , Cid : user?.result?._id , creator : user?.result?.name }));
    } else {
      dispatch(updatePost( postData ));
    }
      clear();
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Sign In to Add Your Reviews
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off"  className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${post.title}"` : 'Adding a Review'}</Typography>
        <TextField name="title" label="Title" variant="outlined"  fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} required />
        <TextField name="message" variant="outlined" label="Streaming App" fullWidth  value={postData.streamingApp} onChange={(e) => setPostData({ ...postData, streamingApp: e.target.value })} required />
        <TextField name="tags" variant="outlined" label="Reviews" fullWidth multiline rows={4} value={postData.review} onChange={(e) => setPostData({ ...postData, review: e.target.value })} required />
        <Rating onClick={handleRating} ratingValue={rating}/>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;
