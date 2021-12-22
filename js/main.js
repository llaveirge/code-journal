/* global data */
/* exported data */

var $entryForm = document.getElementById('journal-entry-form');
var $imageInput = document.getElementById('image');
var $photoUrl = document.getElementById('photo-url');
var $entryTitle = document.getElementById('entry-title');
var $notes = document.getElementById('notes');

// Listen for input events and update image src with direct URL from form entry:

function imageInputSrcHandler(event) {
  $imageInput.setAttribute('src', $photoUrl.value);
}

$photoUrl.addEventListener('input', imageInputSrcHandler);

/* Listen for submit events and put form's input values into an object before
 resetting the form fields and image src: */

function submitEventHandler(event) {
  event.preventDefault();

  var formEntryValues = {
    photoUrl: $photoUrl.value,
    entryTitle: $entryTitle.value,
    notes: $notes.value
  };

  formEntryValues.nextEntryId = data.nextEntryId;
  data.nextEntryId++;

  data.entries.unshift(formEntryValues);
  $imageInput.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entryForm.reset();
}

$entryForm.addEventListener('submit', submitEventHandler);

// Return a DOM Tree for each journal entry:

function renderEntries(entryObj) {
  var $li = document.createElement('li');
  $li.setAttribute('class', 'entry-item');

  var $divEntryImgCont = document.createElement('div');
  $divEntryImgCont.setAttribute('class', 'item-image-cont column-full column-half');
  $li.appendChild($divEntryImgCont);

  var $entryImg = document.createElement('img');
  $entryImg.setAttribute('class', 'item-image');
  $entryImg.setAttribute('src', entryObj.photoUrl);
  $entryImg.setAttribute('alt', 'Journal Entry Image');
  $divEntryImgCont.appendChild($entryImg);

  var $columnDiv = document.createElement('div');
  $columnDiv.setAttribute('class', 'column-full column-half');
  $li.appendChild($columnDiv);

  var $h2Title = document.createElement('h2');
  $h2Title.setAttribute('class', 'item-title');
  var $h2TitleText = document.createTextNode(entryObj.entryTitle);
  $h2Title.appendChild($h2TitleText);
  $columnDiv.appendChild($h2Title);

  var $pNotes = document.createElement('p');
  var $pNotesText = document.createTextNode(entryObj.notes);
  $pNotes.appendChild($pNotesText);
  $columnDiv.appendChild($pNotes);

  return $li;
}

var $entryListUl = document.querySelector('.entry-list');

/* Listen for DOMContentLoaded and use a loop to create a DOM
tree for each journal entry in the data model and prepend to page */

function contentLoadedHandler(event) {
  for (var i = data.entries.length - 1; i >= 0; i--) {
    $entryListUl.prepend(renderEntries(data.entries[i]));
  }
}

window.addEventListener('DOMContentLoaded', contentLoadedHandler);
