"use strict";

var response = require("../res");
var connection = require("../conn");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, DIR);
  },
  filename: (req, file, cb) => {
      const fileName = file.originalname.toLowerCase().split(' ').join('-');
      cb(null, uuidv4() + '-' + fileName)
  }
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
          cb(null, true);
      } else {
          cb(null, false);
          return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
  }
});


exports.getArticle = function (req, res) {
  var q =
    "SELECT title, img, created_datetime FROM articles ORDER BY created_datetime DESC";

  connection.query(q, [], function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};

exports.getArticleDetails = function (req, res) {
  var article_id = req.params.article_id;

  var q = "SELECT * FROM articles WHERE id = ?";

  connection.query(q, [article_id], function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};

exports.postArticle = function (req, res) {
  var title = req.body.title;
  var body = req.body.body;
  var author = req.body.author;
  var article_source = req.body.article_source;
  // var img = req.body.img;

  var q = "INSERT INTO articles (title, body, author, article_source, created_datetime) VALUES (?, ?, ?, ?, NOW())";

  connection.query(q, [
      title,
      body,
      author,
      article_source,
      // img
    ], function (error) {
    if (error) {
      console.log(error);
    } else {
      response.ok("Success posting article!", res);
    }
  });
};

// exports.addItems = function(req, res) {

//     var item_name = req.body.item_name;
//     var item_merk = req.body.item_merk;
//     var item_qty  = req.body.item_qty;
//     var input_by  = req.body.input_by;

//     var q = 'INSERT INTO atk (item, merk, qty, tanggal_input, input_by) values (?, ?, ?, CURDATE(), ?)';

//     connection.query(q, [
//         item_name,
//         item_merk,
//         item_qty,
//         input_by
//     ],

//     function (error, rows, fields){
//         if(error){
//             console.log(error)
//         } else{
//             response.ok("Berhasil menambahkan item!", res)
//         }
//     });

// };

// exports.itemDetails = function(req, res) {

//     var item_id = req.params.item_id;

//     var q = " SELECT * FROM atk WHERE id = ? "

//     connection.query(q, [
//         item_id
//     ],

//     function (error, rows, fields){
//         if(error){
//             console.log(error)
//         } else{
//             response.ok(rows, res)
//         }
//     });

// };

// exports.updateItem = function(req, res) {

//     var item_id     = req.params.item_id;
//     var item_name   = req.body.item_name;
//     var item_merk   = req.body.item_merk;
//     var item_qty    = req.body.item_qty;

//     var q = " UPDATE atk SET qty = ?, item = ?, merk = ?, tanggal_input = CURDATE() WHERE id = ? ";

//     connection.query(q , [
//         item_qty,
//         item_name,
//         item_merk,
//         item_id
//     ],

//     function (error, rows, fields){
//         if(error){
//             console.log(error)
//         } else{
//             response.ok("Berhasil mengedit item!", res)
//         }
//     });

// };

// exports.deleteItem = function(req, res) {

//     var item_id = req.params.item_id;

//     var q = ' DELETE FROM atk WHERE id = ? ';

//     connection.query(q, [
//         item_id
//     ],

//     function (error, rows, fields){
//         if(error){
//             console.log(error)
//         } else{
//             response.ok("Berhasil menghapus item!", res)
//         }
//     });

// };
