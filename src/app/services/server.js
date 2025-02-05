const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/sensors', (req, res) => {
  fs.readFile('path/to/sensors.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading file');
      return;
    }
    res.send(JSON.parse(data));
  });
});

app.post('/sensors', (req, res) => {
  const newSensor = req.body;
  fs.readFile('path/to/sensors.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading file');
      return;
    }
    const sensors = JSON.parse(data);
    sensors.push(newSensor);
    fs.writeFile('path/to/sensors.json', JSON.stringify(sensors, null, 2), (err) => {
      if (err) {
        res.status(500).send('Error writing file');
        return;
      }
      res.status(201).send('Sensor added');
    });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
