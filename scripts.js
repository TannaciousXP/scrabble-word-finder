let d = document;

function makeEleWithAttr (ele, attr = null) {
  let element = d.createElement(ele);
  for (let key in attr) {
    element.setAttribute(key, attr[key]);
  }
  return element;
}

function getlist() {
  let display = d.getElementById('display').innerHTML.toUpperCase().trim();
  let haveList;
  let list;
  
  if (d.getElementById('list') === null) {
    list = makeEleWithAttr('ul', {id: 'list'});
    haveList = false;
  } else {
    list = d.getElementById('list');
    list.innerHTML = '';
    haveList = true;
  }
  list.innerHTML = `List of words for ${display}`;   
  let li;
  let wrapper = d.getElementById('wrapper');
  if (display.length <= 7) {
    let option = new Request(`http:localhost:3000/lookup/${display}`, {"method" : 'GET'});
    fetch(option).then(data => data.json()).then(results => {          
      results.forEach((word) => {
        li = d.createElement('li');
        li.innerHTML = word;
        list.appendChild(li);
      });
      d.getElementById('display').innerHTML = '';
      
    }).catch(err => console.log('Request failed', err));
  } else {      
    li = d.createElement('li');
    li.innerHTML = `Your word ${display} is too long`;
    list.appendChild(li);    
  }
  haveList ? 
  wrapper.replaceChild(list, wrapper.childNodes[5]) : 
  wrapper.appendChild(list);
}

