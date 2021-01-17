import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import './not-found.css';

const NotFound = (props) => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section className="not_found_page">

        <p id="not_found_page_p">
          Ничего не найдено, пожалуйста попробуйте еще раз
          или
        </p>
        <Link id="not_found_page_link" to="/"><button id="not_found_page_button">Перейдите на главную</button></Link>

      </section>
    </>
  )
}

export default NotFound;