import React, { Component } from "react";
import Comment from "./Comment";
import { PropTypes } from "prop-types";
import CommentForm from "./CommentForm";

class CommentList extends Component {
  render() {
    const { comments, currentUser } = this.props;
    let commentList = null;
    const commentForm = currentUser ? (
      <CommentForm
        onCommentSubmit={this.props.onCommentSubmit}
        serverErrors={this.props.serverErrors}
        saved={this.props.saved}
        onResetSaved={this.props.onResetSaved}
      />
    ) : null;

    if (!comments || comments.length === 0) {
      return (
        <div className="container">
          {commentForm}
          <div className="row">
            <div className="col-md-10 offset-md-1 mt-4">
              <div className="comment-header text-center">No comments yet</div>
            </div>
          </div>
        </div>
      );
    }

    commentList =
      comments &&
      comments.map((comment) => {
        return <Comment key={comment.id} comment={comment} />;
      });

    return (
      <div className="container">
        {commentForm}

        <div className="row">
          <div className="col-md-10 offset-md-1 mt-4">
            <h2 className="comment-header">
              Customer comments ({comments && comments.length})
            </h2>
          </div>
        </div>
        {commentList}
      </div>
    );
  }
}

CommentList.propTypes = {
  comments: PropTypes.array,
  onCommentSubmit: PropTypes.func.isRequired,
  serverErrors: PropTypes.array.isRequired,
  saved: PropTypes.bool.isRequired,
  onResetSaved: PropTypes.func,
  currentUser: PropTypes.object,
};

export default CommentList;
