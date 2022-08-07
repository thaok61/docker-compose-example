export const formatCCU = (num, digits) => {
  var si = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
};

export const formatDataSize = (kb, decimals = 2) => {
  if (kb === 0) return "0 KB";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(kb) / Math.log(k));

  return parseFloat((kb / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

export const isEmpty = (obj) => {
  // null and undefined are "empty"
  if (obj == null) return true;

  // Assume if it has a length property with a non-zero value
  // that that property is correct.
  if (obj.length > 0) return false;
  if (obj.length === 0) return true;

  // If it isn't an object at this point
  // it is empty, but it can't be anything *but* empty
  // Is it empty?  Depends on your application.
  if (typeof obj !== "object") return true;

  // Otherwise, does it have any properties of its own?
  // Note that this doesn't handle
  // toString and valueOf enumeration bugs in IE < 9
  for (var key in obj) {
    if (hasOwnProperty.call(obj, key)) return false;
  }

  return true;
};

export const formatPercent = (p2p, http) => {
  if (http === 0) {
    return 0;
  }
  const res = (p2p /(p2p+ http)) * 100;
  return res.toFixed(2);
};

export const formatMonthnthDataSize = (kb, decimals = 2) => {
  if (kb === 0) return "0";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const i = 2;
  return parseFloat((kb / Math.pow(k, i)).toFixed(dm));
};