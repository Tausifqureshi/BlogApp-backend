import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import databaseService from "../../appwrite/database";
import { Input, Button, Select, RTM } from "../index";

function PostForm({post}) { //jo bbi is form ko use kar re ga waha se hi post ka data aa jaega props ke through. us post ko ham destucture kar ke nikal re post ko data ko use kar sakein. 

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth);
  console.log("user Post Form Page", userData);

  // useForm hook
  const {register, handleSubmit, control, watch, setValue, getValues} = useForm({
    defaultValues:{
      title: post?.title ||"",
      slug: post?. $id ||"",
      content:post?. content ||  "",
      status:post?.status || "active",
      image:post?. featuredImage || "", 

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
        const fileId = newPost.$id;
        data.featuredImage = fileId; //featuredImage ke ander fileid ko me save karna hoga.
        const createdPost = await databaseService.createPost({
          ...data,
          userId: userData.$id, //userId ke ander user ki data set karna hoga. userId createPost se milra hai.
        })

        // Post ko navigate karna hoga
        if (createdPost) {
          navigate(`/post/${createdPost.$id}`);
          
        }
      }
    }

  }

  // Slug transform
      const slugTransform = useCallback((value) => { //
          if (value && typeof value === "string")
              return value
                  .trim()
                  .toLowerCase()   
                  .replace(/[^a-zA-Z\d\s]+/g, "-")
                  .replace(/\s/g, "-");
  
          return "";  
      }, []);

      // useEffect
        React.useEffect(() => {
              const subscription = watch((value, { name }) => {
                  if (name === "title") {
                      setValue("slug", slugTransform(value.title), { shouldValidate: true });
                  }
              });
      
              return () => subscription.unsubscribe();
          }, [watch, slugTransform, setValue]);


             return (
                  <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
                      <div className="w-2/3 px-2">
                          <Input
                              label="Title :"
                              placeholder="Title"
                              className="mb-4"
                              {...register("title", { required: true })}
                          />
                          <Input
                              label="Slug :"
                              placeholder="Slug"
                              className="mb-4"
                              {...register("slug", { required: true })}
                              onInput={(e) => {
                                  setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                              }}
                          />
                          <RTM label="Content :" name="content" control={control} defaultValue={getValues("content")} />
                      </div>
                      <div className="w-1/3 px-2">
                          <Input
                              label="Featured Image :"
                              type="file"
                              className="mb-4"
                              accept="image/png, image/jpg, image/jpeg, image/gif"
                              {...register("image", { required: !post })}
                          />
                          {post && (
                              <div className="w-full mb-4">
                                  <img
                                      src={databaseService.getFilePreview(post.featuredImage)}
                                      alt={post.title}
                                      className="rounded-lg"
                                  />
                              </div>
                          )}
                          <Select
                              options={["active", "inactive"]}
                              label="Status"
                              className="mb-4" 
                              {...register("status", { required: true })}   
                          />
                          <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                              {post ? "Update" : "Submit"}
                          </Button>
                      </div>
                  </form>   
              );
 

}

export default PostForm;
