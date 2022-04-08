import { Fragment } from 'react';
import ReactDOM from 'react-dom'

import classes from './Modal.module.css';

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onClose} />
}

const ModalOverlay = (props) => {
    return (
    <div className={classes.modal}>
        <div>{props.children}</div>
    </div>
    );
};

const portalElement = document.getElementById('overlays');

//var ReactDOM = require('react-dom')  // Mi invento

const Modal = (props) => {
    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </Fragment>
    );
};

export default Modal
