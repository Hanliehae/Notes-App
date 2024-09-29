class NoteItem extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _note = {
    id: null,
    title: null,
    body: null,
    createdAt: null,
    archived: false,
  };

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  //   ngapus konten lama dri shadow dom sblum render ulang
  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  set noteItem(value) {
    this._note = value;
    this.render();
  }

  get noteItem() {
    return this._note;
  }

  _updateStyle() {
    this._style.textContent = `
  
:host {
display: flex;
align-items: stretch;

}

  #containerItem {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.notesList {
  padding: 20px;
  background: #f2f3f5;
  border-radius: 10px;
  gap: 1rem;
}

.archievedBtn,
.editBtn,
.deleteBtn {
  padding: 0.25rem 0.75rem;
  cursor: pointer;
  border-radius: 5px;
  margin-inline: 0 0.25rem;
}
.archievedBtn:hover,
.editBtn:hover,
.deleteBtn:hover {
  background: rgb(31, 31, 69);
  color: white;
}

.archievedBtn:active .delete-button:active,
.edit-button:active {
  background: rgb(45, 45, 63);
  color: white;
}

    `;
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML +=
      // disamain sm yg nyimpn item di html
      `
    <div class="notesList">
              <h3 class="title">${this._note.title}</h3>
              <p class="description">${this._note.body}</p>

              <button class="archievedBtn">archieved</button>
              <button class="editBtn">edit</button>
              <button class="deleteBtn">delete</button>
            </div>
`;
  }
}

customElements.define("note-item", NoteItem);
