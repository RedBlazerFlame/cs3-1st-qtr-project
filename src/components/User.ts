import {
    FC,
    rerenderComponent,
    sampleFromArray,
} from "../scripts/component-generation/main.js";

interface UserProps {
    name: string;
    description: string;
    interests?: string[];
}

const User: FC<UserProps> = (props: UserProps) => {
    let { name, description, interests = [] } = props;
    return {
        componentData: `
    <div>
        <h1>${name}</h1>
        <p>${description}</p>
        ${interests.length > 0 ? "<h2>Interests</h2>" : ""}
        <ol>
            ${interests
                .map((interest) => `<li>${interest}</li>`)
                .reduce((acc, cur) => acc + cur, "")}
        </ol>
        <button data-click="onButtonClick">Say Hi!</button>
    </div>
    `,
        callbacks: {
            onButtonClick: ({ component, oldState }) => {
                console.log(`Hi! My name is ${name}`);
                rerenderComponent({
                    component,
                    oldState,
                    newProps: {
                        interests: [
                            ...interests,
                            sampleFromArray({
                                values: [
                                    "Riding Bikes",
                                    "Getting on buses to the other side of the world",
                                    "Commiting Isekai",
                                    "Getting blown up by creepers",
                                ],
                            }),
                        ],
                    },
                });
            },
        },
        state: props,
    };
};

export default User;
