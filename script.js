const btnConverter = document.getElementById('btn-converter');
const inputQuantidade = document.getElementById('quantidade');
const selectOrigem = document.getElementById('moeda-origem');
const selectDestino = document.getElementById('moeda-destino');
const divResultado = document.getElementById('resultado');
const textoResultado = document.getElementById('texto-resultado');

btnConverter.addEventListener('click', async () => {
	const quantidade = parseFloat(inputQuantidade.value);
	const moedaOrigem = selectOrigem.value;
	const moedaDestino = selectDestino.value;

	if (!quantidade || quantidade <= 0) {
		alert('Por favor, insira um valor  válido para conversão.');
		return;
	}

	
	const url = `https://open.er-api.com/v6/latest/${moedaOrigem}`;

	try {
		divResultado.style.display = 'block';
		textoResultado.innerText = 'Buscando cotação atual...';

		const resposta = await fetch(url);
		const dados = await resposta.json();

		if (dados.result === 'success') {
			const taxaDeCambio = dados.rates[moedaDestino];
			const valorConvertido = quantidade * taxaDeCambio;

			textoResultado.innerText = `${quantidade.toFixed(2)} ${moedaOrigem} = ${valorConvertido.toFixed(2)} ${moedaDestino}`;

		} else {
			textoResultado.innerText = 'Erro ao buscar as cotações. Tente novamente.';
		}
	} catch (erro) {
		console.error('Erro na requisição:', erro);
		textoResultado.innerText = 'Falha na conexão. Verifique sua internet.';
	}


});

inputQuantidade.addEventListener('keydown', (evento) => {
	if (evento.key === 'Enter') {
		btnConverter.click();
	}
});