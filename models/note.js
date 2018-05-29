// note.js from 9.5.12 solved
var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
var Comment = new Schema({
  // `title` must be of type String
  articleComment: {
    type: String,
    required: true
  },
  articleID: {
    type: Number,
    required: true
  }
});

//this is obviously a complete disaster...

module.exports = {
  find: function (req, res) {
    db.NOTE.find({ _headlineId: req.params.id }).then
    (function(dbNote) {
      res.json(dbNote);
      })
    },
  create: function (req, res) {
      db.NOTE.create(req.body).then(function(dbNote) {
        res.json(dbNote);
        })
      },
  delete: function (req, res) {
        db.NOTE.remove({ _Id: req.params.id }).then
        (function(dbNote) {
          res.json(dbNote);
          })
        }
};

// This creates our model from the above schema, using mongoose's model method
var Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;