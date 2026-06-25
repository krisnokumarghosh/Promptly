// import { headers } from "next/headers";
// import { auth } from "../auth";

import { serverFetch } from "../core/server";

// export const getUsersList = async () => {
//   const users = await auth.api.listUsers({
//     query: {
//       sortBy: "createdAt",
//       sortDirection: "desc",
//     },
//     headers: await headers(),
//   });
//   return users.users.filter((user) => user.role !== "admin");
// };

export const getUsersList = async () => {
  return serverFetch("/api/users");
};
