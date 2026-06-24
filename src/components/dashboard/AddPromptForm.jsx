"use client";

import { jetbrainsMono } from "@/lib/fonts";

import { CloudArrowUpIn, Xmark } from "@gravity-ui/icons";
import {
  FieldError,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
  Select,
  Button,
  ListBox,
} from "@heroui/react";
import Image from "next/image";
import { getUserSession } from "@/lib/core/session";
import { createPrompt } from "@/lib/actions/prompts";
import { useState } from "react";
import { redirect } from "next/navigation";

const CATEGORIES = [
  "Coding",
  "Writing",
  "Marketing",
  "Design",
  "Education",
  "Business",
  "Research",
  "Other",
];

const AI_TOOLS = [
  "ChatGPT",
  "Claude",
  "Gemini",
  "Midjourney",
  "Stable Diffusion",
  "DALL-E 3",
  "Llama",
  "Mistral",
];

const DIFFICULTY = ["Beginner", "Intermediate", "Pro"];
const VISIBILITY = ["Public", "Private"];

const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

const AddPromptForm = () => {
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [difficulty, setDifficulty] = useState("Beginner");
  const [visibility, setVisibility] = useState("Public");

  const handleTagKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim().replace(/^#/, "");
      if (!tags.includes(newTag) && tags.length < 8) {
        setTags([...tags, newTag]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tag) => setTags(tags.filter((t) => t !== tag));

  // Image select
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setThumbnail(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  // ImgBB upload
  const uploadToImgBB = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      { method: "POST", body: formData },
    );
    const data = await res.json();
    if (!data.success) throw new Error("Image upload failed");
    return data.data.url;
  };

  // Submit
  const onSubmit = async (e) => {
    e.preventDefault();

    if (tags.length === 0) return alert("Add at least one tag");
    if (!thumbnail) return alert("Please upload a thumbnail");
    const user = await getUserSession();
    // console.log(user);

    setSubmitting(true);

    const thumbnailUrl = await uploadToImgBB(thumbnail);

    const nativeForm = e.nativeEvent?.target || e.currentTarget;
    const formData = Object.fromEntries(new FormData(nativeForm));
    console.log(formData);

    const payload = {
      userId: user?.id,
      userName: user?.name,
      ...formData,
      tags,
      difficulty: difficulty,
      thumbnail: thumbnailUrl,
      visibility: visibility,
      copyCount: 0,
      status: "pending",
      rating: 0,
    };

    const addPrompt = await createPrompt(payload);

    if (addPrompt.insertedId) {
      setSubmitting(false);
      alert("prompt created");
      redirect("/dashboard/creator/my-prompts")
    } else if (!addPrompt) {
      alert(addPrompt.error);
    }
  };

  return (
    <div>
      <Form
        onSubmit={onSubmit}
        className="max-w-200 mx-auto flex flex-col gap-5"
      >
        {/* Prompt Title */}
        <TextField isRequired name="title" className="flex flex-col gap-1.5">
          <Label
            className={`${jetbrainsMono.className} text-[10px] font-bold text-white/30 tracking-[0.12em] uppercase`}
          >
            Prompt Title
          </Label>
          <Input
            placeholder="e.g. Twitter Thread Generator for SaaS"
            className="w-full bg-white/4 border border-white/8  px-4 py-3 text-[13px] text-white placeholder:text-white/20 outline-none transition-colors focus:ring-[#94FD00]"
          />
          <FieldError className="text-[11px] text-red-400" />
        </TextField>

        {/* Prompt Description */}
        <TextField
          isRequired
          name="description"
          className="flex flex-col gap-1.5"
        >
          <Label
            className={`${jetbrainsMono.className} text-[10px] font-bold text-white/30 tracking-[0.12em] uppercase`}
          >
            Prompt Description
          </Label>
          <TextArea
            name="description"
            placeholder="Short description of what this prompt does..."
            rows={3}
            className="w-full bg-white/4 border border-white/8 focus:ring-[#94FD00] rounded-[10px] px-4 py-3 text-[13px] text-white placeholder:text-white/20 outline-none transition-colors resize-none"
          />
          <FieldError className="text-[11px] text-red-400" />
        </TextField>

        {/* Prompt Content */}
        <TextField isRequired name="content" className="flex flex-col gap-1.5">
          <Label
            className={`${jetbrainsMono.className} text-[10px] font-bold text-white/30 tracking-[0.12em] uppercase`}
          >
            Prompt Content
          </Label>
          <TextArea
            name="content"
            placeholder="Write your full prompt here. Use {{variables}} for dynamic inputs..."
            rows={6}
            className={`${jetbrainsMono.className} w-full bg-[#0d120d] border border-white/8 focus:ring-[#94FD00] rounded-[10px] px-4 py-3 text-[12px] text-white/80 placeholder:text-white/20 outline-none transition-colors resize-none leading-[1.8]`}
          />
          <FieldError className="text-[11px] text-red-400" />
        </TextField>

        {/* Category + AI Tool */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <Label
              className={`${jetbrainsMono.className} text-[10px] font-bold text-white/30 tracking-[0.12em] uppercase`}
            >
              Category
            </Label>
            <Select name="category" isRequired placeholder="Select one">
              <Select.Trigger className="bg-white/4 border border-white/8">
                <Select.Value className="text-white/70" />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover className="bg-[#0d120d] border border-white/8 text-white">
                <ListBox>
                  {CATEGORIES.map((c) => (
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
          </div>

          <div className="flex flex-col gap-1.5">
            <Label
              className={`${jetbrainsMono.className} text-[10px] font-bold text-white/30 tracking-[0.12em] uppercase`}
            >
              AI Tool
            </Label>
            <Select isRequired name="aiTool" placeholder="Select one">
              <Select.Trigger className="bg-white/4 border border-white/8">
                <Select.Value className="text-white/70" />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover className="bg-[#0d120d] border border-white/8 text-white">
                <ListBox>
                  {AI_TOOLS.map((t) => (
                    <ListBox.Item
                      key={t}
                      id={t}
                      textValue={t}
                      className="hover:bg-[#94FD00] hover:text-black transition-all"
                    >
                      {t}
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-col gap-1.5">
          <label
            className={`${jetbrainsMono.className} text-[10px] font-bold text-white/30 tracking-[0.12em] uppercase`}
          >
            Tags{" "}
            <span className="text-white/18 normal-case tracking-normal font-normal">
              (press Enter or comma to add, max 8)
            </span>
          </label>
          <div className="min-h-11.5 flex flex-wrap items-center gap-2 bg-white/4 border border-white/8 focus-within:border-[#AAFF00]/35 rounded-[10px] px-3 py-2.5 transition-colors">
            {tags.map((tag) => (
              <span
                key={tag}
                className={`${jetbrainsMono.className} flex items-center gap-1 bg-[#AAFF00]/10 text-[#94FD00] text-[10px] font-bold px-2.5 py-1 rounded-full`}
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="hover:text-white transition-colors"
                >
                  <Xmark width={11} height={11} />
                </button>
              </span>
            ))}
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              placeholder={
                tags.length === 0 ? "e.g. ChatGPT, Marketing..." : ""
              }
              className="flex-1 min-w-30 bg-transparent outline-none text-[13px] text-white placeholder:text-white/20 focus:ring-0"
            />
          </div>
        </div>

        {/* Difficulty + Visibility */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Difficulty */}
          <div className="flex flex-col gap-1.5">
            <label
              className={`${jetbrainsMono.className} text-[10px] font-bold text-white/30 tracking-[0.12em] uppercase`}
            >
              Difficulty Level
            </label>
            <div className="flex gap-2">
              {DIFFICULTY.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDifficulty(d)}
                  className={`flex-1 py-2.5 rounded-[10px] text-[11px] font-bold tracking-[0.06em] border transition-all duration-150 ${
                    difficulty === d
                      ? "bg-[#AAFF00]/10 text-[#94FD00] border-[#AAFF00]/30"
                      : "bg-white/3 text-white/35 border-white/8 hover:border-white/20"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Visibility */}
          <div className="flex flex-col gap-1.5">
            <Label
              className={`${jetbrainsMono.className} text-[10px] font-bold text-white/30 tracking-[0.12em] uppercase`}
            >
              Visibility
            </Label>
            <div className="flex gap-2">
              {VISIBILITY.map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setVisibility(v)}
                  className={`flex-1 py-2.5 rounded-[10px] text-[11px] font-bold tracking-[0.06em] border transition-all duration-150 ${
                    visibility === v
                      ? "bg-[#AAFF00]/10 text-[#94FD00] border-[#AAFF00]/30"
                      : "bg-white/3 text-white/35 border-white/8 hover:border-white/20"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Thumbnail Upload */}
        <div className="flex flex-col gap-1.5">
          <Label
            className={`${jetbrainsMono.className} text-[10px] font-bold text-white/30 tracking-[0.12em] uppercase`}
          >
            Thumbnail Image
          </Label>
          <Label className="cursor-pointer">
            <Input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            {thumbnailPreview ? (
              <div className="relative w-full h-45 rounded-3xl overflow-hidden border border-[#AAFF00]/20 group">
                <Image
                  src={thumbnailPreview}
                  alt="Thumbnail preview"
                  height={180}
                  width={639}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white/70 text-[13px] font-medium">
                    Click to change
                  </span>
                </div>
              </div>
            ) : (
              <div className="w-full h-45 bg-white/3 border border-dashed border-white/12 hover:border-[#AAFF00]/30 hover:bg-[#AAFF00]/2 rounded-3xl flex flex-col items-center justify-center gap-3 transition-all duration-200">
                <CloudArrowUpIn
                  width={28}
                  height={28}
                  className="text-white/25"
                />
                <div className="text-center">
                  <p className="text-[13px] text-white/40 font-medium">
                    Click to upload thumbnail
                  </p>
                  <p
                    className={`${jetbrainsMono.className} text-[10px] text-white/20 mt-1`}
                  >
                    PNG, JPG, WEBP — max 5MB
                  </p>
                </div>
              </div>
            )}
          </Label>
        </div>

        {/* Submit */}
        <div className="flex gap-3 pt-2 pb-8">
          <Button
            type="reset"
            className="flex-1 bg-white/4 hover:bg-white/8 border border-white/8 text-white/60 font-semibold text-[13px] py-3 rounded-full transition-colors"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            isLoading={submitting}
            className="flex-1 bg-[#94FD00] hover:bg-[#BFFF33] text-[#0a0a0a] font-bold text-[13px] py-3 rounded-full transition-colors disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Submit for Review →"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddPromptForm;
