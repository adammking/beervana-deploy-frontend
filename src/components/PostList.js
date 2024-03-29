
import React, { useEffect, useState }from "react";
import Post from "./Post"
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getUserPostsFromApi, addPostWithApi, deletePostsFromApi } from '../actions/posts';
import { addLikesWithApi, getLikesFromApi, deleteLikesFromApi } from '../actions/likes';
import { decode } from "jsonwebtoken"
import NewPostRevForm from "./NewPostRevForm"
import './PostList.css'

function PostList({username}) {

    const [addView, setAddView] = useState(false);

    
    const dispatch = useDispatch();
    const { id } = decode(localStorage.getItem("token"))
    const posts = useSelector(st => st.posts.posts, shallowEqual);
    const likes = useSelector(st => st.likes.likes, shallowEqual)
    const likeSet = new Set()

    const addFields = (<>
        <NewPostRevForm add={addPost}/> 
        </>)

    function checkLikes(arr, set) {
        if (arr.length > 0 && arr[0] !== undefined) {
            arr.forEach(post => set.add(post.posts_id))
            return set
        } else {
            return set
        }
    }

    const newLikeSet = checkLikes(likes, likeSet)

    function toggleForm() {
        setAddView(!addView);
    }

    function addPost(data) {
        dispatch(addPostWithApi(username, data))
    }

    function deletePost(id) {
        dispatch(deletePostsFromApi(username, id))
    }

    useEffect(function() {
        dispatch(getUserPostsFromApi(username))
    }, [dispatch, posts.length, username])


    useEffect(function() {
        dispatch(getLikesFromApi(username, id))
    }, [dispatch, id, username])



    function like(postId) {
        dispatch(addLikesWithApi(username, postId))
    }

    function unlike(postId) {
        dispatch(deleteLikesFromApi(username, postId))
    }

    

    return (
        <div>
            <h3>Posts</h3>
            <button className="btn btn-warning btn-sm" onClick={toggleForm}>{addView ? "Cancel" : "Add Post"}</button>
            {addView ? addFields : <div></div>}

            {posts.length > 0 ? 
            <ul className="list-group">
                {posts.map(data => (
                    <li id="post" className="list-group-item m-2" key={data.id}><Post deletePost={() => deletePost(data.id)} 
                                            title={data.title} 
                                            body={data.body} 
                                            postId={data.id} 
                                            likes={newLikeSet}
                                            like={() => like(data.id)}
                                            unlike={() => unlike(data.id)}/></li>
                ))}
            </ul>
            : <h5>No Posts</h5>}
        </div>
    )
}


export default PostList;