const auth = async (req, res) => {
  try {
    let token = "dasda";
    if (token == "mayur") {
      return res.status(200).json("authorized");
    } else {
      return res.status(401).json("Not authorized");
    }
  } catch (error) {
    console.log("error:", error);
    return res.status(401).json("something went wrong");
  }
};

module.exports = auth;
