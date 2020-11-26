"use strict";

var response = require("../res"),
  connection = require("../conn"),
  // path = require("path"),
  multer = require("multer"),
  helpers = require("../helpers"),
  {v4: uuidv4} = require("uuid");

exports.getArticle = function (req, res) {
  var q =
    "SELECT title, uuid, created_datetime FROM articles ORDER BY created_datetime DESC";

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
  // 10 is the limit I've defined for number of uploaded files at once
  // 'multiple_images' is the name of our file input field
  var title = req.body.title;
  var body = req.body.body;
  var author = req.body.author;
  var article_source = req.body.article_source;
  var uuid = uuidv4();

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
      const fileName = file.originalname.toLowerCase().split(" ").join("-");
      cb(null, uuid + "-" + fileName);
    },
  });

  var upload = multer({
    storage: storage,
    fileFilter: helpers.imageFilter,
  }).array("multiple_images", 3);

  upload(req, res, function (err) {
    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (!req.file) {
      return res.send("Please select an image to upload");
    } else if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (err) {
      return res.send(err);
    }

    // var result = "You have uploaded these images: <hr />";
    // const files = req.files;
    // var index, len;

    // // Loop through all the uploaded images and display them on frontend
    // for (index = 0, len = files.length; index < len; ++index) {
    //   result += `<img src="${files[index].path}" width="300" style="margin-right: 20px;">`;
    // }
    // // result += '<hr/><a href="./">Upload more images</a>';
    // res.send(result);
  });

  var q =
    "INSERT INTO articles (title, body, author, article_source, created_datetime) VALUES (?, ?, ?, ?, NOW(), ?)";

  connection.query(
    q,
    [title, body, author, article_source, uuid],
    function (error) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Success posting article!", res);
      }
    }
  );
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
