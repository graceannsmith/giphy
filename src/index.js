import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

function findGiph(keyword) {
  let request = new XMLHttpRequest();
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${keyword}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;
  
  
  request.addEventListener("load", function () {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      printElements(response, keyword);
    } else {
      console.log("error in API call");
    }
  });
  
  request.open("GET", url, true);
  request.send();
}
  
// UI Logic
function printElements(response) {
  let giphArray = [];
  let innerArray = response.data;
  for (let i = 0; i < innerArray.length; i++) {
    giphArray.push(innerArray[i].images.fixed_width_small.url);
  }
  
  let container = document.querySelector(".giphHolder"); /
  
  giphArray.forEach((element) => {
    let img = document.createElement("img");
    img.setAttribute("src", element);
    container.appendChild(img);
  });
}
  
function handleFormSubmission(event) {
  event.preventDefault();
  const keyword = document.querySelector("#giphword").value;
  findGiph(keyword);
}
  
window.addEventListener("load", function () {
  document.querySelector("form").addEventListener("submit", handleFormSubmission);
});
  
