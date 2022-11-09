import { useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { useSaleStore } from '../../hooks/useSaleStore';
import { useAuthStore } from '../../hooks/useAuthStore';

const initialState = { labels: [], datasets: [] };

export const IntroPage = () => {

    const { startLoadingSalesChart } = useSaleStore();
    const { user } = useAuthStore();

    const [ chart, setChart ] = useState( initialState );

    const init = async () => {
        const data = await startLoadingSalesChart();
		if (data) setChart(data);
	};

    useEffect(() => {
        init();
    }, [])
    

    return (
        <Container>
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-sm-12 col-md-4">
                    <div 
                        style={{ width: "100%" }}
                        className="d-flex justify-content-center align-items-center flex-column mt-sm-5"
                    >
                        <h2 className="mb-5 text-center">Bienvenido(a) <b><i>{ user.name }</i></b></h2>
                        <p className="text-center">“Las grandes oportunidades nacen de haber sabido aprovechar las pequeñas”</p>
                        <p className="text-center">“Si decides hacer solo las cosas que sabes que van a funcionar, dejarás un montón de oportunidades encima de la mesa”</p>
                    </div>
                </div>
                <div className="col-sm-12 col-md-8">
                    <div 
                        style={{ width: "100%",  }}
                        className="d-flex justify-content-center align-items-center flex-column mt-5"
                    >
                        {user.userType === 'admin' && <Line data={chart}/> || <img src="https://hci-aws-media.s3-accelerate.amazonaws.com/2020/07/connected-technology.jpg" className="w-75" />}
                    </div>
                </div>
            </div>
        </Container>
    )
}
