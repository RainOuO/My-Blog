import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export const handleHtmlCard = (Component, itemData, isValid) => {
  const htmlCard = withReactContent(Swal);
  htmlCard
    .fire({
      html: (
        <Component
          data={itemData}
          isCancel={htmlCard.clickCancel}
          isValid={isValid}
        />
      ),
      showConfirmButton: false,
    })
    .then((result) => {});
};
