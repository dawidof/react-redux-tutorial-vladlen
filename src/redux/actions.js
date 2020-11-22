import {
  CREATE_POST,
  FETCH_POSTS,
  HIDE_ERROR,
  HIDE_LOADER,
  REQUEST_POSTS,
  SHOW_ERROR,
  SHOW_LOADER
} from "./types";

export function createPost(post) {
  return {
    type: CREATE_POST,
    payload: post
  };
}

export function showLoader() {
  return {
    type: SHOW_LOADER
  };
}

export function hideLoader() {
  return {
    type: HIDE_LOADER
  };
}

export function showError(text) {
  return (dispatch) => {
    dispatch({
      type: SHOW_ERROR,
      payload: text
    });

    setTimeout(() => {
      dispatch(hideError());
    }, 3000);
  };
}

export function hideError() {
  return {
    type: HIDE_ERROR
  };
}

export function fetchPosts() {
  return {
    type: REQUEST_POSTS
  };
  // return async (dispatch) => {
  //   try {
  //     dispatch(showLoader());
  //     const response = await fetch(
  //       "https://jsonplaceholder.typicode.com/todos?_limit=5"
  //     );
  //     const json = await response.json();
  //     dispatch({ type: FETCH_POSTS, payload: json });
  //     dispatch(hideLoader());
  //   } catch (e) {
  //     dispatch(showError("Что-то пошло не так"));
  //     dispatch(hideLoader());
  //   }
  // };
}
