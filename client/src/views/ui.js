var Films = require('../models/films');

var UI = function() {
  this.films = new Films();
  this.films.all(function (result){
    this.render(result)
  }.bind(this));
}

UI.prototype = {
  createText: function(text, label) {
    var p = document.createElement('p');
    p.innerText = label + text;
    return p;
  },

  appendText: function(element, text, label) {
    var pTag = this.createText(text, label);
    element.appendChild(pTag);
  },

  createReview: function(li, review) {
    this.appendText(li, review.comment, 'Comment: ');
    this.appendText(li, review.rating, 'Rating: ');
    this.appendText(li, review.author, 'Author: ');
  },
  createForm: function() {
    var form = document.querySelector('form');

    var title = document.createElement('input');
    title.setAttribute('type', 'text');
    var genre = document.createElement('input');
    genre.setAttribute('type', 'text');
    var actors = document.createElement('input');
    actors.setAttribute('type', 'text');  
    var button = document.createElement('input');
    button.setAttribute('type', 'submit');
    
    form.appendChild(title); 
    form.appendChild(genre); 
    form.appendChild(actors);
    form.appendChild(button);

    form.onsubmit = function(event) {
      // event.preventDefault();//stops the submit button from refreshing the pages.

      var film = {title: title.value, genre: genre.value, actors: actors.value};
      var jsonFilm = JSON.stringify(film);

    this.films.makePostRequest("/api/films", function() {
      console.log(this.responseText);
       }, jsonFilm);
    }.bind(this);

  },
  render: function(films) {
    var container = document.getElementById('films');

    for (var film of films) {
      var li = document.createElement('li');
      this.appendText(li, film.title, 'Film: ');
      this.appendText(li, film.genre, 'Genre: ');
      // this.appendText(li, film.genre, 'Actors: ');
      for (var review of film.reviews){
        this.createReview(li, review);
      }

      container.appendChild(li);

    }
      this.createForm();
  }
}

module.exports = UI;
