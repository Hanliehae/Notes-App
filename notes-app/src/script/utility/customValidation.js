export const customValidationTitleHandler = (event) => {
  event.target.setCustomValidity("");

  if (event.target.validity.valueMissing) {
    event.target.setCustomValidity("Wajib diisi.");
    return;
  }

  if (event.target.validity.tooShort) {
    event.target.setCustomValidity("Minimal panjang adalah lima karakter.");
    return;
  }

  if (event.target.validity.patternMismatch) {
    event.target.setCustomValidity(
      "Tidak boleh diawali dengan simbol,\
      mengandung white space atau spasi, dan\
      mengandung karakter spesial seperti dolar ($)."
    );
    return;
  }
};

export const customValidationDescHandler = (event) => {
  event.target.setCustomValidity("");

  if (event.target.validity.valueMissing) {
    event.target.setCustomValidity("Wajib diisi.");
    return;
  }

  if (event.target.validity.tooShort) {
    event.target.setCustomValidity("Minimal panjang adalah sepuluh karakter.");
    return;
  }

  if (event.target.validity.patternMismatch) {
    event.target.setCustomValidity(
      "Tidak boleh diawali dengan simbol,\
      mengandung white space atau spasi, dan\
      mengandung karakter spesial seperti dolar ($)."
    );
    return;
  }
};
