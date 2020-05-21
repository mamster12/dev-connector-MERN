import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import Postitem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import { getPost } from '../../actions/post';

const Post = ({ getPost, match, post: { post, loading }, auth }) => {

    useEffect(() => {
        getPost(match.params.id);
    }, [getPost, match.params.id]);
    return loading || post === null ? (<Spinner />) : (
        <div className="container">
            <Link to='/posts' className='btn'> Back To Posts</Link>
            <Postitem post={post} showActions={false} />
            <CommentForm post={post} />

            {!loading && post.comments.length > 0 ?
                <Fragment>
                    <div className="comments">
                        {post.comments.map(comment => (
                            <CommentItem key={comment._id} comment={comment} />
                        ))}
                    </div>
                </Fragment>
                : <em>No comments yet.</em>
            }
        </div>
    )
}

Post.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    post: state.post,
    auth: state.auth
})

export default connect(mapStateToProps, { getPost })(Post);
