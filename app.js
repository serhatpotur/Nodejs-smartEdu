const express = require("express");
const app = express();
const port = 3000;

app.get('/', (req,res)=>{
    res.status(200).send('index sayfası')
})



app.listen(port, () => {
  console.log(`Sunucu ${port} portu ile başlatıldı`);

});

