<template>
  <div class="options-container">
    <ul>
      <li v-for="pokemon in pokemons" :key="pokemon.id">
        <button
          :disabled="disableClick"
          :class="{ disabled: disableClick }"
          @click="$emit('selected', pokemon.id)"
        >
          {{ pokemon.name }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    pokemons: {
      type: Array,
      required: true,
    },
    disableClick: Boolean,
  },
};
</script>

<style scoped>
ul {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  list-style-type: none;
  padding: 0;
}

button {
  text-transform: capitalize;
}
.disabled {
  cursor: not-allowed;
  border-color: gray;
  color: gray;
}
.disabled:hover {
  background: none;
}

.options-container {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

@media screen and (max-width: 768px) {
  ul {
    grid-template-columns: 1fr;
  }
}
</style>
