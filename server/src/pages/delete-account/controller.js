/* globals sendEvent */
// const page = require("./page").page;

let helperReadyResolve;
let helperReadyPromise = new Promise((resolve, reject) => {
  helperReadyResolve = resolve;
});

document.addEventListener("helper-ready", () => {
  helperReadyResolve();
  let event = document.createEvent("CustomEvent");
  event.initCustomEvent("page-ready", true, true, null);
  document.dispatchEvent(event);
}, false);

exports.launch = function (m) {
  if (m.complete) {
    sendEvent("delete-account-completed");
    helperReadyPromise.then(() => {
      let event = document.createEvent("CustomEvent");
      event.initCustomEvent("delete-everything", true, true, null);
      document.dispatchEvent(event);
    });
  } else {
    sendEvent("start-delete-account");
  }
};

window.controller = exports;
