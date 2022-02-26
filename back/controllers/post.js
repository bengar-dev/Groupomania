const express = require('express');
var mysql = require('mysql');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const sanitizer = require('sanitizer')

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "groupo_db"
});

exports.getAll = (req, res, next) => {
  var sql = `SELECT *, posts.id AS postId FROM posts, users WHERE posts.userId = users.id ORDER BY postedat DESC`
  con.query(sql, function(error, rows, filed) {
    if (error) throw error;
    if (rows.length === 0) {
        return res.status(401).json({message: 'Aucun post'});
    } else {
        return res.status(200).json({rows});
    }
  })
}

exports.getOne = (req, res, next) => {
  var sql = `SELECT *, posts.id AS postId FROM posts, users WHERE posts.userId = users.id && posts.id = '${req.params.id}' ORDER BY postId DESC`
  con.query(sql, function(error, rows, filed) {
    if (error) throw error;
    if (rows.length === 0) {
        return res.status(401).json({message: 'Aucun post'});
    } else {
        return res.status(200).json({rows});
    }
  })
}

exports.postOne = (req, res, next) => {
  var userId = req.body.userId
  var content = sanitizer.escape(req.body.content)
  if(req.file) {
    var imgUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    var sql = `INSERT INTO posts (id, userId, msg, img, postedat) VALUES ('${req.body.id}','${userId}', '${content}', '${imgUrl}', NOW())`;
    con.query(sql, function(error, rows, filed) {
    if(error) {
      return res.status(401).json({error})
    } else {
      return res.status(200).json({message: 'Publication envoyé'})
    }
  })
  } else {
    var sql = `INSERT INTO posts (id, userId, msg, postedat) VALUES ('${req.body.id}','${userId}', '${content}', NOW())`;
    con.query(sql, function(error, rows, filed) {
    if(error) {
      return res.status(401).json({error})
    } else {
      return res.status(200).json({message: 'Publication envoyé'})
    }
  })
  }
}

exports.editOne = (req, res, next) => {
  var content = sanitizer.escape(req.body.msg)
  var sql = `SELECT * FROM posts WHERE id = '${req.params.id}'`
  var imgPost = ''
  if (req.body.img !== undefined) {
    imgPost = req.body.img
  }
  con.query(sql, function(error, rows, filed){
    if(error) throw error;
    if(rows.length === 0) {
      return res.status(401).json({message: 'Publication inconnue'})
    }
    let filename = rows[0].img
    // vérification si le post appartien bien à l'utilisateur
    let token = req.headers.authorization.split(' ')[1];
    let decodedToken = jwt.verify(token, 'EZJIAOEJZHIOEJZAIOEJZAIOEZAJUIEOZAJUEIOZA');
    let userId = decodedToken.userId;
    if (rows[0].userId !== userId){
      return res.status(401).json({message: 'Non autorisé'})
    }
    if (filename) {
      filename = rows[0].img.split('/images/')[1];
    }
    if(req.file) {
      var imgUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      var sql = `UPDATE posts SET msg = '${content}', img = '${imgUrl}' WHERE id = '${req.params.id}'`;
      con.query(sql, function(error, rows, filed){
        if(error) throw error;
        if (filename && req.body.img !== undefined) {
          fs.unlink(`images/${filename}`, (err => {
            if(err) throw err;
            console.log('image suprr')
          }))
        }
        return res.status(200).json({message: 'Publication mise à jour'})
      })
    } else {
      var sql = `UPDATE posts SET msg = '${content}', img = '${imgPost}' WHERE id = '${req.params.id}'`;
      con.query(sql, function(error, rows, filed){
      if(error) throw error;
      if (filename) {
        fs.unlink(`images/${filename}`, (err => {
          if(err) throw err;
          console.log('image suprr')
        }))
      }
      return res.status(200).json({message: 'Publication mise à jour'})
    })
    }  
  })
}


exports.editCmt = (req, res, next) => {
  var content = sanitizer.escape(req.body.msg)
  var sql = `SELECT * FROM cmt WHERE id = '${req.params.id}'`
  con.query(sql, function (error, rows, filed) {
    if(error) throw error
    if (!rows.length) {
      return res.status(401).json({message: 'Commentaire inconnu'})
    }
    // vérification si le commentaire appartient bien à l'utilisateur
    let token = req.headers.authorization.split(' ')[1];
    let decodedToken = jwt.verify(token, 'EZJIAOEJZHIOEJZAIOEJZAIOEZAJUIEOZAJUEIOZA');
    let userId = decodedToken.userId;
    if (rows[0].userId !== userId) {
      return res.status(401).json({message : 'Non autorisé'})
    }
    else {
      var sql = `UPDATE cmt SET msg = '${content}' WHERE id = '${req.params.id}'`
      con.query(sql, function(error, rows, filed) {
        if(error) throw error
        return res.status(200).json({message: 'Commentaire mis à jour'})
      })
    }
  })
}


exports.deleteOne = (req, res, next) => {
  // vérification si le post appartien bien à l'utilisateur
  let token = req.headers.authorization.split(' ')[1];
  let decodedToken = jwt.verify(token, 'EZJIAOEJZHIOEJZAIOEJZAIOEZAJUIEOZAJUEIOZA');
  const userId = decodedToken.userId;
  // on récupère les tables user & post
  var sql = `SELECT *, posts.id AS postId FROM posts, users WHERE posts.id = '${req.params.id}' AND users.id = '${userId}'`
  con.query(sql, function(error, rows, filed) {
    if (error) throw error;
    if (rows.length === 0) {
      return res.status(401).json({message: 'Publication inconnue'})
    }
    let filename = null
    if (rows[0].img !== null) {
      filename = rows[0].img.split('/images/')[1];
    }
    // vérification si le post appartient bien à l'utilisateur ou si l'utilsateur est ADMIN
    if(rows[0].id == rows[0].userId || rows[0].admin == 1) {
        // on supprime le post
        var sql = `DELETE FROM posts WHERE id = '${req.params.id}'`
        con.query(sql, function(error, rows, filed) {
          if(error) {
            return res.status(401).json({error})
          } else { // on supprime les commentaires lié à ce post
            var sql = `DELETE FROM cmt WHERE postId = '${req.params.id}'`
            con.query(sql, function(error, rows, filed) {
              if (error) throw error;
              return res.status(200).json({message: 'Post supprimé'})
            })
            if(filename) {
              fs.unlink(`images/${filename}`, (err => {
                if(err) throw err;
                console.log('image suprr')
              }))
            }
            else {
              console.log('ok')
            }
          }
        })
    } else {
        return res.status(401).json({message: 'Non autorisé'})
    }
  })
}

exports.postCmt = (req, res, next) => {
  var content = sanitizer.escape(req.body.msg)
  var sql = `INSERT INTO cmt (id, postId, userId, msg, cmtdate) VALUES ('${req.body.id}', '${req.params.id}', '${req.body.userId}', '${content}', NOW())`;
  con.query(sql, function(error, rows, filed) {
    if(error) {
      return res.status(400).json({error})
    } else {
      return res.status(200).json({message: 'Commentaire posté!'})
    }
  })
}

exports.getCmt = (req, res, next) => {
  var sql = `SELECT *, cmt.id AS cmtId FROM cmt, users WHERE users.id = cmt.userId ORDER BY cmtdate DESC`
  con.query(sql, function(error, rows, filed) {
    if(error) throw error;
    if(rows.length === 0){
      return res.status(401).json({message: 'Aucun commentaire'})
    }
    else {
      return res.status(200).json({rows})
    }
  })
}

exports.deleteCmt = (req, res, next) => {
  // vérification si le post appartien bien à l'utilisateur
  let token = req.headers.authorization.split(' ')[1];
  let decodedToken = jwt.verify(token, 'EZJIAOEJZHIOEJZAIOEJZAIOEZAJUIEOZAJUEIOZA');
  let userId = decodedToken.userId;
  var sql = `SELECT *, cmt.id AS cmtId FROM cmt, users WHERE cmt.id = ${req.params.id} AND users.id = '${userId}'`
  con.query(sql, function(error, rows, filed) {
    if(error) throw error;
    if(rows.length === 0) {
      return res.status(401).json({message: 'Aucun commentaire'})
    }
    if (rows[0].userId == rows[0].id || rows[0].admin == 1) {
      var sql = `DELETE FROM cmt WHERE id = '${req.params.id}'`
      con.query(sql, function(error, rows, filed) {
        if(error) {
          return res.status(401).json({error})
        } else {
          return res.status(200).json({message: 'Cmt supprimé'})
        }
      })
    } else {
        return res.status(401).json({message: 'Non autorisé'})
    }
  })
}

exports.postLike = (req, res, next) => {
  var sql = `SELECT * FROM posts WHERE id = '${req.params.id}'`
  con.query(sql, function(error, rows, filed) {
    if(error) throw error;
    if(rows.length === 0) {
      return res.status(401).json({message: 'Publication inconnue'})
    }
    const userLike = JSON.parse(rows[0].userLike)
    const foundUser = userLike.findIndex((a) => a == req.body.userId);
    // On regarde si l'utilisateur n'a pas déjà like le post
    if (foundUser == -1 && req.body.like == 1) {
      const pushUser = userLike.push(req.body.userId)
      const jsonUserLike = JSON.stringify(userLike)
      const likes = userLike.length
      var sql = `UPDATE posts SET userLike = '${jsonUserLike}', countLike = '${likes}' WHERE id = '${req.params.id}'`;
      con.query(sql, function(error, rows, filed) {
        if(error) {
          return res.status(400).json({error})
        } else {
          return res.status(200).json({likes})
        }
      })
      //si l'utilisateur a déjà like & veut enlever son like.
    } else if (foundUser > -1 && req.body.like == 0) {
      const spliceUser = userLike.splice(foundUser, 1)
      const jsonUserLike = JSON.stringify(userLike)
      const likes = userLike.length
      var sql = `UPDATE posts SET userLike = '${jsonUserLike}', countLike = '${likes}' WHERE id = '${req.params.id}'`;
      con.query(sql, function(error, rows, filed) {
        if(error) {
          return res.status(400).json({error})
        } else {
          return res.status(200).json({likes})
        }
      })
    }
  })
}
