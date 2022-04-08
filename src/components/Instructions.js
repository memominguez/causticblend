import React from 'react'

import Modal from '../modal/Modal';

const Instructions = ({onClose}) => {
    return (
        <Modal>
        <div className="instructions">
            <h2>Welcome to this online tool dealing with NaOH aqueous solutions</h2>
            <p><strong>Purpose:&nbsp;</strong>Solve for the relationship among NaOH (caustic soda) solutions' 
                properties: &nbsp;&nbsp;Concentration, Specific gravity, and °Baumé gravity.<br/>
                Concentration is worked as weight% NaOH.</p>
            <p><strong>Content:&nbsp;</strong>Below you will find FIVE modules.<br/>
                In the first three modules, just input one of the properties, and the module will solve for the rest</p>
            <ol>
                <li>
                    <strong>Input Specific Gravity.</strong>&nbsp;&nbsp;To get weight% and °Baumé gravity.
                </li>
                <li>
                    <strong>Input °Baumé Gravity.</strong>&nbsp;&nbsp;To get weight% and specific gravity.
                </li>
                <li>
                    <strong>Input weight%.</strong>&nbsp;&nbsp;To get specific gravity and °Baumé gravity.
                </li>
            </ol>

            <p>In modules 4 and 5, you can blend two aqueous solutions (one of them could be pure water), 
                    and obtain the resulting solution C with its properties.
            </p>

            <ol start="4">                            
                <li>
                    <strong>Input solutions A and B information</strong>&nbsp;&nbsp;for solving solution C,
                        on <strong>volume basis</strong>.
                </li>
                <li>
                    <strong>Input solutions A and B information</strong>&nbsp;&nbsp;for solving solution C,
                        on <strong>weight basis</strong>.
                </li>
            </ol>
           
            <p>Note that the user may work with any arbitrary units of volume or weight.&nbsp;
                Just make sure you work with consistent quantity units, i.e. 
                liters, gallons, pounds, kilograms, etc.</p>
            <br/>

            <div className='close-modal'>
            <button onClick={onClose}>Return to website</button>
            </div>
        </div>
        </Modal>
    )
}

export default Instructions
