"use client";

import { updatePrompt } from "@/lib/actions/prompts";
import { jetbrainsMono } from "@/lib/fonts";
import { Pencil } from "@gravity-ui/icons";
import {
  Button,
  Form,
  Input,
  Label,
  Modal,
  Surface,
  TextArea,
  TextField,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const PromptEditModal = ({ prompt }) => {
  const [updating, setUpdating] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUpdating(true);
      const nativeForm = e.nativeEvent?.target || e.currentTarget;
      const formData = Object.fromEntries(new FormData(nativeForm));
      const promptId = prompt._id;
      const update = await updatePrompt(promptId, formData);
      if (update.modifiedCount > 0) {
        alert("success");
      } else {
        alert("nothing changed");
      }
      router.refresh();
    } catch (error) {
      alert(error.message);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div>
      <Modal>
        <Button
          size="sm"
          className="  text-[#AAFF00]/60 hover:text-[#AAFF00] bg-[#AAFF00]/5 hover:bg-[#AAFF00]/10 border border-[#AAFF00]/20 transition-all"
        >
          <Pencil width={13} height={13} />
          <span className="hidden md:flex">Edit</span>
        </Button>
        <Modal.Backdrop variant="blur">
          <Modal.Container placement="auto">
            <Modal.Dialog className=" bg-[#1a1a1a]">
              <Modal.CloseTrigger className="bg-[#95FF00] text-black" />
              <Modal.Header>
                <Modal.Heading className="text-white">
                  Update <span className="text-[#95FF00]">Prompt</span>{" "}
                </Modal.Heading>
              </Modal.Header>
              <Modal.Body className="md:p-6 ">
                <Surface variant="default">
                  <Form
                    id="editPromptForm"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-3 bg-[#1a1a1a]"
                  >
                    <TextField
                      defaultValue={prompt.title}
                      className="w-full"
                      name="title"
                      type="text"
                      variant="secondary"
                    >
                      <Label className="text-white">Title</Label>
                      <Input
                        placeholder="Enter your name"
                        className="bg-[#0d120d] border border-[#2a2a2a] focus:ring-[#95FF00] text-[13px] text-white/70"
                      />
                    </TextField>
                    <TextField
                      className="w-full"
                      defaultValue={prompt.description}
                      name="description"
                      type="text"
                      variant="secondary"
                    >
                      <Label className="text-white">Description</Label>
                      <TextArea
                        rows={3}
                        placeholder="Enter your email"
                        className="bg-[#0d120d] border border-[#2a2a2a] focus:ring-[#95FF00] text-[13px]  text-white/70 resize-none"
                      />
                    </TextField>
                    <TextField
                      className="w-full"
                      defaultValue={prompt.content}
                      name="content"
                      type="text"
                      variant="secondary"
                    >
                      <Label className="text-white">Content</Label>
                      <TextArea
                        rows={6}
                        placeholder="Enter your phone number"
                        className={`${jetbrainsMono.className} w-full bg-[#0d120d] border border-white/8 focus:ring-[#94FD00] rounded-[10px] px-4 py-3 text-[12px] text-white/70 placeholder:text-white/20 outline-none transition-colors resize-none leading-[1.8]`}
                      />
                    </TextField>
                  </Form>
                </Surface>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  slot="close"
                  className="bg-[#1a1a1a] border border-[#2a2a2a] hover:opacity-80"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  slot="close"
                  form="editPromptForm"
                  className="bg-[#95FF00] text-black font-semibold"
                >
                  {updating ? "Updating" : "Update"}
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
};

export default PromptEditModal;
