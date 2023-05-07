const env = "prod";

export const links = {
  serverLink:
    env === "dev"
      ? "http://localhost"
      : "https://scandiwebtestassignmentelblack.000webhostapp.com",
};
