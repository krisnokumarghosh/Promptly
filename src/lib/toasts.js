import toast from "react-hot-toast";

export const successToast = (msg) => {
  toast.success(msg, {
    style: {
      background: "#0d120d",
      border: "0.5px solid rgba(170,255,0,0.3)",
      color: "#AAFF00",
      borderRadius: "12px",
      padding: "12px 16px",
    },
    iconTheme: {
      primary: "#AAFF00",
      secondary: "#0d120d",
    },
  });
};

export const errorToast = (msg) => {
  toast.error(msg, {
    style: {
      background: "#0d120d",
      border: "0.5px solid rgba(255,80,80,0.3)",
      color: "#ff6b6b",
      borderRadius: "12px",
      padding: "12px 16px",
    },
    iconTheme: {
      primary: "#ff6b6b",
      secondary: "#0d120d",
    },
  });
};



/**
 *  <select
           value={current.category}
           onChange={(e) => updateParam("category", e.target.value)}
           className={`${jetbrainsMono.className} bg-[#0d120d] border border-white/[0.07] rounded-2xl px-3 py-2 text-[11px] text-white/60 focus:outline-none focus:border-[#AAFF00]/40 transition-colors`}
         >
           <option value="">All Categories</option>
           {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
         </select>
 */



/**
 * this is my all prompts page:

import { getActivePrompts } from '@/lib/api/prompts';
import React from 'react';

const AllPromptsPage = async () => {
    const prompts = await getActivePrompts(query)
    return (
        <div className='text-white'>
            {prompts.length}
        </div>
    );
};

export default AllPromptsPage;

this is api fetch:

export const getActivePrompts = async (query) => {
  return serverFetch(`/api/prompts?${query}&status=approved`);
};


and this is api:

 app.get("/api/prompts", async (req, res) => {
      const query = {};
      if (req.query.status) {
        query.status = req.query.status;
      }

      // pagination
      if (req.query.page) {
        const page = parseInt(req.query.page);
        const perPage = parseInt(req.query.perPage) || 10;
        const skipItems = (page - 1) * perPage;
        const total = await promptCollection.countDocuments(query);
        const cursor = promptCollection
          .find(query)
          .skip(skipItems)
          .limit(perPage);
        const prompts = await cursor.toArray();
        return res.send({ total, prompts });
      }

      const cursor = promptCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

now make a component where all prompt will be showed . each prompt card will contain





Prompt Title



Category



AI Tool



Copy Count



Creator Name



View Details Button



thumbnail image

in all prompt component add search , filter  and sort funtionality.



for search funtionality:

Search by:





Prompt Title



Tags



AI Tool



for filter:

Filter by:





Category



AI Tool



Difficulty Level



for sort:

Sort by:





Most Popular (by rating)



Most Copied



Latest

CATEGORIES = [
  "Coding",
  "Writing",
  "Marketing",
  "Design",
  "Education",
  "Business",
  "Research",
  "Other",
];

AI_TOOLS = [
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

Note: Server side(backend) filtering, sorting and searching implementation required.



make server side implementation by search params .



also add pagination system . make pagination system also by backend. also i gave you my backend code
 */