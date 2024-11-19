import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import React from "react";

function CommentDialog({ open, setOpen }) {
  return (
    <div>
      <Dialog open={open}>
        <DialogContent 
            className="absolute top-1/2 left-1/2 transform translate-x-12 translate-y-[-50%] bg-white p-3 border rounded-lg shadow-lg w-96  flex flex-col items-center text-sm text-center"
            onInteractOutside={() => setOpen(false)}
        >
          <DialogTitle></DialogTitle>
          <img src="https://plus.unsplash.com/premium_photo-1683147701489-580baa385cae?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CommentDialog;
