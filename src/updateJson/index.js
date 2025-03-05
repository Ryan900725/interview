const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors())

app.put('/add-data', (req, res) => {
  const updatedData = req.body; // New data you want to update

  const filePath = path.join(__dirname, '../data.json');
  
  // Read the current data from the JSON file
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading file' });
    }

    let jsonData = JSON.parse(data);
    
    // Update data (this is an example, you can customize it as needed)
    jsonData.push(req.body);

    // Write the updated data back to the file
    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error writing to file' });
      }

      res.status(200).json({ message: 'Data updated successfully' });
    });
  });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
