import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export const handleSuccess = (title, redirect, html) => {
  const loginCard = withReactContent(Swal);
  loginCard
    .fire({
      position: 'center-center',
      icon: 'success',
      title: title ? title : false,
      html: html ? html : false,
      showConfirmButton: redirect ? true : false,
      timer: redirect ? false : 1500,
    })
    .then((data) => {
      if (redirect) {
        return (window.location = redirect);
      }
    });
};

export const handleFailed = (title, redirect, html) => {
  const loginCard = withReactContent(Swal);
  loginCard
    .fire({
      position: 'center-center',
      icon: 'error',
      title: title,
      html: html ? html : false,
      showConfirmButton: redirect ? true : false,
      timer: redirect ? false : 1500,
    })
    .then((data) => {
      if (redirect) {
        return (window.location = redirect);
      }
    });
};

export const handleWarning = (title, redirect, html) => {
  const loginCard = withReactContent(Swal);
  loginCard
    .fire({
      position: 'center-center',
      icon: 'warning',
      title: title,
      html: html ? html : false,
      showConfirmButton: redirect ? true : false,
      timer: redirect ? false : 1500,
    })
    .then((data) => {
      if (redirect) {
        return (window.location = redirect);
      }
    });
};

export const handleInfo = (title, redirect, html) => {
  const loginCard = withReactContent(Swal);
  loginCard
    .fire({
      position: 'center-center',
      icon: 'info',
      title: title,
      html: html ? html : false,
      showConfirmButton: redirect ? true : false,
      timer: redirect ? false : 1500,
    })
    .then((data) => {
      if (redirect) {
        return (window.location = redirect);
      }
    });
};

export const handleWarningComfirm = (title, action, html) => {
  const loginCard = withReactContent(Swal);
  loginCard
    .fire({
      position: 'center-center',
      icon: 'warning',
      title: title,
      html: html ? html : false,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: '確認',
      cancelButtonText: '取消',
      timer: false,
    })
    .then((data) => {
      if (data.isConfirmed) {
        return action();
      }
    });
};
export const handleSucccessComfirm = (title, action, html) => {
  const loginCard = withReactContent(Swal);
  loginCard
    .fire({
      position: 'center-center',
      icon: 'success',
      title: title,
      html: html ? html : false,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: '確認',
      cancelButtonText: '取消',
      timer: false,
    })
    .then((data) => {
      if (data.isConfirmed) {
        return action();
      }
    });
};

export const handleInfoComfirm = (title, action, html) => {
  const loginCard = withReactContent(Swal);
  loginCard
    .fire({
      position: 'center-center',
      icon: 'info',
      title: title,
      html: html ? html : false,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: '確認',
      cancelButtonText: '取消',
      timer: false,
    })
    .then((data) => {
      if (data.isConfirmed) {
        return action();
      }
    });
};
