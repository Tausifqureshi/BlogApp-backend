import React from "react"; //Post Add karne ke liye hai ya component.
import { Container, PostForm } from "../components/index";
function AddPost() {
  return <div className="py-8">
    <Container>
        <PostForm/>
    </Container>
  </div>;
}

export default AddPost;
