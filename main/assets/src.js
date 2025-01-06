let dolar;
let usdInput = document.querySelector("#usd")
let brlInput = document.querySelector("#brl")

usdInput.addEventListener("keyup", () => {
  convert("usd-to-brl")
})
brlInput.addEventListener("keyup", () => {
  convert("brl-to-usd")
})

usdInput.addEventListener("blur", () => {
  usdInput.value = formatCurrency(usdInput.value)
})

brlInput.addEventListener("blur", () => {
  brlInput.value = formatCurrency(brlInput.value)
})  

async function updateExchangeRate() {
  try {
    const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD")
    const data = await response.json()
    dolar = data.rates.BRL
  } catch (error) {
    console.error("Erro ao acessar a API de taxa de câmbio:", error);
  }
}

updateExchangeRate().then(() => {
  usdInput.value = "1,00";
  convert("usd-to-brl");
});

function formatCurrency(value) {
  let fixedValue = fixValue(value)
  let options    = {
      useGrouping: true,
      minimumFractionDigits: 2
  }
  let formatter = new Intl.NumberFormat("pt-BR", options)
  return formatter.format(fixedValue)
}

function fixValue(value) {
  let fixedValue = value.replace(",", ".")
  let floatValue = parseFloat(fixedValue)
  if (floatValue == NaN) {
      floatValue = 0
  }
  return floatValue
}

function convert(type) {
  if(type == "usd-to-brl"){
    let fixedValue = fixValue(usdInput.value)

    let result = fixedValue * dolar
    result = result.toFixed(2)

    brlInput.value = formatCurrency(result)
  }
  if(type == "brl-to-usd"){
    let fixedValue = fixValue(brlInput.value)

    let result = fixedValue / dolar
    result = result.toFixed(2)

    usdInput.value = formatCurrency(result)
  }
}