import {Alert} from 'react-bootstrap';
import React from 'react'


// const Message = ({children}) =>{
//     return(<><Message>
//             <Alert key='danger' variant='danger'>
//                 {children}
//             </Alert>
//         </Message>
//         </>
//     )
// };

const Message = ({ variant, children }) => {
    return <Alert variant={variant}>{children}</Alert>
};

Message.defaultProps = {
    variant: 'info',

};

export default Message