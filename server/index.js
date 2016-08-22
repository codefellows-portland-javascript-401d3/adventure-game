const app = require('./app');
const port = 3000;

app.listen(port, err=>{
  if (err) return console.error(err);
  console.log('Server running on port 3000');
});
