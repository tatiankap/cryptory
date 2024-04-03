import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useUserCrypto } from '../../hooks/useUserCrypto';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function UserAssetsChart() {
  const { assets } = useUserCrypto();
  const data = {
    labels: assets.map((a) => a.id),
    datasets: [
      {
        label: '$',
        data: assets.map((a) => a.price * a.amount),
        backgroundColor: [
          'rgba(255, 99, 132, 1',
          'rgba(54, 162, 235, 1',
          'rgba(255, 206, 86, 1',
          'rgba(75, 192, 192, 1',
          'rgba(153, 102, 255, 1',
          'rgba(255, 159, 64, 1'
        ]
      }
    ]
  };
  return (
    <div
      style={{
        display: 'flex',
        marginBottom: '1rem',
        justifyContent: 'center',
        height: 400
      }}
    >
      <Pie data={data} style={{ color: '#fff' }} />
    </div>
  );
}
