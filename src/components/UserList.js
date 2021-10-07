import { getAllUsersFromApi } from "../actions/user"
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Link } from "react-router-dom";
import React, { useEffect }from "react";
import { addFollowWithApi, deleteFollowFromApi, getFollowingFromApi } from '../actions/follows';
import {decode}  from "jsonwebtoken"
import "./UserList.css"

function UserList() {

    const dispatch = useDispatch();
    const users = useSelector(st => st.user.users, shallowEqual);
    const following = useSelector(st => st.follows.following, shallowEqual)
    const { username } = decode(localStorage.getItem("token"))
    const followingIds = new Set()
    following.forEach(data => followingIds.add(data.users_being_followed_id))

    useEffect(function() {
        dispatch(getAllUsersFromApi())
    }, [dispatch, username])


    function addFollow(id) {
        dispatch(addFollowWithApi(username, id))
    }

    function unFollow(id) {
        dispatch(deleteFollowFromApi(username, id))
    }



    return (
        <div id="top-container" className="container">
            <h3>Users:</h3>
            {users.length > 0 ? 
            <div className="row g-2 justify-content-center row-cols-12 row-cols-sm-2 row-cols-lg-3">
                {users.map(data => (
                    <div id="full-card" className="card border border-warning" key={data.id}>
                        <div className="card-body">
                            <h5 className="card-title"><Link id="link" to={`users/${data.username}`}>{data.username}</Link></h5>
                                { followingIds.has(data.id) ? 
                                    <button className="btn btn-warning btn-sm" onClick={() => unFollow(data.id)}>Unfollow</button> : 
                                    <button className="btn btn-warning btn-sm" onClick={() => addFollow(data.id)}>Follow</button>
                                }
                        </div>
                    </div>              
                ))}
            </div>
            : <h5>No Users</h5>}
        </div>
    )
}




export default UserList;