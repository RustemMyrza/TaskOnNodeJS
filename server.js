/*'use strict';

const fs = require('fs');
const express = require('express')
const path = require('path');
const bodyParser = require('body-parser')
const app = express()

const port = 3001


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());






app.post('/result',(req, res) =>{
  let form_data = {
    Name: req.body.name,
    Surname: req.body.sname,
    Password: req.body.psw,
    Age: req.body.old,
    Country: req.body.country
  };
  let data = JSON.stringify(form_data);
  let arr = []
  arr = arr.push(data)
  fs.writeFile('DB.json', arr, (err) => {
      if (err) throw err;
      console.log('Data written to file');
  });

  res.send()

})


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
})

app.listen(port)
console.log('This is after the write call');
*/








///////////////////////////////////////////////////////////////////////////////////////////






const fs = require('fs');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const port = 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());





app.post('/result', (req, res) => {
  let form_data = {
    Name: req.body.name,
    Surname: req.body.sname,
    Password: req.body.psw,
    Age: req.body.old,
    Country: req.body.country,
  };

  fs.readFile('DB.json', 'utf8', (err, data) => {

    let arr = JSON.parse(data);
    arr.push(form_data);

    fs.writeFile('DB.json', JSON.stringify(arr), (err) => {
      if (err) throw err;
      console.log('Data written to file');
      let tableHtml = `
        <table id="my_table">
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Password</th>
            <th>Age</th>
            <th>Country</th>
          </tr>`;

      for (let i = 0; i < arr.length; i++) {
        let obj = arr[i];
        tableHtml += `
          <tr>
            <td>${obj.Name}</td>
            <td>${obj.Surname}</td>
            <td>${obj.Password}</td>
            <td>${obj.Age}</td>
            <td>${obj.Country}</td>
          </tr>`;
      }

      tableHtml += `</table>`;

      // Send the HTML table as the response
      res.send(tableHtml)

    });
  });

});






app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});








app.listen(port);
console.log('This is after the write call');




////////////////////////////////////////////////////////////////////////////////////////////////
