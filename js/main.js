/* Soy realmente malo con las expresiones regulares pero buscando en google y leyendo la documentacion
  simplifique mucho como hacia los controles antes

  Este es un ejemplo:
  Esta era la forma que buscaba un valor repetido
  
  let cantidadIguales = 0;
  let caracterAnterior = "";
  let caracterActual = "";
  let limiteIguales = 3;

  for (let i = 0; i < pass.length; i++) {
    caracterActual = pass.charAt(i);
    if (caracterActual === caracterAnterior) {
      cantidadIguales++;
      if (cantidadIguales === limiteIguales - 1) return false;
    } else {
      cantidadIguales = 0;
      caracterAnterior = caracterActual;
    }
  }
  return true;
  
  documentacion de match()
  https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/match
  
  Esto hace lo mismo pero con expresiones regulares
*/

const repetidosValido = (pass) => {
  let valoresAceptados = /^(?!.*?([a-zA-Z0-9])\1\1).+/g;
  return pass.match(valoresAceptados) ? true : false;
};

const cantidadCaracteresValido = (pass, min, max) => {
  let valoresAceptados = /^[\S]{8,20}$/g;
  return pass.match(valoresAceptados) ? true : false;
};

const numerosLetrasMayusculasValido = (pass) => {
  let valoresAceptados = /(?=\w*[A-Z])(?=\w*[0-9])/g;
  return pass.match(valoresAceptados) ? true : false;
};

const caracteresEspecialesValido = (pass) => {
  let valoresAceptados = /[\W]/;
  return pass.match(valoresAceptados) ? false : true;
};

const ponerColor = (item, modo) => {
  if (modo === "normal") {
    item.classList.remove("text-danger");
    item.classList.add("text-success");
  } else {
    item.classList.remove("text-success");
    item.classList.add("text-danger");
  }
};

const controlPassword = (e) => {
  let password = $txtPassword.value;
  /* Verifico que haya entre 8 y 20 caracteres */
  let $controlA = document.getElementById("control-a");
  cantidadCaracteresValido(password, 8, 20)
    ? ponerColor($controlA, "normal")
    : ponerColor($controlA, "error");

  /* Busco que no haya 3 caracteres iguales consecutivos */
  let $controlB = document.getElementById("control-b");
  numerosLetrasMayusculasValido(password)
    ? ponerColor($controlB, "normal")
    : ponerColor($controlB, "error");

  /* Busco que haya Numeros y Caracteres*/
  let $controlC = document.getElementById("control-c");
  repetidosValido(password)
    ? ponerColor($controlC, "normal")
    : ponerColor($controlC, "error");

  /* Busco que no haya caracteres especiales */
  let $controlD = document.getElementById("control-d");
  caracteresEspecialesValido(password)
    ? ponerColor($controlD, "normal")
    : ponerColor($controlD, "error");

  /* Si todos son validos habilito el boton */
  cantidadCaracteresValido(password, 8, 20) &&
  numerosLetrasMayusculasValido(password) &&
  repetidosValido(password) &&
  caracteresEspecialesValido(password)
    ? ($btnPassword.disabled = false)
    : ($btnPassword.disabled = true);
};

function mostrarPassword() {
  let cambio = document.getElementById("input-password");
  if (cambio.type == "password") {
    cambio.type = "text";
    $showPasswordIcon.classList.remove("bi-eye");
    $showPasswordIcon.classList.add("bi-eye-slash");
  } else {
    cambio.type = "password";
    $showPasswordIcon.classList.remove("bi-eye-slash");
    $showPasswordIcon.classList.add("bi-eye");
  }
}

const $txtPassword = document.getElementById("input-password");
const $btnPassword = document.getElementById("btn-password");
const $showPassword = document.getElementById("show-password");
const $showPasswordIcon = document.getElementById("show-password-icon");

$txtPassword.addEventListener("keyup", controlPassword);
$btnPassword.addEventListener(
  "click",
  function (event) {
    mostrarModal();
  },
  false
);
$showPassword.addEventListener(
  "click",
  function (event) {
    mostrarPassword();
  },
  false
);

console.clear();
controlPassword();
