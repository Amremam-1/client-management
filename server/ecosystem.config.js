module.exports = {
  apps: [
    {
      name: "client-management",
      script: "npm",
      args: "run dev",
      env: {
        NODE_ENV: "development",
      },
    },
  ],
};
