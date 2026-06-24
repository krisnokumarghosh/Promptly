"use client";

import { deletePrompt } from "@/lib/actions/prompts";
import { TrashBin } from "@gravity-ui/icons";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import React from "react";

const DeletePromptAlert = ({ prompt }) => {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      const promptId = prompt._id;
      const delPrompt = await deletePrompt(promptId);
      if (delPrompt.deleteCount > 0) {
        alert("success");
      }
      router.refresh();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <AlertDialog>
        <Button
          size="sm"
          className="  text-red-400/60 hover:text-red-400 bg-red-500/5 hover:bg-red-500/10 border border-red-500/20 transition-all"
        >
          <TrashBin width={13} height={13} />
          <span className="hidden md:flex">Delete</span>
        </Button>
        <AlertDialog.Backdrop variant="blur">
          <AlertDialog.Container>
            <AlertDialog.Dialog className="sm:max-w-100 bg-[#1a1a1a]">
              <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
                <AlertDialog.Icon status="danger" />
                <AlertDialog.Heading className="text-white">
                  Delete prompt permanently?
                </AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>
                <p>
                  This will permanently delete{" "}
                  <strong className="text-red-400">{prompt.title}</strong> and
                  all of its data. This action cannot be undone.
                </p>
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button slot="close" variant="tertiary">
                  Cancel
                </Button>
                <Button onClick={handleDelete} slot="close" variant="danger">
                  Delete Project
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </div>
  );
};

export default DeletePromptAlert;
