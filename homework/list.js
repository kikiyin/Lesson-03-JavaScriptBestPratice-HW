'use strict';


var List = function() {
    this._listNoteContent = [];
    this._wrapper = document.querySelector('#note-list-wrapper')
}

var ListNote = new List() ;

List.prototype.start=function() {
    
    this.fetchList()
        .then(function(data){
            this.updateList(data);
        }.bind(this))
        .then(this.drawList.bind(this))
        .then(this.preloadFirstNote.bind(this));
        //.then(this.preloadFirstNote().bind(this));
        //It is wrong because ()
    
    window.addEventListener('click', function(event) {
        this.onNoteOpen(event);
    }.bind(this));
   
}

List.prototype.onNoteOpen = function(event) {
    if (event.target.classList.contains('note-title')) {
        var id = event.target.dataset.noteId;
        var content = this._listNoteContent[id];
        window.dispatchEvent(new CustomEvent('note-open',{ detail: content }));
    }
}

List.prototype.preloadFirstNote = function() {
    if (this._listNoteContent.length !== 0) {
        var content = this._listNoteContent[0];
        window.dispatchEvent(new CustomEvent('note-open',{ detail: content }));
    }
}

List.prototype.updateList = function(list) {
    this._listNoteContent = list;
}

List.prototype.drawList = function() {
    var list = this._listNoteContent;
    var ul = document.createElement('ul');
    ul.id = 'note-title-list';
    var buff = document.createDocumentFragment();
    list.forEach(function(note, i) {
        var li = document.createElement('li');
        li.dataset.noteId = i;
        li.classList.add('note-title');
        li.textContent = note.title;
        // Note: buff is captured, so we now have a
        // little closure naturally.
        buff.appendChild(li);
    });
    ul.appendChild(buff);
    this._wrapper.appendChild(ul);
}

List.prototype.fetchList = function(){//afterFetch) {
    return  new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://127.0.0.1:8000/Desktop/Lesson-03-JavaScriptBestPratice-HW-homework/homework/demo-list-notes.json', true);
        xhr.responseType = 'json';
        xhr.onreadystatechange = function(e) {
            // Watch out: we have a mysterious unknown 'this'.
            if (this.readyState === 4 && this.status === 200) {
                var listData = this.response;
                // The flow ends here.
                // afterFetch(listData);
                resolve(listData);
            } else if (this.status !== 200 ){
                // Ignore error in this case.
                reject();
            }
        };
    xhr.send();
    });
    console.log("abc");
}


document.addEventListener('DOMContentLoaded', function(event) {
    ListNote.start();
});
