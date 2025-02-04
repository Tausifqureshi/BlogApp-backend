// import React from "react";
// import { useForm } from "react-hook-form";
// function Text() {

// const {register, handleSubmit} = useForm();
// const formData = useForm()
// console.log("useFor", formData);
// const submit = (data) => {
//   console.log("data", data);
// }

//   return <div>
//     <form action="" onSubmit={handleSubmit(submit)}>
//       <input type="text" {...register("name")} />
//       <input type="submit" />
//     </form>
//   </div>;
// }

// export default Text;



{/* <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
<div className='w-full block'>
  <Header />
  <main>
  TODO:  <Outlet />
  </main>
  <Footer />
</div>
</div> */}










import React, { useState } from "react";

const CategoryFilter = () => {
  // Categories list
  const categories = ["Technology", "Health", "Finance", "Education", "Sports"];

  // Dummy data
  const items = [
    { id: 1, name: "React Framework", category: "Technology" },
    { id: 2, name: "Yoga for Beginners", category: "Health" },
    { id: 3, name: "Stock Market Basics", category: "Finance" },
    { id: 4, name: "Online Learning Platforms", category: "Education" },
    { id: 5, name: "Football Training", category: "Sports" },
  ];

  // State for selected categories
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Handle checkbox change
  const handleCheckboxChange = (e) => {
    const category = e.target.value
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category) // Unselect if already selected
        : [...prev, category] // Add to selected categories
    );
  };

  // Filter items based on selected categories
  const filteredItems = selectedCategories.length
    ? items.filter((item) => selectedCategories.includes(item.category))
    : items; // Show all if no category selected

  return (
    <div>
      <h2>Category Filter</h2>

      {/* Categories Checkboxes */}
      <div>
        <h3>Filter by Category:</h3>
        {categories.map((category) => (
          <label key={category} style={{ display: "block", marginBottom: "8px" }}>
            <input
              type="checkbox"
              value={category}
              checked={selectedCategories.includes(category)}
              // onChange={() => handleCheckboxChange(category)}
              onChange={handleCheckboxChange}
            />
            {category}
          </label>
        ))}
      </div>

      {/* Filtered Results */}
      <div>
        <h3>Filtered Items:</h3>
        {filteredItems.length ? (
          <ul>
            {filteredItems.map((item) => (
              <li key={item.id}>{item.name} ({item.category})</li>
            ))}
          </ul>
        ) : (
          <p>No items found!</p>
        )}
      </div>
    </div>
  );
};

export default CategoryFilter;























// import React, { useCallback } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import databaseService from "../../appwrite/database";
// import { Input, Button, Select, RTM } from "../index";

// function PostForm({ post }) {
//   const navigate = useNavigate();
//   const userData = useSelector((state) => state.auth);
//   console.log("user Post Form Page", userData);

//   // useForm hook
//   const {
//     register,
//     handleSubmit,
//     control,
//     watch,
//     setValue,
//     getValues,
//     formState: { errors, isValid },
//   } = useForm({
//     defaultValues: {
//       title: post?.title || "",
//       slug: post?.$id || "",
//       content: post?.content || "",
//       status: post?.status || "active",
//     },
//     mode: "onChange", // Ensures validation runs on field change
//   });

//   // Submit function
//   const submit = async (data) => {
//     if (post) {
//       const file = data.image[0] ? await databaseService.uploadFile(data.image[0]) : null;

//       if (file) {
//         await databaseService.deleteFile(post.featuredImage);
//       }

//       const updatedPost = await databaseService.updatePost(post.$id, {
//         ...data,
//         featuredImage: file ? file.$id : undefined,
//       });

//       if (updatedPost) {
//         navigate(`/post/${updatedPost.$id}`);
//       }
//     } else {
//       const file = data.image[0] ? await databaseService.uploadFile(data.image[0]) : null;

//       if (file) {
//         data.featuredImage = file.$id;
//         const createdPost = await databaseService.createPost({
//           ...data,
//           userId: userData.$id,
//         });

//         if (createdPost) {
//           navigate(`/post/${createdPost.$id}`);
//         }
//       }
//     }
//   };

//   // Slug transform
//   const slugTransform = useCallback((value) => {
//     if (value && typeof value === "string") {
//       return value
//         .trim()
//         .toLowerCase()
//         .replace(/[^a-zA-Z\d\s]+/g, "-")
//         .replace(/\s/g, "-");
//     }
//     return "";
//   }, []); 

//   // useEffect for slug
//   React.useEffect(() => {
//     const subscription = watch((value, { name }) => {
//       if (name === "title") {
//         setValue("slug", slugTransform(value.title), { shouldValidate: true });
//       }
//     });

//     return () => subscription.unsubscribe();
//   }, [watch, slugTransform, setValue]);

//   return (
//     <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
//       <div className="w-2/3 px-2">
//         <div className="mb-4">
//           <Input
//             label="Title :"
//             placeholder="Title"
//             className="mb-4"
//             {...register("title", {
//               required: "Title is required",
//               validate: (value) => value.trim() !== "" || "Title cannot be empty or whitespace",
//             })}
//           />
//           {errors.title && <p className="text-red-500">{errors.title.message}</p>}
//         </div>

//         <div className="mb-4">
//           <Input
//             label="Slug :"
//             placeholder="Slug"
//             className="mb-4"
//             {...register("slug", {
//               required: "Slug is required",
//               validate: (value) => value.trim() !== "" || "Slug cannot be empty or whitespace",
//             })}
//             onInput={(e) => {
//               setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
//             }}
//           />
//           {errors.slug && <p className="text-red-500">{errors.slug.message}</p>}
//         </div>

//         <RTM
//           label="Content :"
//           name="content"
//           control={control}
//           defaultValue={getValues("content")}
//           rules={{ required: "Content is required" }}
//         />
//         {errors.content && <p className="text-red-500">{errors.content.message}</p>}
//       </div>

//       <div className="w-1/3 px-2">
//         <div className="mb-4">
//           <Input
//             label="Featured Image :"
//             type="file"
//             className="mb-4"
//             accept="image/png, image/jpg, image/jpeg, image/gif"
//             {...register("image", {
//               required: !post ? "Image is required" : false,
//             })}
//           />
//           {errors.image && <p className="text-red-500">{errors.image.message}</p>}
//         </div>

//         {post && (
//           <div className="w-full mb-4">
//             <img
//               src={databaseService.getFilePreview(post.featuredImage)}
//               alt={post.title}
//               className="rounded-lg"
//             />
//           </div>
//         )}

//         <Select
//           options={["active", "inactive"]}
//           label="Status"
//           className="mb-4"
//           {...register("status", { required: "Status is required" })}
//         />
//         {errors.status && <p className="text-red-500">{errors.status.message}</p>}

//         <Button
//           type="submit"
//           bgColor={post ? "bg-green-500" : undefined}
//           className="w-full"
//           // disabled={!isValid} // Disables the button if form is invalid
//         >
//           {post ? "Update" : "Submit"}
//         </Button>
//       </div>
//     </form>
//   );
// }

// export default PostForm;

