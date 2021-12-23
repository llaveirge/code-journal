/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var $viewNodeListData = document.querySelectorAll('.view');
var previousEntriesJSON = localStorage.getItem('data-local-storage');

if (previousEntriesJSON !== null) {
  data = JSON.parse(previousEntriesJSON);
}

function beforeunloadHandler(event) {

  // Set the data.view value to the current visible section:
  for (var viewNode of $viewNodeListData) {
    if (!viewNode.classList.contains('hidden')) {
      data.view = viewNode.getAttribute('data-view');
    }
  }

  var dataJSON = JSON.stringify(data);
  localStorage.setItem('data-local-storage', dataJSON);
}

window.addEventListener('beforeunload', beforeunloadHandler);
