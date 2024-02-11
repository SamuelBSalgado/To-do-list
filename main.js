//Inicialización de elementos del dom
const addButton = document.getElementById("addButton");
const input = document.getElementById("input");
const showSection = document.getElementById("showSection");
const deleteList = document.getElementById("btn_deleteAll");
const deleteSelected = document.getElementById("btn_deleteSelected");

let data = [];

//Al cargar la página
window.addEventListener("load", () => {
  //busca datos en local y los almacena
  const storedList = localStorage.getItem("list");

  if (storedList) { //si existen
    //Los convierte a objeto para poder aplicar forEach
    data = JSON.parse(storedList);
    data.forEach(element => { //por cada elemento del array "data"
      const nuevoDiv = document.createElement("div");// se crea un nuevo div, que después se le agrega un checkbox con el elemento de data
      nuevoDiv.innerHTML = `
      <input type="checkbox" class="checkbox">
      <span>${element}</span>
      `;
      showSection.appendChild(nuevoDiv); //se hace hijo de showSection
    });
  }
});

//Botón borrar TODO
deleteList.addEventListener("click", () => {
  const warning = confirm("Esta acción eliminará todos los elementos de tu lista"); //se alerta de la acción
  if (warning) {
    localStorage.clear(); //Si se acepta, se borra localstorage
    showSection.innerHTML = ""; //y se limpia el dom

    //Limpiar input por si hubiera algo escrito
    input.value = "";
  } else {
    //Si se cancela, no hace nada
  }
});

//Botón borrar elemento seleccionado
deleteSelected.addEventListener("click", () => {
  const checkboxes = document.querySelectorAll("#showSection input[type='checkbox']");

  //Verificar los checkboxes que estén seleccionados
  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      checkbox.parentElement.remove(); //Si se seleccionó, se borrará con todo y padre del dom
      
      //Eliminar de localstorage
      const task = checkbox.nextElementSibling.textContent;
      data = data.filter(item => item !== task);
      localStorage.setItem("list", JSON.stringify(data)); //Se refresca el array data con la info actual

      //Limpiar input por si hubiera algo escrito
      input.value = "";
    }
  });
});

//Botón añadir
addButton.addEventListener("click", () => {
  const valor = input.value.trim(); //Se almacena el valor del input eliminando espacios de más en caso de haber
  if (valor !== ""){
    data.push(valor); //Si el input no está vacío, lo agrega al array data
    
    localStorage.setItem("list", JSON.stringify(data)); //Se establece como string en localstorage y con el identificador "list"
    
    const nuevoDiv = document.createElement("div"); //Crea un nuevo div
    
    nuevoDiv.innerHTML = `
      <input type="checkbox" class="checkbox">
      <span>${valor}</span>
      `; //Se le agrega checkbox al div con el valor
    showSection.appendChild(nuevoDiv); //y se hace hijo de showSection
    
    console.log("Botón 'añadir' presionado", valor);
    
    input.value = ""; //Se limpia el input
  } else {
    alert("Debes ingresar una nota"); //Si no se escribió nada en el input, alerta con intrucción
  }
});