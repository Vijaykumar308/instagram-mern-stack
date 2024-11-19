import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import {
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Send,
} from "lucide-react";
import { FaRegHeart } from "react-icons/fa";
import React, { useState } from "react";
import { Button } from "./ui/button";
import CommentDialog from "./CommentDialog";

function Post(post) {
    const [text, setText] = useState("");
    const [open, setOpen] = useState(false);
    console.log('open', open);
    const changeEventHandler = (e) => {
        const inputText = e.target.value;
        if(inputText.trim()) {
            setText(inputText);
        }
        else {
            setText("");
        }
    }
  return (
    <div className="my-8 w-full max-w-sm mx-auto">
      <div className="flex flex-col">
        <div
          className="size-full flex py-2"
          style={{ justifyContent: "space-between" }}
        >
          <div className="flex items-center  gap-2 sp">
            <Avatar>
              <AvatarImage src="" alt="post_image" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-3">
              <h1>username</h1>
            </div>
          </div>
          <Dialog className="">
            <DialogTrigger asChild>
              <MoreHorizontal className="cursor-pointer" />
            </DialogTrigger>
            <DialogContent className="absolute top-1/2 left-1/2 transform translate-x-12 translate-y-[-50%] border p-6 bg-white rounded-lg shadow-lg w-64 space-y-4 flex flex-col items-center text-sm text-center">
              {/* <DialogTitle>Are you absolutely sure?</DialogTitle> */}
              <Button
                variant="ghost"
                className="cursor-pointer w-fit text-[#ED4956] font-bold"
              >
                {" "}
                Unfollow
              </Button>

              {/* <DialogTitle>Are you absolutely sure?</DialogTitle> */}
              <Button variant="ghost" className="cursor-pointer w-fit">
                Add to favorites
              </Button>

              {/* <DialogTitle>Are you absolutely sure?</DialogTitle> */}
              <Button variant="ghost" className="cursor-pointer w-fit">
                Delete
              </Button>
            </DialogContent>
          </Dialog>
        </div>
        <img
          className="rounded-sm my-2 w-full aspect-square object-cover"
          src="https://plus.unsplash.com/premium_photo-1683147701489-580baa385cae?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="dummy-img"
        />

        <div className="flex size-full justify-between">
          <div className="flex justify-between gap-3">
            <FaRegHeart size={"22px"} />
            {/* <Heart /> */}
            <MessageCircle onClick={() => {console.log('clicked..');setOpen(true)}} className="cursor-pointer hover:text-gray-600" />
            <Send className="cursor-pointer hover:text-gray-600" />
          </div>
          <Bookmark className="cursor-pointer hover:text-gray-600" />
        </div>
        <span className="font-medium block mb-2">1k likes</span>
        <p>
          <span className="font-medium mr-2">username</span>
          caption
        </p>
        <span onClick={() => setOpen(true)}>View all 10 comments</span>
        <CommentDialog open={open} setOpen={setOpen} />
        <div className="flex items-center justify-between">
          <input
            type="text"
            placeholder="add a comment..."
            className="outline-none text-sm w-full"
            value={text}
            onChange={changeEventHandler}
          />
          {
            text && <span className="text-[#3BADF8]">Post</span>
          }
          
        </div>
      </div>
    </div>
  );
}

export default Post;
