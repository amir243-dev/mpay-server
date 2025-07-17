// HERE IS ALSO THE MONGOOSE FROM THE MODEL THAT HANDLES THE CONTROLLER FILE.
const Contact = require("../models/contact");

// FORM-VALIDATION
const submitContact = async (req, res) => {
  const { name, email, subject, message } = req.body;

  //   Save all the data that will be in these keys in the database.
  //   If you need to get something from an external source, we use the async-await function.

  const contactInfo = await Contact.create({ name, email, subject, message });

  console.log(req.body);
  console.log(contactInfo);

  //   Response Message if successful

  res.status(201).json({ message: "Submitted Successfully" });
};

module.exports = submitContact;
