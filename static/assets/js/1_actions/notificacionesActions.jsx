import {NOTIFICATION_TYPE_SUCCESS, NOTIFICATION_TYPE_ERROR} from 'react-redux-notify';
import {createNotification} from 'react-redux-notify';
export function notificarAction(mensaje, tipo = 'success', tiempo=5000) {
    return function (dispatch) {
        let tipo_notificacion = NOTIFICATION_TYPE_SUCCESS;
        switch (tipo) {
            case 'success':
                tipo_notificacion = NOTIFICATION_TYPE_SUCCESS;
                break;
            case 'error':
                tipo_notificacion = NOTIFICATION_TYPE_ERROR;
                break;
        }
        const mySuccessNotification = {
            message: mensaje,
            type: tipo_notificacion,
            duration: tiempo,
            position: 'BottomRight',
            canDimiss: true,
            //icon: <i className="fa fa-check"/>
        };
        dispatch(createNotification(mySuccessNotification));
    }
}