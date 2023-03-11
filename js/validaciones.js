export function valida(input) {
  const tipoDeInput = input.dataset.tipo;    //data set obtiene la coleccion de todos los datas y el .tipo es para que obtenga el que se llama asi en html
  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }

  if (input.validity.valid) {
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = "";
  } else{
    input.parentElement.classList.add("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML =
      mostrarMensajeDeError(tipoDeInput, input);
  }
}

const tipoDeErrores = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError",
];

const mensajesDeError ={
    nombre: {
      valueMissing: "el campo nombre no puede estar vacio" // valueMissing retorna true si un valor no fué inserido en un campo obligatorio, es decir, lanzará un mensaje para el usuario de 'campo obligatorio' .
    },
    email: {
      valueMissing: "el campo correo no puede estar vacio",
      typeMismatch: "el correo no es valido",
    },
    password: {
      valueMissing:"el campo contraseña no puede estar vacio",
      patternMismatch: "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales.",
    },
  nacimiento: {
    valueMissing:"este campo no puede estar vacio",
    customError:"Debes tener al menos 18 años de edad",
  },
  numero:{
    valueMissing:"este campo no puede estar vacio",
    patternMismatch:"el formato requerido es xxxxxxxxxx 10 numeros"
  },
  direccion:{
    valueMissing:"este campo no puede estar vacio",
    patternMismatch:"la direccion debe contener entre 10 a 40 caracteres"
  },
  ciudad:{
    valueMissing:"este campo no puede estar vacio",
    patternMismatch:"la ciudad debe contener entre 4 a 30 caracteres"
  },
    estado:{
    valueMissing:"este campo no puede estar vacio",
    patternMismatch:"el estado debe contener entre 4 a 30 caracteres"
  },
};

const validadores = {
  nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input) {
  let mensaje = "";
tipoDeErrores.forEach((error) => {
  if(input.validity[error]) {
  console.log(tipoDeInput, error);
  console.log(input.validity[error]);
  console.log(mensajesDeError[tipoDeInput][error]);
  mensaje = mensajesDeError[tipoDeInput][error];
  }
});
  return mensaje
}

function validarNacimiento(input) {
  const fechaCliente = new Date(input.value);
  let mensaje = "";
  if (!mayorDeEdad(fechaCliente)) {
    mensaje = "Debes tener al menos 18 años de edad";
  }

  input.setCustomValidity(mensaje);                     //Vamos a usar una función del input setCustomValidity() para definir un mensaje de error customizado.
}

function mayorDeEdad(fecha) {
  const fechaActual = new Date();
  const diferenciaFechas = new Date(
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMonth(),
    fecha.getUTCDate()
  );
  return diferenciaFechas <= fechaActual;
}
