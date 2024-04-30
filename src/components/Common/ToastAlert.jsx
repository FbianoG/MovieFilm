import './ToastAlert.css'

export default function ToastAlert(props) {

    let toastBg
    let title
    if (props.type === 'success') {
        toastBg = { background: '#34733f' }
        title = 'Sucesso na requisição.'
    }
    else if (props.type === 'error') {
        toastBg = { background: '#c53030' }
        title = 'Ocorreu algum erro.'
    }
    else if (props.type === 'alert') {
        toastBg = { background: '#416bc9' }
        title = 'Alerta de informação!'
    }

    return (
        <div className='toastAlert' style={toastBg}>
            <i className='fa-solid fa-circle-exclamation toastAlert-icon'></i>
            <div className='toastAlert-data'>
                <h3 className='toastAlert-title'>{title}</h3>
                <span className='toastAlert-text'>{props.text}</span>
            </div>
        </div >
    )

    // Alerta de informação!
}