export const addHRUser = async (email) => {
  await fetch("/api/hr", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
};
