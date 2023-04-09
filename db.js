const mongoose = require("mongoose");

module.exports = async () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    await mongoose.connect(process.env.DB, connectionParams);
    // console.log("Connected to database successfully")
    console.log(`
      \x1b[46m CONNECTED TO DATABASE \x1b[0;32m  SUCCESSFULLY  \x1b[0;30m
        `);
  } catch (error) {
    // console.log("Could not connect to database!")
    console.log(`
      \x1b[41mCOULD NOT CONNECT TO DATABASE\x1b[0;30m
      \x1b[0;30m
                \x1b[41m ERORR \x1b[0;30m
              
        `);
  }
};
