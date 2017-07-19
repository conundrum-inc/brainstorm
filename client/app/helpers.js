export const buildEmailArray = (emailString) => {
  var array = [];
  var address = '';

  for (var char of emailString) {
    if (char !== ' ' && char !== ',') {
      address = address + char;
    } else {
      if (address !== '') {
        array.push(address);
        address = '';
      }
    }
  }
  if (address !== '') {
    array.push(address); 
  }

  return array;
}
