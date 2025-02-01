import expressApp from "./express-app";

const PORT = process.env.PORT || 3000;

export const StartServer = async () => {
  expressApp.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });

  process.on("uncaughtException", async (err) => {
    console.error("uncaughtException", err);
    process.exit(1);
  });
};

StartServer().then(() => {
  console.log("Server started successfully");
});
