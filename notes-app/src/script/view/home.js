import Utils from "../utility/utils.js";
import NotesData from "../data/notes-data.js";

import {
  customValidationTitleHandler,
  customValidationDescHandler,
} from "../utility/customValidation.js";

const home = () => {
  const notes = NotesData.getAll();
  console.log(notes);

  const notesContainer = document.querySelector("#containerItem");

  function render(notes) {
    const notesItems = notes.map((note) => {
      const noteItem = document.createElement("note-item");
      noteItem.noteItem = note;
      return noteItem;
    });

    Utils.emptyElement(notesContainer);
    notesContainer.append(...notesItems);
  }

  render(notes);

  const form = document.querySelector("form");
  const titleOnInput = form.elements["doNotesTitle"];
  const descOnInput = form.elements["doNotesBody"];

  form.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  titleOnInput.addEventListener("change", customValidationTitleHandler);
  titleOnInput.addEventListener("invalid", customValidationTitleHandler);

  titleOnInput.addEventListener("blur", (event) => {
    // Validate the field
    const isValid = event.target.validity.valid;
    const errorMessage = event.target.validationMessage;

    const connectedValidationId = event.target.getAttribute("aria-describedby");
    const connectedValidationEl = connectedValidationId
      ? document.getElementById(connectedValidationId)
      : null;

    if (connectedValidationEl && errorMessage && !isValid) {
      connectedValidationEl.innerText = errorMessage;
    } else {
      connectedValidationEl.innerText = "";
    }
  });

  descOnInput.addEventListener("change", customValidationDescHandler);
  descOnInput.addEventListener("invalid", customValidationDescHandler);

  descOnInput.addEventListener("blur", (event) => {
    const isValiddesc = event.target.validity.valid;
    const errorMessagedesc = event.target.validationMessage;

    const connectedValidationId = event.target.getAttribute("aria-describedby");
    const connectedValidationEl = connectedValidationId
      ? document.getElementById(connectedValidationId)
      : null;

    if (connectedValidationEl && errorMessagedesc && !isValiddesc) {
      connectedValidationEl.innerText = errorMessagedesc;
    } else {
      connectedValidationEl.innerText = "";
    }
  });
};

export default home;
