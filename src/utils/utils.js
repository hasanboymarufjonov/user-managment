export const timeConverter = (time) => {
  if (time === "0000-00-00 00:00:00") return "not available";
  let date = time?.split("T")[0];
  let t = time?.split("T")[1];
  let currentTime = t?.split(".")[0].split(":");
  return `${date} ${currentTime[0]}:${currentTime[1]}`;
};

export const statusConverter = (status) => {
  if (status === 0) return "Blocked";
  return "Active";
};


