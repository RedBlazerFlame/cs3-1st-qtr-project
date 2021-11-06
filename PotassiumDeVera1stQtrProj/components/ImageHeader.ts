import { FC } from "../scripts/component-generation/main.js";

interface ImageHeaderProps {
    image: {
        src: string;
        alt: string | null;
        title: string | null;
    };
    showTitle: boolean;
}

const ImageHeader: FC<ImageHeaderProps> = (props: ImageHeaderProps) => {
    return {
        componentData: `
        <!-- Note: I decided not to use CSS background-image so that I can manipulate the image using JavaScript (simply by changing the src attribute in the JavaScript code) -->
        <div class="backgroundImage">
            <img
                src="${props.image.src}"
                ${
                    typeof props.image.alt === "string"
                        ? `alt=${props.image.alt}`
                        : ""
                }
                ${
                    typeof props.image.title === "string"
                        ? `title=${props.image.title}`
                        : ""
                }
            />
        </div>
        <div class="headerContent">
            ${
                props.showTitle
                    ? `<div class="headerText">
            <h1 class="title">
                The <span class="secondaryColor">Climate</span> Post
            </h1>
            <p class="description">
                Your Online Resource for
                <span class="secondaryColor">Climate Change</span>
            </p>
        </div>`
                    : ""
            }
        </div>
        `,
        callbacks: {},
        state: props,
    };
};

export default ImageHeader;
