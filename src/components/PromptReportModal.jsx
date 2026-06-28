"use client";

import { reportPrompt } from "@/lib/actions/reports";
import { jetbrainsMono } from "@/lib/fonts";
import { errorToast, successToast } from "@/lib/toasts";
import { Flag } from "@gravity-ui/icons";
import {
  Button,
  Form,
  Input,
  Label,
  Modal,
  Surface,
  TextField,
  Select,
  ListBox,
  TextArea,
} from "@heroui/react";
import React from "react";

const reportCategory = ["Spam", "Irrelevant", "Misinformation"];

const PromptReportModal = ({ prompt, user }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const nativeForm = e.nativeEvent?.target || e.currentTarget;
      const formData = Object.fromEntries(new FormData(nativeForm));
      const payload = {
        ...formData,
        reportedBy: user?.name,
        promptId: prompt._id,
      };
      const sendReport = await reportPrompt(payload);
      if (sendReport.insertedId) {
        successToast("Report Submitted");
      }
    } catch (error) {
      errorToast(error.message);
    }
  };

  return (
    <div>
      <Modal>
        <Button className="flex items-center gap-1.5 px-3 py-2 rounded-full text-[11px] font-medium text-white/50 hover:text-red-400 border border-white/8 hover:border-red-500/20 bg-white/4 transition-all">
          <Flag width={13} height={13} />
          Report
        </Button>
        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-md  bg-[#1a1a1a]">
              <Modal.CloseTrigger className="bg-[#95FF00] text-black" />
              <Modal.Header>
                <Modal.Heading className="text-[#95FF00]">
                  Report Prompt
                </Modal.Heading>
              </Modal.Header>
              <Modal.Body className="p-6">
                <Surface variant="default">
                  <Form
                    id="reportForm"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 bg-[#1a1a1a]"
                  >
                    <TextField
                      className="w-full"
                      name="reportReason"
                      type="text"
                      variant="secondary"
                    >
                      <Select
                        name="category"
                        isRequired
                        placeholder="Select one"
                      >
                        <Select.Trigger className="bg-white/4 border border-white/8">
                          <Select.Value className="text-white/70" />
                          <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover className="bg-[#0d120d] border border-white/8 text-white">
                          <ListBox>
                            {reportCategory.map((c) => (
                              <ListBox.Item
                                key={c}
                                id={c}
                                textValue={c}
                                className="hover:bg-[#94FD00] hover:text-black transition-all"
                              >
                                {c}
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                            ))}
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    </TextField>
                    <TextField
                      className="w-full"
                      name="description"
                      type="text"
                      variant="secondary"
                    >
                      <Label className="text-white/40">(Optional)</Label>
                      <TextArea
                        rows={6}
                        placeholder="Tell Us In Details"
                        className={`${jetbrainsMono.className} w-full bg-white/4 border border-white/8 focus:ring-[#94FD00] rounded-[10px] px-4 py-3 text-[12px] text-white/70 placeholder:text-white/20 outline-none transition-colors resize-none leading-[1.8]`}
                      />
                    </TextField>
                  </Form>
                </Surface>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  slot="close"
                  className="bg-transparent text-white/60 border border-white/50"
                >
                  Cancel
                </Button>
                <Button
                  slot="close"
                  type="submit"
                  className="bg-[#94FD00] hover:bg-[#94FD00]/85 text-black"
                  form="reportForm"
                >
                  Submit
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
};

export default PromptReportModal;
