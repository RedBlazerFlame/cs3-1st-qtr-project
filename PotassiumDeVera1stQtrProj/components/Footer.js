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
        <div class="copyright">Copyright &copy; Gabee De Vera</div>
        `,
        callbacks: {},
        state: props,
    };
};
export default Footer;
