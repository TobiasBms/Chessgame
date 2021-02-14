class Store {

    protected state: ClientState;

    constructor(state: ClientState) {
        this.state = state

    }

    getState(){
        return this.state;
    }

    select(key: string){
        return this.state[key]
    }
}