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