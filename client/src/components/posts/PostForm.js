import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost }) => {
    const [text, setText] = useState('');

    const onSubmit = e => {
        e.preventDefault();
        addPost({ text });
        setText('');
    }
    return (
        <Fragment>
            <form className="form my-1" onSubmit={e => onSubmit(e)}>
                <textarea
                    name="text"
                    value={text}
                    cols="30"
                    rows="5"
                    placeholder="Create a post"
                    required
                    onChange={e => setText(e.target.value)}
                ></textarea>
                <input type="submit" className="btn btn-dark my-1" value="Submit" />
            </form>
        </Fragment>
    )
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired
}

export default connect(null, { addPost })(PostForm);
