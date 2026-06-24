const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


export const serverMutation = async (path, data, methode = "POST") => {
  const options = {
    method: methode,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const res = await fetch(`${baseUrl}${path}`, options);

  return await res.json();
};

// export const serverMutation = async (path, data, methode = "POST") => {
//   const res = await fetch(`${baseUrl}${path}`, {
//     method: methode,
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });
//   const result = await res.json();
//   return result;
// };

export const serverFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`);
  const result = await res.json();
  return result;
};
