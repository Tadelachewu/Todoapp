const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const PORT = process.env.PORT || 2000;

app.get('/:id', (req, res)=> {
  res.send('Hello from Termux! \n'+req.params.id+ req.url + req.protocol+req.originalUrl);
});
app.get("/about",(req,res)=>{
  res.send("about us page");
});
app.use((req, res, next) => {
  console.log("Middleware 1 reached");
  next(); // Call the next middleware without sending a response yet.
});

app.use((req, res) => {
  console.log("last middleware");
  res.send("last middleware");
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
