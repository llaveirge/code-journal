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

var formEntryValues = {
  photoUrl: $entryForm.value,
  entryTitle: $entryTitle.value,
  notes: $notes.value
};

function submitEventHandler(event) {
  event.preventDefault();

  formEntryValues = {
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
