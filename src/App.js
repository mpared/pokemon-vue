import { PokemonTeamViewModel } from "../viewModel.js";
import PokemonCard from "./PokemonCard.js";

export const App = {
  components: {
    "pokemon-card": PokemonCard,
  },
  template: /*html*/ `
  <div>
  <section v-if="currentScreen === 'setup'" class="setup-container">
      <h2 class="setup-title">Configuració dels Jugadors</h2>
      <p class="setup-instruccions">
          Introdueix els noms dels jugadors per començar el joc.
      </p>
  
      <div class="toggle-container">
          <label for="two-players-toggle">Dos Jugadors:</label>
          <label class="switch">
          <input type="checkbox" v-model="isTwoPlayers" />
          <span class="slider round"></span>
          </label>
      </div>
  
      <div class="player-input-group">
          <label for="player1-name" class="player-label">Nom del Jugador 1:</label>
          <input type="text" v-model="player1Name" class="player-input" required />
      </div>
  
      <div class="player-input-group" v-if="isTwoPlayers">
          <label for="player2-name" class="player-label">Nom del Jugador 2:</label>
          <input type="text" v-model="player2Name" class="player-input" required />
      </div>
  
      <button @click="startGame" class="setup-button">Següent</button>
  </section>
        <!-- Secció de selecció de l'equip -->
  <section v-if="currentScreen === 'teamSelection'" id="team-selection-section">
      <h2>Selecciona el teu Equip</h2>
      <h2>{{ currentPlayerSelectionMessage }}</h2>        
      <h2 id="credits-display">
          Crèdits restants: <span id="credits-value">{{ creditsDisplay }}</span>
      </h2>
      <div id="team-section">
          <h2 id="current-player-selection">{{ currentPlayerSelectionDisplay }}</h2>
          <div id="selected-team-grid" class="grid-container" ref="teamContainer">
            <pokemon-card
            v-for="(poke, index) in currentPlayerTeam"
            :key="index"
            :pokemon="poke"
            :is-selected="isPokemonInTeam(poke.name)"
            @toggle-selection="handleToggleSelection"
            />
          </div>
      </div>

      <button id="next-player-button" @click="handleNextPlayer">
          {{buttonLabel}}
      </button>
      <!-- Opcions d'ordenació -->
      <div id="sort-options-section">
          <h2>Opcions d'Ordenació</h2>
          <form id="sort-options-form">
              <fieldset>
                  <legend>Ordena per:</legend>
                  <label>
                  <input type="radio" name="sort-criteria" value="name" v-model="sortCriteria" />
                  Nom
                  </label>
                  <label>
                  <input type="radio" name="sort-criteria" value="points" v-model="sortCriteria" />
                  Punts
                  </label>
                  <label>
                  <input type="radio" name="sort-criteria" value="type" v-model="sortCriteria" />
                  Tipus
                  </label>
              </fieldset>
              <fieldset>
                  <legend>Mètode d'ordenació:</legend>
                  <label>
                  <input type="radio" name="sort-method" value="bubble" v-model="sortMethod" />
                  Bombolla
                  </label>
                  <label>
                  <input type="radio" name="sort-method" value="insertion" v-model="sortMethod" />
                  Inserció
                  </label>
                  <label>
                  <input type="radio" name="sort-method" value="selection" v-model="sortMethod" />
                  Selecció
                  </label>
              </fieldset>
              <button type="button" id="sort-team" @click="handleSortOptions">
              Ordenar
              </button>
          </form>
      </div>
      <div id="pokemon-grid" class="grid-container" ref="gridContainer">
          <pokemon-card
          v-for="(poke, index) in globalPokemonList"
          :key="index"
          :pokemon="poke"
          :is-selected="isPokemonInTeam(poke.name)"
          @toggle-selection="handleToggleSelection"
          />
      </div>
    </section>
      <!-- Secció de la Batalla -->
      <section v-if="currentScreen ==='battleSection'" id="battle-section">
        <h2>Moment de la Batalla!</h2>
        <h1 id="current-turn-display">{{currentTurnDisplay}}</h1>
        <button id="perform-attack-button" @click="startBattle()">Atacar!</button>
      </section>


      <!-- Arena de Combat -->
      <section v-if="currentScreen === 'battleArenaSection'" id="battle-arena-section" style="display: block">

      <h2>Vista General dels Equips</h2>
      <h3 id="player1-team-name">Equip del Jugador {{this.player1Name}}</h3>
      <div id="player1-team-display" class="player1-selected-team-grid">
        <pokemon-card
        v-for="(poke, index) in player1Team"
        :key="index"
        :pokemon="poke"
        :inBattle="true"
        :is-selected="isPokemonInTeam(poke.name)"
        />
      </div>
      <h3 id="player2-team-name">Equip del Jugador {{this.player2Name}}</h3>
      <div id="player2-team-display" class="player2-selected-team-grid">
        <pokemon-card
        v-for="(poke, index) in player2Team"
        :key="index"
        :pokemon="poke"
        :inBattle="true"
        :is-selected="isPokemonInTeam(poke.name)"
        />
      </div>
      <div style="display: flex">
        <!-- Show the first Pokémon in a single card -->
        <div id="pokemon1-display" class="pokemon-fighter">
          <pokemon-card
            v-if="pokemon1Arena"
            :pokemon="pokemon1Arena"
            :inBattle="true"
          />
        </div>        <!-- VS Text -->
        <p class="vs-text">VS</p>

        <!-- Show the second Pokémon in a single card -->
        <div id="pokemon2-display" class="pokemon-fighter">
          <pokemon-card
            v-if="pokemon2Arena"
            :pokemon="pokemon2Arena"
            :inBattle="true"
          />
        </div>
        <!-- Battle Log -->
        <div class="battle-log-container">
          <h2>Registre de la Batalla</h2>
          <div id="battle-log" ref="battleLog">
            <div v-for="(entry, index) in battleLog" :key="index">
              <!-- For all but the very last, show normal text -->
              <h2 v-if="entry.type == 'h2'">
                {{ entry.message }}
              </h2>
              <p v-else-if="entry.bold == false">
                {{ entry.message }}
              </p>
              <!-- For the final message, show it in bold -->
              <p v-else>
                <b>{{ entry.message }}</b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
</div>    
`,
  data() {
    return {
      currentScreen: "setup",
      isTwoPlayers: true,
      player1Name: "",
      player2Name: "",
      currentPlayerSelectionMessage: "",
      currentPlayerSelectionDisplay: "",
      sortCriteria: "",
      sortMethod: "",
      globalPokemonList: [],
      showTeamList: [],
      buttonLabel: "Següent Jugador",
      viewModel: new PokemonTeamViewModel(),
      currentTurnDisplay: 'És el torn del Jugador 1!',
    };
  },
  methods: {
    startGame() {
      if (!this.player1Name || (this.isTwoPlayers && !this.player2Name)) {
        alert("Si us plau, introdueix els noms de tots els jugadors.");
        return;
      }
      if (!this.isTwoPlayers) {
        this.player2Name = "CPU";
      }
      console.log(
        `Jugador 1: ${this.player1Name}, Jugador 2: ${this.player2Name}`
      );
      this.currentScreen = "teamSelection";
      this.startTeamSelection();
    },
    startTeamSelection() {
      // Call initializeMatch() on the ViewModel to set up players
      this.viewModel.initializeMatch(this.player1Name, this.player2Name);
      // Set up for Player 1's team selection
      this.viewModel.currentPlayer = this.viewModel.player1;
      this.currentPlayerSelectionMessage = `${this.player1Name}, selecciona el teu equip Pokémon`;
      this.renderGlobalList();
    },
    // Exemple del mètode adaptat
    renderGlobalList() {
      // En lloc de manipular el DOM, actualitzem la propietat reactiva:
      this.globalPokemonList = this.viewModel.getGlobalList();
      // Això farà que Vue re-renderitzi la graella amb la nova llista.
    },
    renderSelectionTeam() {
      this.currentPlayerTeam = this.viewModel.currentPlayer.getTeam();
    },
    handleNextPlayer() {
      // Check the current player and handle transitions.
      if (this.viewModel.currentPlayer === this.viewModel.player1) {
        // Player 1 finished selecting their team.
        this.viewModel.switchPlayer();
        if (this.isTwoPlayers) {
          //
          // Two-player mode: move to Player 2.
          this.currentPlayerSelectionMessage = `${this.player2Name}, selecciona el teu Pokémon`;
          this.buttonLabel = "Fi de la selecció d'equips";
        } else {
          // One player vs. CPU: automatically select a team for the CPU.
          this.currentPlayerSelectionMessage = `${this.player2Name} ha seleccionat el seu equip.`;
          this.viewModel.autoSelectCpuTeam();
          this.buttonLabel = "Fi de la selecció d'equips";
        }
      } else if (this.viewModel.currentPlayer === this.viewModel.player2) {
        // Both players have selected their teams.
        this.transitionToBattle();
      }
    },
    transitionToBattle() {
      // Hide team selection and sort options.
      this.currentScreen="battleSection"
      // For example, update the battle header with Player 1’s turn.
      this.currentTurnDisplay=`Comença la batalla: ${this.viewModel.player1.getName()}!`;
  
      // (Optionally, you might also render both teams in the battle section.)
    },
    handleSortOptions() {
      this.viewModel.sortGlobalList(this.sortCriteria, this.sortMethod);
      this.renderGlobalList();
    },
    isPokemonInTeam(name) {
      const playerTeam =
        this.viewModel.currentPlayer === this.viewModel.player1
          ? this.viewModel.player1.team
          : this.viewModel.player2.team;
      return playerTeam.selectedTeam.some((p) => p.name === name);
    },
    // Called from inside the parent when child emits `toggle-selection`
    handleToggleSelection(pokemon) {
      // If it's already in the team, remove it. Otherwise, try to add it.
      const isInTeam = this.isPokemonInTeam(pokemon.name);
      if (isInTeam) {
        this.viewModel.removePokemonFromTeam(pokemon.name);
      } else {
        const addResult =
          this.viewModel.addPokemonToCurrentPlayer(pokemon);
        if (!addResult) {
          alert("No es pot afegir el Pokémon.");
        }
      }
    },
    startBattle() {
      this.currentScreen="battleArenaSection";
      console.log("🔥 Battle started!");
 
      // Call ViewModel to start 
      this.viewModel.startBattle();
//      this.viewModel.startBattle(); CONTINUE DEVELOPING HERE.
    },
  },
  // Altres mètodes...
  mounted() {
    this.viewModel.fetchAndLoadPokemons();
    // Aquí pots comprovar la referència del grid si cal
    console.log("Grid container:", this.$refs.gridContainer);
  },
  updated() {
    const logDiv = this.$refs.battleLog;
    if (logDiv) {
      logDiv.scrollTo({ top: logDiv.scrollHeight, behavior: 'smooth' });
    }
  },
  computed: {
    creditsDisplay() {
      // Return the current player’s credits directly from the viewModel
      return this.viewModel.currentPlayer.getCredits();
    },
    currentPlayerTeam() {
      return this.viewModel.getTeam();
    },
    player1Team() {
      return this.viewModel.getTeam('Player1');
    },
    player2Team() {
      return this.viewModel.getTeam('Player2');
    },
    pokemon1Arena(){
      return this.viewModel.getWhoIsFighting('Player1');
    },
    pokemon2Arena(){
      return this.viewModel.getWhoIsFighting('Player2');
    },
    battleLog(){
      return this.viewModel.getBattleLog();
    }
  },
};
