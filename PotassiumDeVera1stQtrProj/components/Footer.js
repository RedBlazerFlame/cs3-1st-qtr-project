const Footer = (props) => {
    return {
        componentData: `
        <div class="siteBrand">
            <img class="footerIcon" src="/images/logo1.png" alt="Site Icon" title="Made by Gabee De Vera">
            <p class="title">
                The Climate Post
            </p>
        </div>
        <a class="aboutUsLink" href="/about">About Us</a>
        <div class="accounts">
            <div class="clickableIcon">
                <a title="Email" href="mailto:redblazerflame@gmail.com"> </a>
            </div>
            <div class="clickableIcon">
                <a title="GitHub" href="https://github.com/RedBlazerFlame"> </a>
            </div>
            <div class="clickableIcon">
                <a title="Facebook" href="https://www.facebook.com/eleogen.devera"> </a>
            </div>
        </div>
        <div class="copyright">Copyright &copy; Gabee De Vera</div>
        `,
        callbacks: {},
        state: props,
    };
};
export default Footer;
