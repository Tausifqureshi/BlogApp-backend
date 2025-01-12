import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import databaseService from "../../appwrite/database";
import { Input, Button, Select, RTE } from "../index";

function PostForm({post}) { //jo bbi is form ko use kar re ga waha se hi post ka data aa jaega props ke through. us post ko ham destucture kar ke nikal re post ko data ko use kar sakein.

  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  console.log("user Post Form Page", user);

  const {register, handleSubmit, control, watch, setValue, getValues} = useForm({
    defaultValues:{
      title: post?.title ||"",
      slug: post?. $id ||"",
      content:post?. content ||  "",
      status:post?.status || "active",

    }
  });

 
  return (
  <div>
        
  </div>
  );
}

export default PostForm;
