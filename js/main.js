/* global data */
/* exported data */

var $entryForm = document.getElementById('journal-entry-form');
var $imageInput = document.getElementById('image');
var $photoUrl = document.getElementById('photo-url');
var $entryTitle = document.getElementById('entry-title');
var $notes = document.getElementById('notes');
var $entriesDiv = document.getElementById('entries-div');
var $entryFormDiv = document.getElementById('entry-form-div');
var $entryFormPageTitle = document.getElementById('entry-form-page-title');
var ulNodes = document.getElementsByTagName('li');

// Edit Entry page title creation:
var $editTitleText = document.createTextNode('Edit Entry');
var $editTitle = document.createElement('h1');
$editTitle.setAttribute('id', 'edit-entry-page-title');
$editTitle.appendChild($editTitleText);

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

  // Conditionally update the data model based on data.editing value:
  if (data.editing !== null) {
    formEntryValues.nextEntryId = data.editing.nextEntryId;
    // if the data model has this entry already, update the entry object's values:
    for (var entry of data.entries) {
      for (var key in entry) {
        if (entry[key] === formEntryValues.nextEntryId) {
          entry.photoUrl = formEntryValues.photoUrl;
          entry.entryTitle = formEntryValues.entryTitle;
          entry.notes = formEntryValues.notes;
        }
      }
    }
    // Show edited entry on the entries page without needing to reload:
    var editedIdNum = formEntryValues.nextEntryId;
    var editedEntry = renderEntries(data.entries[data.entries.length - editedIdNum]);
    ulNodes[ulNodes.length - editedIdNum].replaceWith(editedEntry);

    data.editing = null;

  } else {

    formEntryValues.nextEntryId = data.nextEntryId;
    data.nextEntryId++;
    data.entries.unshift(formEntryValues);

    // Show the newest post on the entries page without needing to reload:
    $entryListUl.prepend(renderEntries(data.entries[0]));
  }

  // Reset form fields and show entries list:
  $imageInput.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entryForm.reset();
  $entryFormDiv.classList.add('hidden');
  $entriesDiv.classList.remove('hidden');
}

$entryForm.addEventListener('submit', submitEventHandler);

// Return a DOM Tree for each journal entry:

function renderEntries(entryObj) {
  var $li = document.createElement('li');
  $li.setAttribute('class', 'entry-item');
  $li.setAttribute('data-entry-id', entryObj.nextEntryId);

  var $divEntryImgCont = document.createElement('div');
  $divEntryImgCont.setAttribute('class', 'bottom-margin column-full column-half');
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

  var $editIcon = document.createElement('i');
  $editIcon.setAttribute('class', 'fas fa-pen');
  $h2Title.appendChild($editIcon);

  var $pNotes = document.createElement('p');
  var $pNotesText = document.createTextNode(entryObj.notes);
  $pNotes.appendChild($pNotesText);
  $columnDiv.appendChild($pNotes);

  return $li;
}

var $entryListUl = document.querySelector('.entry-list');
var $clickedEntry;

/* Listen for clicks on the icon element of ul and show entry form */

$entryListUl.addEventListener('click', function (event) {
  // logic gate:
  if (event.target.tagName !== 'I') {
    return;
  }

  // Get entry ID number from element attribute:
  $clickedEntry = event.target.closest('.entry-item');
  var idNum = +$clickedEntry.getAttribute('data-entry-id');

  // Locate correct entry object by entry ID number:
  for (var entry of data.entries) {
    for (var key in entry) {
      if (entry[key] === idNum) {
        data.editing = entry;
      }
    }
  }

  // Pre-populate the entry form with the clicked entry's data:

  $entryTitle.value = data.editing.entryTitle;
  $photoUrl.value = data.editing.photoUrl;
  $imageInput.setAttribute('src', $photoUrl.value);
  $notes.value = data.editing.notes;

  // Change page title:

  $entryFormPageTitle.replaceWith($editTitle);

  $entriesDiv.classList.add('hidden');
  $entryFormDiv.classList.remove('hidden');
});

/* Listen for DOMContentLoaded and use a loop to create a DOM
tree for each journal entry in the data model and prepend to page */

function contentLoadedHandler(event) {
  for (var i = data.entries.length - 1; i >= 0; i--) {
    $entryListUl.prepend(renderEntries(data.entries[i]));
  }

  // Hide the appropriate section div based on data.view value:
  if (data.view === 'entries') {
    $entriesDiv.classList.remove('hidden');
    $entryFormDiv.classList.add('hidden');
  } else if (data.view === 'entry-form') {
    $entriesDiv.classList.add('hidden');
    $entryFormDiv.classList.remove('hidden');
  }
}

window.addEventListener('DOMContentLoaded', contentLoadedHandler);

// View swapping for SPA between 'New Entry' div and 'Entries' div:

var $entriesLink = document.getElementById('entries-link');
var $viewNodeList = document.querySelectorAll('.view');
var $newButton = document.getElementById('new-button');

/* Listen for clicks on 'Entries' anchor and listen for clicks
on 'New' button to swap 'hidden' class: */

function viewSwap(event) {

  // logic gate:
  if (!event.target.matches('.link')) {
    return;
  }

  var $targetDataView = event.target.getAttribute('data-view');

  for (var viewNode of $viewNodeList) {
    if (viewNode.getAttribute('data-view') === $targetDataView) {
      viewNode.classList.remove('hidden');
    } else {
      viewNode.classList.add('hidden');
    }
  }

  // Change page title back to new entry:
  if (event.target === $newButton) {
    $editTitle.replaceWith($entryFormPageTitle);
  }

}

$entriesLink.addEventListener('click', viewSwap);
$newButton.addEventListener('click', viewSwap);
