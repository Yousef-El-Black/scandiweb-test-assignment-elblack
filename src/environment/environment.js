const env = "prod";

export const links = {
  serverLink:
    env === "dev"
      ? "http://localhost"
      : "https://scandiweb-test-assignment-elblack.vercel.app",
};
