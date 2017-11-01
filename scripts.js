let d = document;

function getlist() {
  let display = d.getElementById('display').innerHTML;
  let option = new Request(`http:localhost:3000/lookup/${display}`, {"method" : 'GET'});
  fetch(option).then(data => data.json()).then(results => {
    let wrapper = d.getElementById('wrapper');
    let list = d.createElement('ul');
    let li;
    results.forEach((word) => {
      li = d.createElement('li');
      li.innerHTML = word;
      list.appendChild(li);
    });
    wrapper.appendChild(list);

  }).catch(err => console.log('Request failed', err));
}