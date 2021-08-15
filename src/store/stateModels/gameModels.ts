interface GameState {
  showCardSelectionPage?: boolean;
}

export class GameStateBuilder {
  static init(): GameState {
    return {
      showCardSelectionPage: false,
    }
  }

  static copy(state: GameState) {
    return {
      showCardSelectionPage: state.showCardSelectionPage
    }
  }

  static toggleCardSelectionPage(state: GameState) {
    const newState = GameStateBuilder.copy(state);
    newState.showCardSelectionPage = !newState.showCardSelectionPage;
    return newState;
  }
}