import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copyright">Developed By Dylan Shangold</p>
        <p className="footer__year">{currentYear}</p>
      </div>
    </footer>
  );
}

export default Footer;
