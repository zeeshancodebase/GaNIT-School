exports.generateJobID = () => {
  const year = new Date().getFullYear().toString().slice(-2); // "25"
  const randomNum = Math.floor(Math.random() * 1000); // 0 to 999
  return `GNTS${year}J${randomNum.toString().padStart(3, '0')}`; // e.g. GNTS25J292
};
