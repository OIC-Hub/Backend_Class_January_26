const contact = require("../Model/data");

function AddData(req, res) {
  
    const { name, phoneNo } = req.body;
  
    const newData = {
      id: contact.length + 1,
      name: name,
      phoneNo: phoneNo,
    };

    contact.push(newData);
    res.status(200).json({message: "Contact Added", contact})

}

function getData(req, res) {
  try {
    res.status(200).json({ message: "All contacts", contact });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
}

module.exports = { AddData, getData };
