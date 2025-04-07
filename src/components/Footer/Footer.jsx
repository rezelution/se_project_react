import "../Footer/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__captions">Developed by Alex Reznik</p>
      <p className="footer__captions">{new Date().getFullYear()}</p>
    </footer>
  );
}

export default Footer;
