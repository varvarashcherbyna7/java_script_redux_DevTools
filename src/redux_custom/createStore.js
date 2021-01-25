export function createStore(rootReducer, initialState) {
    let state = rootReducer(initialState, { type: '_INIT_'})
    const subscribers = []

    return {
        //action === {type: 'INCREMENT'}
        dispatch(action) {
            state = rootReducer(state, action)
            subscribers.forEach( sub => sub())
        },
        subscribe(callback) {
            subscribers.push(callback)
        },
        getState() {
            return state
        },
    }
}
