import React from "react";
import { createPost, showError } from "../redux/actions";
import { connect } from "react-redux";
import { Error } from "./Error";

class PostForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: ""
    };
  }

  submitHandler = (event) => {
    event.preventDefault();

    const { title } = this.state;

    if (!title.trim()) {
      return this.props.showError("Название не может быть пустым");
    }

    const newPost = {
      title,
      id: Date.now().toString()
    };
    console.log(newPost);
    this.props.createPost(newPost);
    this.setState({ title: "" });
  };

  changeInputHandler = (event) => {
    event.persist();
    this.setState((prev) => ({
      ...prev,
      ...{
        [event.target.name]: event.target.value
      }
    }));
  };

  render() {
    return (
      <form onSubmit={this.submitHandler}>
        {this.props.error && <Error text={this.props.error} />}
        <div className="form-group">
          <label htmlFor="title">Заголовок поста</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={this.state.title}
            name="title"
            onChange={this.changeInputHandler}
          />
        </div>
        <button className="btn btn-success" type="submit">
          Создать
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = {
  createPost,
  showError
};

const mapStateToProps = (state) => ({
  error: state.app.error
});
export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
