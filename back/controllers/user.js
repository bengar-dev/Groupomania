const express = require('express');
var mysql = require('mysql');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "groupo_db"
});


exports.getAllUsers = (req, res, next) => {
    con.query('SELECT * from users', function(error, rows, field) {
        if (error) throw error;
        if (rows.length === 0) {
            return res.status(401).json({message: 'Aucun utilisateur'});
        } else {
            return res.status(200).json({rows});
        }
    });
};

exports.getUser = (req, res, next) => {
    var sql = 'SELECT * FROM users WHERE id = ' + req.params.id;
    con.query(sql, function(error, rows, filed) {
        if (error) throw error;
        if (rows.length === 0) {
            return res.status(401).json({message: 'Utilisateur introuvable'});
        } else {
            return res.status(200).json({rows});
        }
    });
};

exports.signup = (req, res, next) => {
  const validateEmail = (email) => {
      return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    };
    // vérification format email
    if(!validateEmail(req.body.email)) {
        return res.status(401).json({message: 'Email non valide'});
    }
    var sql = `SELECT * FROM users WHERE email = '${req.body.email}'`
    con.query(sql, function(err, rows, filed) {
      if (err) throw err;
      if (rows.length !== 0) {
        return res.status(401).json({message: 'Email déjà existant'})
      }
      else {
        // bcrypt js
        bcrypt.hash(req.body.password, 10)
            .then(
                hash => {
                    var sql = `INSERT INTO users (email, password, firstname, lastname) VALUES ('${req.body.email}', '${hash}', '${req.body.firstname}', '${req.body.lastname}')`;
                    con.query(sql, function(err, rows, field) {
                        if(err) {
                            return res.status(401).json({err});
                        } else {
                            return res.status(200).json({message: 'Utilisateur ajouté'});
                        }
                    });
                }
            )
            .catch(error => res.status(500).json({error}));
      }
    })
}

exports.login = (req, res, next) => {
    var sql = `SELECT * FROM users WHERE email = '${req.body.email}'`;
    con.query(sql, function(error, rows, filed) {
        if (error) throw error;
        if (rows.length === 0) {
            return res.status(401).json({message: 'Utilisateur introuvable'});
        } else {
            bcrypt.compare(req.body.password, rows[0].password)
                .then((valid) => {
                    if(!valid) {
                        return res.status(401).json({message: 'Mot de passe incorrect'})
                    }
                    res.status(200).json({
                        userId: rows[0].id,
                        admin: rows[0].admin,
                        token: jwt.sign(
                            {userId: rows[0].id},
                            'EZJIAOEJZHIOEJZAIOEJZAIOEZAJUIEOZAJUEIOZA',
                            {expiresIn: '24h'}
                        )
                    })
                })
                .catch(error => res.status(500).json({error}))
        }
    });
}

exports.editUser = (req, res, next) => {
      var sql = `SELECT * FROM users where id = '${req.body.userId}'`
      con.query(sql, function(error, rows, filed){
        if(error) throw error;
        // vérification si utilisateur existant
        if(rows.length === 0) {
          return res.status(401).json({message: 'Utilisateur introuvable'})
        } else {
          const filename = rows[0].avatar.split('/images/')[1];
          // vérification si le profil appartien bien à l'utilisateur
          let token = req.headers.authorization.split(' ')[1];
          let decodedToken = jwt.verify(token, 'EZJIAOEJZHIOEJZAIOEJZAIOEZAJUIEOZAJUEIOZA');
          let userId = decodedToken.userId;
          if (userId !== rows[0].id) {
            return res.status(401).json({message: `Vous n'avez pas l'autorisation nécéssaire`})
          } else {
            // vérification si il y a modification d'image
            if(req.file) {
              var imgUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
              var sql = `UPDATE users SET firstname = '${req.body.firstname}', lastname = '${req.body.lastname}', avatar = '${imgUrl}' WHERE id = '${req.body.userId}'`;
                con.query(sql, function(error, rows, filed) {
                  if(error) {
                      return err.status(401).json({message: 'Erreur'});
                  } else { // on supprime l'image du server pour pas qu'il y ai de doublons.
                      if (filename) {
                        fs.unlink(`images/${filename}`, (err => {
                          if(err) throw err;
                          else {
                            console.log('image supprimé')
                          }
                        }))
                      }
                      return res.status(200).json({message: 'Utilisateur modifié'});
                  }
                })
            } else { // si il y a pas de modif image on fait simplement une requete !
              var sql = `UPDATE users SET firstname = '${req.body.firstname}', lastname = '${req.body.lastname}' WHERE id = '${req.body.userId}'`;
                con.query(sql, function(error, rows, filed) {
                  if(error) {
                      return err.status(401).json({message: 'Erreur'});
                  } else {
                      return res.status(200).json({message: 'Utilisateur modifié'});
                  }
                })
            }
          }
        }
      })
}

exports.delUser = (req, res, next) => {
  var sql = `SELECT * FROM users WHERE id = '${req.params.id}'`
  con.query(sql, function(error, rows, filed) {
    if(error) throw error
    if(rows.length === 0) {
      return res.status(401).json({message: 'Utilisateur introuvable'})
    }
    bcrypt.compare(req.body.password, rows[0].password)
    .then((valid) => {
      if(!valid) {
          return res.status(401).json({message: 'Mot de passe incorrect'})
      }
      var sql = `DELETE FROM users WHERE users.id = '${req.params.id}'` // A OPTIMISER
      con.query(sql, function(error, rows, filed) {
        if(error) throw error
        var sql = `DELETE FROM posts WHERE posts.userId = '${req.params.id}'`
        con.query(sql, function(error, rows, filed) {
          if(error) throw error
          var sql = `DELETE FROM cmt WHERE cmt.userId = '${req.params.id}'`
          con.query(sql, function(error, rows, filed) {
            if(error) throw error
          })
        })
        return res.status(200).json({message: 'Utilisateur supprimé'})
      })
    })
    .catch(error => res.status(500).json({error}))
    })
  }
