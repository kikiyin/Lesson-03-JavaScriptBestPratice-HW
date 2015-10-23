'use strict';

(function() {

    var Content =function() {
        this._wrapper = document.querySelector('#note-content-wrapper');
    }
    
    var ContentNote = new Content();
  
    Content.prototype.start = function() {   //function start()
        window.addEventListener('note-open', function(event) {
            var note = event.detail;
            this.resetWrapper();
            this.drawNote(note);
        }.bind(this));
    }

    Content.prototype.resetWrapper = function(){   //function resetWrapper()
        this._wrapper.innerHTML = '';
    }

    Content.prototype.drawNote = function(note) {   //function drawNote(note)
        var title = note.title;
        var h = document.createElement('h2');
        h.textContent = title;
        var passages = note.passages;
        var buff = document.createDocumentFragment();
        passages.forEach(function(passage) {
            var p = document.createElement('p');
            p.classList.add('note-passage');
            p.textContent = passage;
            buff.appendChild(p);
        });
        this._wrapper.appendChild(h);
        this._wrapper.appendChild(buff);
    }

  

    document.addEventListener('DOMContentLoaded', function(event) {
        ContentNote.start();
    });
})();
