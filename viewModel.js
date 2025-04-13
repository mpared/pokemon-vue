import { Player, PokemonList, PokemonTeam } from "./model.js"; // class PokemonList {...}
// class PokemonTeam {...}
//
// =========================
// Classe: PokemonTeamViewModel
// =========================

// =========================
// Classe: PokemonTeamViewModel
// =========================
// UML Requirements:
//  - team: PokemonTeam
//  - pokemonList: PokemonList
//  - addPokemonToTeam(name: string): void
//  - removePokemonFromTeam(name: string): void
//  - sortGlobalList(criteria: string, method: string): void
//  - getGlobalList(): List<Pokemon>
//  - getTeamDetails(): string
//  - getCredits(): int

export class PokemonTeamViewModel {
  constructor(jsonUrl = "./pokemon_data.json"){
    this.player1 = new Player();
    this.player2 = new Player();
    this.currentPlayer = this.player1;
    this.team = new PokemonTeam();
    this.pokemonList = new PokemonList();
    this.battleLog = [];
    this.jsonUrl = jsonUrl;
  }
  async fetchAndLoadPokemons() {
    try {
      console.log("Fetching from URL:", this.jsonUrl);
      const response = await fetch(this.jsonUrl);
      if (!response.ok) {
        throw new Error("HTTP error: " + response.status);
      }
      const data = await response.json();
      console.log("Data fetched:", data);
      this.pokemonList.loadPokemons(data);
    } catch (error) {
      console.error("Error loading Pokémon data:", error);
    }
  }
  // Initializes the match with two players
  initializeMatch(player1Name, player2Name) {
    this.player1 = new Player(player1Name);
    this.player2 = new Player(player2Name);
    this.currentPlayer = this.player1;
    
  }

  // Switches to the next player
  switchPlayer() {
    if(this.currentPlayer.name=this.player1.name){
      this.currentPlayer=this.player2;
    }
    else{
      this.currentPlayer=this.player1;
    }
  }

  // Retrieves the current player
  getCurrentPlayer() {
    return this.currentPlayer;
/*    if(this.currentPlayer.name==this.player1.name){
      return this.player1;
    }
    else if(this.currentPlayer.name==this.player2.name){
      return this.player2;
    }  */
  }

  // Checks if both players have full teams
  areTeamsComplete() {
    return this.player1.team.isFull() && this.player2.team.isFull();
  }
  //
  // * Add a Pokémon to the team by name.
  // * If it doesn't exist in the global list, log an error.
  // * If not enough credits, log an error.
  // * If already on the team, it won't add again.

  addPokemonToTeam(name) {
    const pokemon = this.pokemonList.getPokemonByName(name);
    if (!pokemon) {
      console.error("❌ Pokémon not found in the global list.");
      return;
    }

    if (this.team.getCredits() < pokemon.points) {
      console.error("❌ Not enough credits to add this Pokémon!");
      return;
    }

    const success = this.team.addPokemon(pokemon);
    if (!success) {
      console.warn(`⚠️ The Pokémon ${pokemon.name} is already on the team.`);
    }
  }

  //
  // * Remove a Pokémon from the team by name.
  // *
  // Adds a Pokémon to the current player's team
  addPokemonToCurrentPlayer(pokemon) {
    if(this.currentPlayer==this.player1){
      return this.player1.team.addPokemon(pokemon);
    }
    else if(this.currentPlayer==this.player2){
      return this.player2.team.addPokemon(pokemon);
    }
  }

  removePokemonFromTeam(pokemon) {
    if(this.currentPlayer==this.player1){
      this.player1.team.removePokemon(pokemon)
    }
    else if(this.currentPlayer==this.player2){
      return this.player2.team.removePokemon(pokemon);
    }
  }

  // *
  // * Sort the global list by given criteria and method.
  // * ('name', 'points', 'type') + ('bubble', 'insertion', 'selection')
  //
  sortGlobalList(criteria, method) {
    this.pokemonList.sortPokemons(criteria, method);
  }

  // **
  // * Returns the "raw" array of Pokémon (the global list).
  // * We return the actual list of Pokemon objects,
  // * though your UML says "List<Pokemon>"—that’s effectively an array in JS.
  // *
  getGlobalList() {
    // The UML says "List<Pokemon>", so we return the array of Pokemon objects
    return this.pokemonList.allPokemons;
  }

  // **
  // * Returns a string describing the current team (like "Bulbasaur\nCharmander\n...").
  // * In your real UI, you may not strictly need this, but it’s in the UML.
  // *
  getTeamDetails() {
    return this.team.getTeamDetails();
  }

  getTeam(player='Current'){
    switch(player){
      case 'Current':
        return this.currentPlayer.getTeam();
      case 'Player1':
        return this.player1.getTeam();
      case 'Player2':
        return this.player2.getTeam();
    }
    return `Error: ${player} is not a valid player's name.`; 
  }
  // **
  // * Returns the current credits remaining.
  // *
  getCredits() {
    return this.currentPlayer.team.getCredits();
  }
  setPlayerNames(player1Name, player2Name) {
    this.player1.name = player1Name;
    this.player2.name = player2Name;
  }
  autoSelectCpuTeam() {
    console.log("⚙️ Auto-selecting Pokémon for CPU...");
    const cpuTeam = this.player2.team;
    const availablePokemons = [...this.pokemonList.allPokemons];

    // Shuffle Pokémon randomly
    for (let i = availablePokemons.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [availablePokemons[i], availablePokemons[j]] = [
        availablePokemons[j],
        availablePokemons[i],
      ];
    }

    // Try to use max credits and max number of Pokémon
    for (let pokemon of availablePokemons) {
      if (
        cpuTeam.selectedTeam.length < cpuTeam.maxTeamSize &&
        cpuTeam.credits >= pokemon.points
      ) {
        cpuTeam.addPokemon(pokemon);
      }

      if (cpuTeam.selectedTeam.length >= cpuTeam.maxTeamSize) break;
    }

    console.log(`✅ CPU team selected: ${cpuTeam.getTeamDetails()}`);
  }
  async startBattle() {
    this.addToBattleLog("🔥 Iniciant la batalla...");

    while (
      this.player1.team.selectedTeam.length > 0 &&
      this.player2.team.selectedTeam.length > 0
    ) {
      await this.fightRound(); // Wait for the fight round to complete before continuing
    }

    const winner =
      this.player1.team.selectedTeam.length > 0
        ? this.player1.getName()
        : this.player2.getName();

    this.addToBattleLog(`🏆 La batalla ha acabat! ${winner} és el guanyador!`,'h2');
  }
  addToBattleLog(message,type='p',bold=false) {
    this.battleLog.push({message,type,bold});
    console.log(message);
  }
  getBattleLog(){
    return this.battleLog;
  }
  fightRound() {
    return new Promise((resolve) => {
      const pokemon1 = this.getRandomFighter(this.player1.team);
      const pokemon2 = this.getRandomFighter(this.player2.team);

      if (!pokemon1 || !pokemon2) return resolve();
      this.addToBattleLog(`⚔️ ${pokemon1.name} vs ${pokemon2.name}`);
      setTimeout(() => {
        if (pokemon1.special_power == pokemon2.special_power) {
          this.addToBattleLog(`💥 ${pokemon1.name} i ${pokemon2.name} es derroten mútuament!`,'p',true);
          this.player2.team.removePokemon(pokemon2.name);
          this.player1.team.removePokemon(pokemon1.name);
        }
        else if (pokemon1.special_power > pokemon2.special_power) {
          this.addToBattleLog(`💥 ${pokemon1.name} derrota ${pokemon2.name}!`);
          let damageMade = this.player2.team.removePokemon(pokemon2.name);
          let message = this.player1.team.decreaseSpecialPower(pokemon1.name,damageMade)
          this.addToBattleLog(`${message}`,'p',true);
        } else {
          this.addToBattleLog(`💥 ${pokemon2.name} derrota ${pokemon1.name}!`);
          let damageMade = this.player1.team.removePokemon(pokemon1.name);
          let message=this.player2.team.decreaseSpecialPower(pokemon2.name,damageMade);
          this.addToBattleLog(`${message}`,'p',true);
        }
        resolve(); // Move to the next round
      }, 5000);
    });
  }

  getRandomFighter(team) {
    if (team.selectedTeam.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * team.selectedTeam.length);
// unselect all pokémons, so nobody is fighting.
    team.nobodyFights(); 
// select the next pokemon.
    team.selectedTeam[randomIndex].fights();
    return team.selectedTeam[randomIndex];
  }
  getWhoIsFighting(player){
    switch(player){
      case 'Player1':
        return this.player1.getWhoIsFighting();
      case 'Player2':
        return this.player2.getWhoIsFighting();
    }
    return error.log('Nobody is fighting. There is no fight.');
  }

}