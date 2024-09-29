class Utils {
  static generateUniqueId() {
    const uniqueId01 = Math.floor(Math.random() * 10000000000)
      .toString(16)
      .padStart(4, "0")
      .slice(0, 4);
    const uniqueId02 = Math.floor(Math.random() * 10000000000)
      .toString(16)
      .padStart(4, "0")
      .slice(0, 4);
    const uniqueId03 = Math.floor(Math.random() * 10000000000)
      .toString(16)
      .padStart(4, "0")
      .slice(0, 4);

    return `notes-${uniqueId01}-${uniqueId02}-${uniqueId03}`;
  }

  static makeNewNotes(id, title, body, createdAt, created, archieved) {
    return {
      id,
      title,
      body,
      createdAt,
      created,
      archieved,
    };
  }

  static generateCreatedAt() {
    const date = new Date();
    return date.toISOString();
  }

  static emptyElement(element) {
    element.innerHTML = "";
  }

  static showElement(element) {
    element.style.display = "block";
    element.hidden = false;
  }

  static hideElement(element) {
    element.style.display = "none";
    element.hidden = true;
  }

  static isValidInteger(newValue) {
    return Number.isNaN(newValue) || Number.isFinite(newValue);
  }
}

export default Utils;
