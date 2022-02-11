class customPopup extends HTMLElement{
  constructor() {
    // Always call super first in constructor
    super();

    this.attachShadow({mode: 'open'});


    let mainDiv = document.createElement("div");
    mainDiv.className = "popupMain";
    mainDiv.style.display = "none";
    let contentDiv = document.createElement("div");
    contentDiv.className = "popupContent";
    let closeButton = document.createElement("button");
    closeButton.className = "closeButton";
    closeButton.innerText = "Ok"
    closeButton.onclick = () => {
      this.close();
    }

    let variableDiv = document.createElement("div");
    variableDiv.className = "variableDiv";
    contentDiv.appendChild(variableDiv);


    contentDiv.appendChild(closeButton);
    mainDiv.appendChild(contentDiv);


    let style = document.createElement("link");
    style.href = "./popupStyle.css";
    style.rel = "stylesheet";
    style.type = "text/css";
    this.shadowRoot.append(mainDiv, style);

    this.close = function(){
      try{
        sounds.close.play().catch(e => {
          console.log("closed");
        });
      } catch(e) {
        console.log("closed");
      }
      mainDiv.className = "popupMain";
      mainDiv.style.display = "none";

      if (this.onClose){
        this.onClose();
      }
    }
    this.open = function(){
      this.focus();
      try{
        sounds.open.play().catch(e => {
          console.log("opened");
        });
      } catch(e) {
        console.log("opened");
      }
      mainDiv.className = "popupMain open";
      mainDiv.style.display = "block";
    }

    this.content = variableDiv;
  }
}
customElements.define('custom-popup', customPopup);




function popup(html, onClose){
  let toPop = new customPopup();

  if (onClose){
    toPop.onClose = onClose;
  }
  
  if (typeof html === 'string' || html instanceof String){
    toPop.content.innerHTML = html;
  } else {
    toPop.content.appendChild(html);
  }

  document.body.appendChild(toPop);
  return toPop;
}
