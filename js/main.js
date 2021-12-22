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
  // MAY NEED TO PUT PREPPEND AND RENDER HERE
  $imageInput.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entryForm.reset();
}

$entryForm.addEventListener('submit', submitEventHandler);

// Unordered List:

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
  var $h2TitleText = document.createTextNode(obj.entryTitle);
  $h2Title.appendChild($h2TitleText);
  $columnDiv.appendChild($h2Title);

  var $pNotes = document.createElement('p');
  var $pNotesText = document.createTextNode(obj.notes);
  $pNotes.appendChild($pNotesText);
  $columnDiv.appendChild($pNotes);

  return $li;
}

var $entryListUl = document.querySelector('.entry-list');

var obj = {
  entryTitle: 'Title',
  nextEntryId: 1,
  notes: 'The Document Object Model (DOM) is a cross-platform and language-independent interface that treats an XML or HTML document as a tree structure wherein each node is an object representing a part of the document. The DOM represents a document with a logical tree. Each branch of the tree ends in a node, and each node contains objects. \n\nDOM methods allow programmatic access to the tree; with them one can change the structure, style or content of a document.',
  photoUrl: 'https://cms-assets.tutsplus.com/cdn-cgi/image/width=360/uploads/users/423/posts/23393/final_image/data-structures-4-of-4.jpg'
};

$entryListUl.prepend(renderEntries(obj));
