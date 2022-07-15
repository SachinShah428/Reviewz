import React , { useState, useEffect } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { deletePost } from '../../../actions/posts';
import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const [postData, setPostData] = useState([]);
  useEffect(() => {
    setPostData ( [] ) ;
    for ( let i = 0 ; i < post.rating2/20 ; i ++ ) {
    setPostData(postData => [...postData, '⭐']);
    }
    for ( let i = post.rating2/20 ; i < 5 ; i ++ ) {
      setPostData(postData => [...postData, '☆']);
      }
  }, [post]);
  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} title={post.title} />
      <div className={classes.overlay}>
        <Typography variant="h6">By : {post.creator}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      {(user?.result?._id === post?.Cid) && (
      <div className={classes.overlay2}>
        <Button onClick={() => setCurrentId(post._id)} style={{ color: 'white' }} size="small">
          <MoreHorizIcon fontSize="default" />
        </Button>
      </div>
      )}
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">Title : {post.title}</Typography>
      <CardContent><strong>Rating</strong> :
      {postData.map(( category ) => (
        category
      ))}
      </CardContent>
      <CardContent><strong>Streaming App</strong> : {post.streamingApp}</CardContent>
      <CardContent><strong>Reviews</strong> : {post.review}</CardContent>
      <CardActions className={classes.cardActions}>
      <Button size="small" color="primary" disabled={true}>
      </Button>
      {( user?.result?._id === post?.Cid ) && ( 
      <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
          <DeleteIcon fontSize="small" /> Delete
        </Button>
      )}
      </CardActions>
    </Card>
  );
};

export default Post;
