"use client";

import { deleteUser } from "@/lib/actions/users";
import { errorToast, successToast } from "@/lib/toasts";
import { TrashBin } from "@gravity-ui/icons";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import React from "react";

const UserDeleteAlert = ({ user }) => {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      const delUser = await deleteUser(user._id);
      if (delUser.deleteCount > 0) {
        successToast("User Deleted");
      }
      router.refresh();
    } catch (error) {
      errorToast(error.message);
    }
  };

  return (
    <div>
      <AlertDialog>
        <Button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium text-red-400/60 hover:text-red-400 bg-red-500/5 hover:bg-red-500/10 border border-red-500/20 transition-all">
          <TrashBin width={13} height={13} />
          Delete
        </Button>
        <AlertDialog.Backdrop variant="blur">
          <AlertDialog.Container>
            <AlertDialog.Dialog className="sm:max-w-100 bg-[#1a1a1a]">
              <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
                <AlertDialog.Icon status="danger" />
                <AlertDialog.Heading className="text-white">
                  Delete user permanently?
                </AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>
                <p>
                  This will permanently delete{" "}
                  <strong className="text-red-400">{user.name}</strong> and all
                  of its data. This action cannot be undone.
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

export default UserDeleteAlert;
