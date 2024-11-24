<template>
  <img v-if="!pokemonToGuess" src="/pokeball.png" class="loading" />
  <div v-else class="pokemon-record">
    <div>
      <h1>Who's that pokemon?</h1>

      <PokemonPicture
        :pokemonId="pokemonToGuess.id"
        :showPokemon="showPokemon"
      />

      <PokemonOptions
        :pokemons="pokemons"
        :disableClick="disableClick"
        @selected="checkAnswer"
      />

      <div v-if="showPokemon">
        <h2 class="fade-in">{{ message }}</h2>
        <button v-if="!restart" @click="nextRound" class="next">
          Next round
        </button>
        <button v-else @click="newGame" class="restart">Restart?</button>
      </div>
    </div>
    <div>
      <h3>Round: {{ rounds }}</h3>
      <h3>Score: {{ score }}</h3>
      <h3>Lives remaining: {{ lives }}</h3>
    </div>
  </div>
</template>

<script>
import PokemonPicture from "@/components/PokemonPicture.vue";
import PokemonOptions from "@/components/PokemonOptions.vue";

import getPokemonOptions from "@/helpers/getPokemonOptions";

export default {
  components: { PokemonPicture, PokemonOptions },
  data() {
    return {
      pokemons: [],
      pokemonToGuess: null,
      showPokemon: false,
      message: "",
      buttonMessage: "",
      rounds: 1,
      score: 0,
      lives: 2,
      restart: false,
      disableClick: false,
    };
  },
  methods: {
    async mixPokemonArray() {
      this.pokemons = await getPokemonOptions();

      const index = Math.floor(Math.random() * 4);
      this.pokemonToGuess = this.pokemons[index];
    },
    checkAnswer(selectedPokemon) {
      if (selectedPokemon === this.pokemonToGuess.id) {
        this.message = `Correct, it was ${this.pokemonToGuess.name}!`;
        this.score += 50;
      } else {
        this.message = `Oops, it actually was ${this.pokemonToGuess.name}`;
        if (this.lives === 1) {
          this.restart = true;
          this.lives--;
          this.message = "You ran out of lives";
        } else {
          this.lives--;
        }
        this.score = 0;
      }

      this.disableClick = true;
      this.showPokemon = true;
    },
    reset() {
      this.showPokemon = false;
      this.disableClick = false;
      this.pokemonToGuess = null;
      this.mixPokemonArray();
    },
    nextRound() {
      this.rounds++;
      this.reset();
    },
    // reset variables and call reset function
    newGame() {
      this.rounds = 1;
      this.lives = 2;
      this.restart = false;
      this.reset();
    },
  },
  mounted() {
    this.mixPokemonArray();
  },
};
</script>

<style scoped>
.pokemon-record {
  display: flex;
  gap: 3rem;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

h1 {
  color: #ffcc01;
  font-family: "Pokemon Solid", sans-serif;
  font-size: 3rem;
  letter-spacing: 3px;
  margin: 0;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #355fac;
}

h3 {
  font-family: monospace;
  font-size: 1.5rem;
  text-align: left;
}

button {
  color: white;
  font-weight: 500;
  box-shadow: 0.25rem 0.25rem 0.625rem 0 gray;
}
.next {
  background: rgba(20, 110, 188, 0.77);
}
.restart {
  background: rgba(188, 20, 20, 0.77);
}
button:hover {
  opacity: 0.5rem;
}

.loading {
  animation: rotation 2s infinite linear;
  margin-top: 10rem;
  opacity: 0.5;
  transition: 0.3s ease-in-out;
  width: 15%;
}
@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}

@media screen and (max-width: 768px) {
  .pokemon-record {
    flex-direction: column;
  }
}
</style>
