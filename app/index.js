const app = require("./app.js");
const { port } = require("./config");
const { connectToDB } = require("./db/mongoose");

async function main() {
  try {
    await connectToDB();
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  } catch (error) {
    console.log("Error:");
    console.log(error.message);
  }
}

main();
