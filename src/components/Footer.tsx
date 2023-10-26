const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footerDescription">
          <p>Grégoire Paulay</p>
          <p>56450 - Surzur, France</p>
          <p>gregoirepaulay.pro@gmail.com</p>
          <p>06 23 29 73 02</p>
        </div>
        <div>
          2023 - Grégoire Paulay - Made with
          <a href="https://fr.legacy.reactjs.org/"> React</a>
        </div>

        <div className="footerLink">
          <p> Mes réseaux</p>
          <a href="https://github.com/Gregoire-Paulay">Github</a>
          <a href="https://www.linkedin.com/in/grégoire-paulay-142384285/">
            Linkedin
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
