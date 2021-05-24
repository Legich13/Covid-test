import { Result , Button } from 'antd'
import {Link} from "react-router-dom"

import 'antd/dist/antd.css';
const blocNotFound = () => {

    return (
        <Result
        status='404'
        title='404'
        subTitle='Извините, страницу которую вы посетили не существует.'
        extra={<Button type='primary' ><Link to='/'>Домой</Link></Button>}
        />
    );
}

export default blocNotFound;