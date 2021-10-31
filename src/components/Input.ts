import {
    FC,
    rerenderComponent,
    sampleFromArray,
} from "../scripts/component-generation/main.js";

interface CounterProps {
    value: string;
    placeholder?: string;
    initialInputValue?: string;
}

const Counter: FC<CounterProps> = (props: CounterProps) => {
    return {
        componentData: `
        <div>
            <p>value: ${props.value}</p>
            <input data-change="rerender" value="${
                props?.initialInputValue || ""
            }" placeholder="${props?.placeholder || ""}"/>
        </div>
        `,
        callbacks: {
            rerender: ({
                component,
                oldState,
                event,
            }: {
                component: HTMLElement;
                oldState: CounterProps;
                event: InputEvent;
            }) => {
                let newValue = (
                    (event as InputEvent).target as HTMLInputElement
                ).value;

                console.log("rerender");

                if (newValue !== oldState.value) {
                    rerenderComponent<typeof Counter>({
                        component,
                        oldState,
                        newProps: {
                            value: newValue,
                            initialInputValue: newValue,
                        },
                    });
                }
            },
        },
        state: props,
    };
};

export default Counter;
