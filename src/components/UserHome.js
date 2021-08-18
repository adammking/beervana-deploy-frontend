import React from 'react';
import { useParams, useHistory } from "react-router-dom"
import {useDispatch} from "react-redux"
import ReviewList from './ReviewList';
import PostList from './PostList';
import FollowerList from './FollowerList';
import FollowingList from './FollowingList';
import { logoutAll } from '../actions/logout'
import './UserHome.css'



function UserHome() {
    const history = useHistory()
    const dispatch = useDispatch()
    const { username } = useParams();
   
function userLogOut() {
    dispatch(logoutAll())
    history.push("/login")
    console.log("Local storage is cleared")
    localStorage.clear()
}

return(
        

<div className="container">
    <div className="row">
    <div className="col-12 col-md-4">
      <h1>{username}</h1>
      <aside><button onClick={userLogOut} className="btn btn-danger">Logout</button></aside>
    </div>
    <div className="col-12 col-md-4">
      <PostList username={username}/>
      <ReviewList username={username}/>
    </div>
    <div className="col-12 col-md-4">
      <FollowingList username={username}/>
      <FollowerList username={username}/>
    </div>
  </div>
  
</div>
    )
};

export default UserHome;