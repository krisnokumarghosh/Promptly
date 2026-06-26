"use client";

import { deletePrompt } from "@/lib/actions/prompts";
import { errorToast, successToast } from "@/lib/toasts";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import React from "react";

const AdminPromptDeleteAlert = ({ prompt }) => {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      const promptId = prompt._id;
      const delPrompt = await deletePrompt(promptId);
      if (delPrompt.deleteCount > 0) {
        successToast("Prompt Deleted");
      }
      router.refresh();
    } catch (error) {
      errorToast(error.message);
    }
  };

  return (
    <div>
      <AlertDialog>
        <Button className=" rounded-2xl bg-red-500/6 hover:bg-red-500/12 border border-red-500/20 text-red-400/60 hover:text-red-400 transition-all">
          Delete
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

export default AdminPromptDeleteAlert;
