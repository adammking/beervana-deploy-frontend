import React, { useEffect }from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getFollowingFromApi, deleteFollowFromApi } from '../actions/follows';

function FollowingList({username}) {
    
    const dispatch = useDispatch();
    const following = useSelector(st => st.follows.following, shallowEqual) ;

    useEffect(function() {
        dispatch(getFollowingFromApi(username))
    }, [dispatch, username])

    function unFollow(id) {
        dispatch(deleteFollowFromApi(username, id))
        dispatch(getFollowingFromApi(username))
    }



    return (
        <div>
            <h3>Following:</h3>
            {following.length > 0 ? 
            <div className="row justify-content-center">
                {following.map(data => (
                    <div id="full-card" className="card col-4 m-2" key={data.users_being_followed_id}>
                        <div className="card-body">
                            <h5 className="card-title"><Link id="link" to={`users/${data.username}`}>{data.username}</Link></h5> 
                                <button className="btn btn-warning btn-sm m-2" onClick={() => unFollow(data.users_being_followed_id)}>Unfollow</button> 
                        </div>
                    </div>              
                ))}
            </div>
            : <h5>Not Following</h5>}
        </div>
    )
}


export default FollowingList;