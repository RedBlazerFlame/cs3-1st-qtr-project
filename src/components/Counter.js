import { rerenderComponent, } from "../scripts/component-generation/main.js";
const Counter = (props) => {
    return {
        componentData: `
        <div>
            <p>Count: ${props.count}</p>
            <button data-click="decrement">Decrement</button><button data-click="increment">Increment</button>
        </div>
        `,
        callbacks: {
            decrement: ({ component, oldState }) => {
                rerenderComponent({
                    component,
                    oldState,
                    newProps: {
                        count: props.count - 1,
                    },
                });
            },
            increment: ({ component, oldState }) => {
                rerenderComponent({
                    component,
                    oldState,
                    newProps: {
                        count: props.count + 1,
                    },
                });
            },
        },
        state: props,
    };
};
export default Counter;
