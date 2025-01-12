import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import databaseService from "../../appwrite/database";
import { Input, Button, Select, RTE } from "../index";

function PostForm() {
  const navigate = useNavigate();
  const {register,handleSubmit, control, watch, setValue, getValues}=useForm();

  const user = useSelector((state) => state.auth.user);
  console.log("user Post Form Page", user);
  return (
  <div>
        
  </div>
  );
}

export default PostForm;
