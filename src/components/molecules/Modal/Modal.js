import React, { 
  useState, 
  useEffect 
} from 'react';

const Modal = props => {
  const [modalState, setModalState] = useState('hidden');

  const closeModal = (event) => {
    if (props.onModalCloseFn) {
      props.onModalCloseFn();
    }

    setModalState('hidden');
  }

  useEffect(() => {
    setModalState(props.modalState);
  }, [modalState]);

  return (
    <div
      id="dialog" 
      className={ modal } 
      role="dialog"
      aria-labelledby="dialog-title"
      aria-describedby=""
      aria-modal="true"
      aria-hidden={ !!modalState === 'hidden' }
      tab-index="-1">
      <div 
        className={ modal__container }
        role="document">
        <div className={ modal__header }>
          <h2 id="dialog-title">{ props.modalTitle }</h2>
          <Button
            btnType="button__transparent"
            arial-label="Close"
            data-dismiss="dialog"
            title="Close this dialog window"
            clicked={ closeModal }> 
            <svg 
              version="1.1" 
              xmlns="http://www.w3.org/2000/svg" 
              xmlnsXlink="http://www.w3.org/1999/xlink" 
              x="0px" 
              y="0px" width="20px" height="20px" viewBox="0 0 50 50" 
              enableBackground="new 0 0 50 50" xmlSpace="preserve">
              <path d="M25,0C11.2,0,0,11.2,0,25s11.2,25,25,25s25-11.2,25-25S38.8,0,25,0z M25,45.2c-11.1,0-20.2-9-20.2-20.2S13.9,4.8,25,4.8s20.2,9,20.2,20.2S36.1,45.2,25,45.2z M35.3,18.7L29,25l6.3,6.3c0.5,0.5,0.5,1.2,0,1.7L33,35.3c-0.5,0.5-1.2,0.5-1.7,0L25,29l-6.3,6.3c-0.5,0.5-1.2,0.5-1.7,0L14.7,33c-0.5-0.5-0.5-1.2,0-1.7L21,25l-6.3-6.3c-0.5-0.5-0.5-1.2,0-1.7l2.3-2.3c0.5-0.5,1.2-0.5,1.7,0L25,21l6.3-6.3c0.5-0.5,1.2-0.5,1.7,0l2.3,2.3C35.7,17.5,35.7,18.3,35.3,18.7L35.3,18.7z"></path>
            </svg>
          </Button>  
        </div>
        { props.content ? 
        <div className={ modal__content }>
          { props.content }
        </div>
        : '' }
        { props.footer ? 
          <div className={ modal__footer }>
            { props.footer }
          </div>
        : '' }
      </div>
    </div>
  );
}

export default Modal;