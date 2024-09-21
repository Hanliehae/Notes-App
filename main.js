document.addEventListener("DOMContentLoaded", function () {
  const addNotes = document.getElementById("doNotes");
  addNotes.addEventListener("submit", function (event) {
    event.preventDefault();
    notesToAdd();
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

let desc = [];
const RENDER = "render-notes";
const SAVED_EVENT = "saved-notes";
const STORAGE_KEY = "UR-NOTES_APP";

function notesToAdd() {
  const title = document.getElementById("doNotesTitle").value;
  const body = document.getElementById("doNotesBody").value;
  const created = Date(document.getElementById("doNotesCreated").value);
  const archieved = document.getElementById("doNotesArchieved").checked;

  const id = generateId();
  const noteOnObject = generatenoteOnObject(
    id,
    title,
    body,
    created,
    archieved
  );
  desc.push(noteOnObject);

  //   render data
  document.dispatchEvent(new Event(RENDER));
  document.getElementById("doNotes").reset();
  saveData();
}

// membuat id
function generateId() {
  return +new Date();
}

// membuat objek buku
function generatenoteOnObject(id, title, body, created, archieved) {
  return {
    id,
    title,
    body,
    created,
    archieved,
  };
}

// Buat list Buku (bookItem)
function createNotesElement(notesOnObject) {
  const notesOnTitle = document.createElement("h3");
  notesOnTitle.setAttribute("data-testid", "notesPropertyTitle");
  notesOnTitle.textContent = notesOnObject.title;

  const notesOnBody = document.createElement("p");
  notesOnBody.setAttribute("data-testid", "notesPropertyBody");
  notesOnBody.textContent = notesOnObject.body;

  const notesOnCreated = document.createElement("p");
  notesOnCreated.setAttribute("data-testid", "notesPropertyCreated");
  notesOnCreated.textContent = notesOnObject.created;

  // button
  const buttonAction = document.createElement("div");

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "delete";
  deleteButton.classList.add("delete-button");
  deleteButton.setAttribute("data-testid", "notesPropertyNewNotesDeleteButton");
  deleteButton.addEventListener("click", function () {
    removeTask(notesOnObject.id);
  });

  const editButton = document.createElement("button");
  editButton.textContent = "edit";
  editButton.classList.add("edit-button");
  editButton.setAttribute("data-testid", "notesPropertyNewNotesEditButton");
  editButton.addEventListener("click", function () {
    editTask(notesOnObject.id);
  });

  if (notesOnObject.archieved) {
    const undoButton = document.createElement("button");
    undoButton.textContent = "undo";
    undoButton.classList.add("undo-button");
    undoButton.setAttribute("data-testid", "notesPropertyArchievedButton");
    undoButton.addEventListener("click", function () {
      undoTaskFromCompleted(notesOnObject.id);
    });

    buttonAction.append(undoButton, deleteButton, editButton);
  } else {
    // belum selesai dibaca -> selesai dibaca
    const checkButton = document.createElement("button");
    checkButton.textContent = "done";
    checkButton.classList.add("check-button");
    checkButton.setAttribute("data-testid", "notesPropertyArchievedButton");
    checkButton.addEventListener("click", function () {
      addTaskToCompleted(notesOnObject.id);
    });

    buttonAction.append(checkButton, deleteButton, editButton);
  }

  const notesActions = document.createElement("div");
  notesActions.append(
    notesOnTitle,
    notesOnCreated,
    notesOnCreated,
    buttonAction
  );
  notesActions.setAttribute("data-notesid", `${notesOnObject.id}`); //bookObject batas
  notesActions.setAttribute("data-testid", "notesProperty");
  return notesActions;
}

function addTaskToCompleted(notesId) {
  const notesIndex = desc.findIndex((notes) => notes.id === Number(notesId));
  if (notesIndex !== -1) {
    desc[notesIndex].archieved = true;
  }
  document.dispatchEvent(new Event(RENDER));
  saveData();
}

function undoTaskFromCompleted(notesId) {
  const notesIndex = desc.findIndex((notes) => notes.id === Number(notesId));
  if (notesIndex !== -1) {
    desc[notesIndex].archieved = false;
  }
  document.dispatchEvent(new Event(RENDER));
  saveData();
}

function removeTask(notesId) {
  const notesIndex = desc.findIndex((notes) => notes.id === Number(notesId));
  if (notesIndex !== -1) {
    desc.splice(notesIndex, 1);
  }
  document.dispatchEvent(new Event(RENDER));
  saveData();
}

function editTask(notesId) {
  const notesIndex = desc.findIndex((notes) => notes.id === Number(notesId));
  if (notesIndex !== -1) {
    const title = document.getElementById("doNotesTitle");
    const body = document.getElementById("doNotesBody");
    const created = document.getElementById("doNotesCreated");
    title.value = desc[notesIndex].title;
    body.value = desc[notesIndex].body;
    created.value = desc[notesIndex].created;
    desc.splice(notesIndex, 1);
  }
  document.dispatchEvent(new Event(RENDER));
  saveData();
}

// const searchBar = document.getElementById("searchBook");
// searchBar.addEventListener("submit", function (event) {
//   event.preventDefault();

//   const searchInput = event.target.elements.searchBookTitle.value.toLowerCase();
//   const bookFilter = buku.filter((book) =>
//     book.title.toLowerCase().includes(searchInput)
//   );
//   if (bookFilter.length) {
//     search(bookFilter);
//   } else {
//     doocument.dispatchEvent(new Event(RENDER));
//   }
//   event.target.reset();
// });

// function search(bookFilter) {
//   const belumBaca = document.getElementById("incompleteBookList");
//   belumBaca.innerHTML = "";

//   const selesaiBaca = document.getElementById("completeBookList");
//   selesaiBaca.innerHTML = "";

//   for (const book of bookFilter) {
//     if (book.isComplete) {
//       selesaiBaca.append(createBookElement(book));
//     } else {
//       belumBaca.append(createBookElement(book));
//     }
//   }
// }

// simpan data ke lokal storage (Wajib #1)
document.addEventListener(RENDER, function () {
  // 2 rak buku (Wajib #3)
  const addingNewnotes = document.getElementById("newNotes");
  addingNewnotes.innerHTML = "";
  const archievedNotes = document.getElementById("notesArchieved");
  archievedNotes.innerHTML = "";

  for (const notes of desc) {
    if (notes.archieved) {
      archievedNotes.append(createNotesElement(desc));
    } else {
      addingNewnotes.append(createNotesElement(desc));
    }
  }
});

// Simpan Data
function saveData() {
  if (isStorageExist()) {
    const parsed /* string */ = JSON.stringify(desc);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}

document.addEventListener(SAVED_EVENT, function () {
  console.log(localStorage.getItem(STORAGE_KEY));
});

// load data
function loadDataFromStorage() {
  const serializedData /* string */ = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {
    for (const todo of data) {
      desc.push(todo);
    }
  }
  document.dispatchEvent(new Event(RENDER));
}

// function isStorageExist
function isStorageExist() {
  if (typeof Storage === undefined) {
    alert("Browser tidak mendukung local storage");
    return false;
  }
  return true;
}
