
// toggle_init();
// function toggle_init() { 
//  var listTldr=document.getElementsByClassName('pub-tldr');
//  alert(listTldr.length);
//  for (i = 0; i < listTldr.length; i++)
//    toggle_visibility(listTldr[i]);
// }
function toggle_tldr(trigger) {
  var e = trigger.parentElement.nextElementSibling;
  // console.log(e.className);
  if(e.className.indexOf('pub-tldr') > -1){
    toggle_visibility(e);
  }
}
function toggle_visibility(e) {
  if(e.style.display == 'block')
    e.style.display = 'none';
  else
    e.style.display = 'block';
}
