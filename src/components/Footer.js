import mypic from "../images/gedonduty.jpg";

const Footer = () => {
  return (
    <footer>
      <div>
        <p>
          Source:{" "}
          <a
            href="https://www.oxy.com/ourbusinesses/chemicals/products/documents/causticsoda/caustic.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Caustic soda handbook
          </a>
          &nbsp;page 28
        </p>
      </div>

      <div>
        <p>
          Author: G. E. Dominguez &nbsp;tecnocomquimica@gmail.com&nbsp;&nbsp;
        </p>
      </div>

      <div>
        <img src={mypic} alt="Guillermo" />
      </div>
    </footer>
  );
};

export default Footer;
