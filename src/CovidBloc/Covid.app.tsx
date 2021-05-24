import {  useState } from 'react';
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line,ResponsiveContainer  } from 'recharts';
import 'antd/dist/antd.css';
import { Button, DatePicker ,Row, Col , Card  ,Space,message,notification  } from 'antd';


const CovidMainBloc = (params: any) => {
    type allDate ={
        total:{
            today_new_confirmed:number ,
            today_new_deaths:number ,
            today_new_recovered:number
        }
    }

    type chart ={
        "name": number | string,
        "Cтатистика по заболевшим": number,
        "Cтатистика по умершим": number,
        "Cтатистика по выздоровевшим": number

    }[]
    const [datas,setDatas] = useState<allDate>()
    const { RangePicker } = DatePicker;
    const [dataNumber, setDataNaber] = useState([])// получение дат из датапикера
    const [dataChart, setDataChart] = useState<chart>();// передача статистики в граффик

    function onChange(date: any, dateString: any) { // получение значения датапикера
        setDataNaber(dateString)
    }
    function inputValue() { // обработка инпута с данными
        console.log(dataNumber[0]) // проверка приходят ли данные
        console.log(dataNumber[1])
        // Уведомления
        const openNotification:any = () => notification.open({ message:'Ожидайте пожалуйста выполняется запрос на сервер'})
        const openNotificationError:any = () => notification.open({message:'ОШИБКА!!!',description:'Проверьте верно ли ввели данные или есть ли соединение с сервером'})
        openNotification()

        const errorCatch:any = () => {
            message.error('Ошибка!')
            openNotificationError()
        }
        // Запрос
        fetch(`https://api.covid19tracking.narrativa.com/api/country/russia?&date_from=${dataNumber[0]}&date_to=${dataNumber[1]}`)
            .then(res => res.json())
            .then(datas => {
                console.log(datas)
                const labels = Object.keys(datas.dates);
                // перебор данных
                setDatas(datas)
                const data = []
                for (let label of labels) {
                    data.push({
                            "name": datas.dates[label].countries['Russia'].date,
                            "Cтатистика по заболевшим": datas.dates[label].countries['Russia'].today_new_confirmed,
                            "Cтатистика по умершим": datas.dates[label].countries['Russia'].today_new_deaths,
                            "Cтатистика по выздоровевшим": datas.dates[label].countries['Russia'].today_new_recovered
                        });
                    }
             data == undefined ? console.log('error'): setDataChart(data)
                message.success('Данные получены');
            }).catch((e) => errorCatch());
    }
    return (
        <>
            <Row>
                <Col span={12} offset={8}>
                    <h1>Статистика по России</h1>
                    <Space direction="vertical" size={12}>
                        <RangePicker  onChange={onChange} /> <Button type="primary"  onClick={inputValue}>Получить статистику</Button>

                    </Space>
                </Col>
            </Row>
            <Row>
                <Col span={5} offset={8}>
                    {datas == undefined ? '' :  <Card title='Статистика по всему миру '  bordered={false} style={{width:400 , marginTop:50 }}>
                        <h1>За период {dataNumber[0]} - {dataNumber[1]}</h1>
                        <p>Cтатистика по заболевшим: {datas !== undefined ? datas.total.today_new_confirmed: ''}</p>
                        <p>Cтатистика по умершим: {datas !== undefined ? datas.total.today_new_deaths: ''}</p>
                        <p>Cтатистика по выздоровевшим: {datas !== undefined ? datas.total.today_new_recovered: ''}</p>
                    </Card>}
                </Col>
            </Row>
            <Row>
                <Col span={12} offset={4} style={{top:20}}>
                    { dataChart == undefined ? '':  <ResponsiveContainer width="100%" height={400}>
                           <LineChart width={500} height={300} data={dataChart} margin={{ top: 100, right: 7, left: 5, bottom: 5 }} style={{backgroundColor:'#ffffff'}}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="Cтатистика по заболевшим" stroke="#8884d8" />
                            <Line type="monotone" dataKey="Cтатистика по умершим" stroke="#fe0015" />
                            <Line type="monotone" dataKey="Cтатистика по выздоровевшим" stroke="#82ca9d" />
                        </LineChart>
                    </ResponsiveContainer>}
                </Col>
            </Row>
        </>
    )
}
export default CovidMainBloc;