import React, { useEffect }from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { addFollowWithApi, getFollowersFromApi, deleteFollowFromApi, getFollowingFromApi } from '../actions/follows';

function FollowerList({username}) {
    
    const dispatch = useDispatch();
    const followers = useSelector(st => st.follows.followers, shallowEqual) 
    const following = useSelector(st => st.follows.following, shallowEqual)
    const followingIds = new Set()
    following.forEach(data => followingIds.add(data.users_being_followed_id))

    useEffect(function() {
        dispatch(getFollowersFromApi(username))
    }, [dispatch, following.length, followers.length, username])


    function addFollow(id) {
        dispatch(addFollowWithApi(username, id))
    }

    function unFollow(id) {
        dispatch(deleteFollowFromApi(username, id))
    }


    return (
        <div>
            <h3>Followers</h3>
            {followers.length > 0 ? 
             <div className="row justify-content-center">
                {followers.map(data => (
                    <div id="full-card" className="card col-7 m-2" key={data.users_following_id}>
                        <div className="card-body">
                            <h5 className="card-title"><Link id="link" to={`users/${data.username}`}>{data.username}</Link></h5>
                                { followingIds.has(data.users_following_id) ? 
                                    <button className="btn btn-warning btn-sm m-2" onClick={() => unFollow(data.users_following_id)}>Unfollow</button> : 
                                    <button className="btn btn-warning btn-sm m-2" onClick={() => addFollow(data.users_following_id)}>Follow</button>
                                }
                        </div>
                    </div>              
                ))}
            </div>
            : <h5>No Followers</h5>}
        </div>
    )
}


export default FollowerList;