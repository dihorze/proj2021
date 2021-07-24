interface SettingState {
  showDeck?: boolean;
}

export class SettingStateBuilder {
  static init(): SettingState {
    return {
      showDeck: false,
    }
  }

  static copy(state: SettingState) {
    return {
      showDeck: state.showDeck
    }
  }

  static toggleShowDeck(state: SettingState) {
    const newState = SettingStateBuilder.copy(state);
    newState.showDeck = !newState.showDeck;
    return newState;
  }
}