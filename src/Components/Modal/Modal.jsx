import React, { useState } from "react";
import { RxCross2, IoImagesOutline, BsEmojiHeartEyes } from "react-icons/all";
import { useAuth } from "../../context/UserAuthContext";
import { firestore, storage, storageRef } from "../../firebase";

const Modal = ({ modalState, changeModalState }) => {
  const { currentUser } = useAuth();
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleClick = () => {
    setTimeout(() => {
      changeModalState();
    }, 400);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageRef = storageRef.child(image.name);
    await imageRef.put(image);
    const imageUrl = await imageRef.getDownloadURL();
    const postsRef = firestore.collection("posts");
    await postsRef.add({
      content,
      imageUrl,
      userId: currentUser.uid,
      createdAt: new Date(),
    });
    setContent("");
    setImage(null);
  };

  return (
    <div
      className={`${
        modalState === false && "hidden"
      } h-screen fixed w-full left-0 top-0 flex justify-center items-center`}>
      <div
        onClick={() => {
          handleClick();
        }}
        className={`${
          modalState === false && "hidden"
        } h-screen bg-black/60 z-[10] fixed w-full left-0 top-0 flex justify-center items-center`}></div>
      <div
        className={`bg-white py-3 rounded-lg z-[100] shadow-md border-[1px] border-gray-100 drop-shadow-sm md:min-w-[35rem] h-[28rem] w-[30rem] md:h-[28rem] p-10 gap-5 flex flex-col`}>
        <p className="flex justify-center items-center p-1 border-b-[1px] border-b-gray-200 text-black/90 font-[500] text-[19px]">
          <span className="flex-1 flex items-center justify-center">
            Create Post
          </span>
          <span
            onClick={() => {
              handleClick();
            }}
            className="cursor-pointer hover:bg-gray-300 bg-gray-200 h-[1.7rem] w-[1.7rem] flex justify-center items-center rounded-full">
            <RxCross2 size={20} />
          </span>
        </p>
        <form
          className="flex flex-col justify-center items-center w-full gap-5"
          onSubmit={handleSubmit}>
          <textarea
            name="postDetails"
            id="post"
            cols="30"
            rows="8"
            maxLength={200}
            placeholder="What's on your mind?"
            className="bg-blue-100/10 w-full text-[17px] border-[1px] resize-none focus:outline-blue-200 p-2 border-gray-200 rounded-md"
            onChange={handleContentChange}></textarea>
          <div className="border-[1px] border-gray-200 rounded-md w-full h-[3.5rem] flex justify-start items-center px-10 gap-10">
            <span className="font-[500] flex-1 min-w-[10rem]">
              Add to your post
            </span>
            <label htmlFor="image" className="cursor-pointer">
              <span>
                <IoImagesOutline size={27} className="text-green-700" />
              </span>
              <input
                type="file"
                name="image"
                id="image"
                hidden
                onChange={handleImageChange}
              />
            </label>
            <span>
              <BsEmojiHeartEyes size={25} className="text-yellow-400" />
            </span>
          </div>
          <button
            type="submit"
            className="w-full bg-red-700 hover:bg-red-800 font-[600] text-[18px] text-white h-10 rounded-md">
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
