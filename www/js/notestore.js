angular.module('mynotes.notestore', [])
	.factory('NoteStore', function() {
    var notes = angular.fromJson(window.localStorage['notes'] || '[]');

    function presist() {
    	window.localStorage['notes'] = angular.toJson(notes);
    }

    return {
      list: function() {
        return notes;
      },

      get: function(noteId) {
        for (var i=0; i<notes.length; i++) {
          if (notes[i].id === noteId)
            return notes[i]
        }
        return null;
      },

      create: function(note) {
        notes.push(note);
        presist();
      },

      update: function(note) {
        for (var i=0; i<notes.length; i++) {
          if (notes[i].id === note.id) {
            notes[i] = note;
            presist();
            return;
          }
        }
        return null;
      },

      move: function(note, fromIndex, toIndex) {
      	notes.splice(fromIndex, 1);
      	notes.splice(toIndex, 0, note);
      	presist();
      },

      remove: function(noteId) {
      	for (var i=0; i<notes.length; i++) {
          if (notes[i].id === noteId) {
            notes.splice(i, 1);
            presist()
            return;
          }
        }
      }

    };
  });