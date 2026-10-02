async function carregarPokemon() {
    const mensagem = document.querySelector("#mensagem");

    mensagem.textContent = "Iniciando a busca...";

    const resposta = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
    const dados = await resposta.json();
    const pokemons = dados.results;

    const lista = document.querySelector("#listaPokemon");
    lista.textContent = "";

    for (let cont = 0; cont < pokemons.length; cont++) {
        const pokemon = pokemons[cont];

        
        const respostaDetalhes = await fetch(pokemon.url);
        const detalhes = await respostaDetalhes.json();

        const ficha = document.createElement("article");

        const titulo = document.createElement("h2");
        
        titulo.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

        const imagem = document.createElement("img");
        imagem.src = detalhes.sprites.front_default;
        imagem.alt = pokemon.name;

        const idTexto = document.createElement("p");
        idTexto.textContent = `Número: #${detalhes.id}`;

        const tipoTexto = document.createElement("p");
        const tipos = detalhes.types.map(t => t.type.name).join(", ");
        tipoTexto.textContent = `Tipo: ${tipos}`;

        ficha.appendChild(titulo);
        ficha.appendChild(imagem);
        ficha.appendChild(idTexto);
        ficha.appendChild(tipoTexto);

        lista.appendChild(ficha);
    }

    mensagem.textContent = "Registro na Pokedex completo: Pokemons buscados!";
}