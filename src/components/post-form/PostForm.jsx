import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import databaseService from "../../appwrite/database";
import { Input, Button, Select, RTE } from "../index";

function PostForm({post}) { //jo bbi is form ko use kar re ga waha se hi post ka data aa jaega props ke through. us post ko ham destucture kar ke nikal re post ko data ko use kar sakein.

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.user);
  console.log("user Post Form Page", user);

  // useForm hook
  const {register, handleSubmit, control, watch, setValue, getValues} = useForm({
    defaultValues:{
      title: post?.title ||"",
      slug: post?. $id ||"",
      content:post?. content ||  "",
      status:post?.status || "active",

    }
  });

  // Submit function
  const submit = async (data)=>{

    // data hai phele se tu ya kaam hoga uploadfile  karne wale matlab kuch image change ya formeting karna hoga
    if(post){ 
     const file =  data.image[0]? databaseService.uploadFile(data.image[0]): null;

    //phele se jo data hai usko delete karna hoga
    if(file){
      databaseService.deleteFile(post.featuredImage);
    }

    // Post ko update karna hoga
    const updatedPost = await databaseService.updatePost(post.$id, {
    ...data, // Purane data ko preserve karte hain
    featuredImage: file ? file.$id : undefined, // featuredImage ko override k matlab---> (purani value replace kar di jayegi).
    // 1. Agar file available hai, toh featuredImage ki value file.$id set ki jayegi.
    // 2. Agar file available nahi hai, toh featuredImage ki value undefined ho jayegi (purani value hata di jayegi).
    });

    // Post ko navigate karna hoga
    if(updatedPost){
      navigate(`/post/${updatedPost.$id}`);
    }
      
    // agar first time user aya tu post ko create karna hoga eles part me hoga ya cearte kaam.
    }else{
      // Post ko create karna hoga
      const newPost = await data.image[0]? databaseService.uploadFile(data.image[0]): null;

      // post hai tu 
      if (newPost) {
        const fileId = file.$id;
        data.featuredImage = fileId; //featuredImage ke ander fileid ko me save karna hoga
      }
    }

  }

 
  return (
  <div>
        
  </div>
  );
}

export default PostForm;
