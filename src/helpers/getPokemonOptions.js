import pokemonApi from "@/api/pokemonApi";

const MAX = 650;
const MIN = 1;

const getPokemonNumber = () => {
  const pokemonsList = [0, 0, 0, 0];

  return pokemonsList.map(() => Math.floor(Math.random() * (MAX - MIN) + MIN));
};

const getPokemonOptions = async () => {
  const [a, b, c, d] = getPokemonNumber();

  const promises = [
    pokemonApi.get(`/${a}`),
    pokemonApi.get(`/${b}`),
    pokemonApi.get(`/${c}`),
    pokemonApi.get(`/${d}`),
  ];
  const [poke1, poke2, poke3, poke4] = await Promise.all(promises);

  return [
    { name: poke1.data.name, id: poke1.data.id },
    { name: poke2.data.name, id: poke2.data.id },
    { name: poke3.data.name, id: poke3.data.id },
    { name: poke4.data.name, id: poke4.data.id },
  ];
};

export default getPokemonOptions;
