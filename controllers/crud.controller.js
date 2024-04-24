import User from "../models/user.model.js";

export const updateAddress = async (req, res) => {
  try {
    const { email } = req.params;
    const { newData } = req.body;
    console.log(req.body);

    const data = { address: req.body.address };

    // Connect to MongoDB
    const user = await User.findOneAndUpdate({ email: email }, data, {
      new: true,
    });
    console.log(user);
    // Update document in the collection

    if (user) {
      res.json({ message: "Data updated successfully" });
    } else {
      res.status(404).json({ error: "Data not found" });
    }
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { email } = req.body;

    // Connect to MongoDB
    const user = await User.findOneAndDelete({ email: email });
    console.log(user);
    // Update document in the collection

    if (user) {
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ error: "Data not found" });
    }
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
