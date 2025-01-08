var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require('multer');

var app = express();

//--------------Initial-configuration---------------------------

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.urlencoded({extended: true}));

//-----------------multer-setup--------------------------------

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

//------------------------end-----------------------------------

//----------------------upload-file-reference------------------

app.post('/api/fileanalyse', upload.single('upfile'), (req,res) => {
  let newFile = req.file
  if (!newFile){
    return res.json("err: No file was uploaded")
  };

  res.json({
    name: newFile.originalname,
    type: newFile.mimetype,
    size: newFile.size
  })
});

//-------------------------------------------------------------


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
//-----------------------end--------------------------------------
