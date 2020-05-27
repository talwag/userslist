import React, { Component } from "react";
import "./css/Post.css";
class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.post.id,
      title: this.props.post.title,
      body: this.props.post.body,
    };
  }

  render() {
    return (
      <div key={this.state.id} className="post">
        <div>
          <span className="postTitles">Title : </span>
          {this.state.title}
        </div>
        <div>
          <span className="postTitles">Body : </span>
          {this.state.body}
        </div>
      </div>
    );
  }
}

export default Post;
