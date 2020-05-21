import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';
const CommentForm = ({ addComment, post: { _id } }) => {
    const [text, setText] = useState('');

    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Leave A Comment</h3>
            </div>
            <form className="form my-1" onSubmit={e => {
                e.preventDefault();
                addComment(_id, { text });
                setText('');
            }}>
                <textarea
                    name="text"
                    value={text}
                    cols="30"
                    rows="5"
                    placeholder="Comment on this post"
                    onChange={e => setText(e.target.value)} required
                ></textarea>
                <input type="submit" className="btn btn-dark my-1" value="Submit" />
            </form>
        </div>
    )
}

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

export default connect(null, { addComment })(CommentForm);
