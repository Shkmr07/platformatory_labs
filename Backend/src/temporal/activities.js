const User = require("../models/User");
async function updateUserAndNotifyCrudCrud({ googleId, phoneNumber, city, pincode }) {
  try {
    // Update in MongoDB
    await User.findOneAndUpdate({ googleId }, { phoneNumber, city, pincode });
    // Wait for 10 seconds
    await new Promise(resolve => setTimeout(resolve, 10000));
    // Notify crudcrud.com
    const response = await fetch("http://localhost:8000/auth/update-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        googleId,
        phoneNumber,
        city,
        pincode
      })
    });
    if (!response.ok) {
      throw new Error(`CrudCrud API failed: ${response.statusText}`);
    }
    console.log("User updated and notified CrudCrud successfully");
  } catch (err) {
    console.error("Activity failed:", err);
    throw err;
  }
}
module.exports = { updateUserAndNotifyCrudCrud };