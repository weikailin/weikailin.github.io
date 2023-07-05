// stolen from Ethan Mook
function rot13(a) {
  return a.replace(/[a-zA-Z]/g, function(c){
    return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) 
                               ? c : c - 26);
  })
};
