import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container, PostForm } from "../components/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import databaseService from "../appwrite/database";

function Post() {
  return <div>
    <h1>Post</h1>
  </div>;
}

export default Post;
