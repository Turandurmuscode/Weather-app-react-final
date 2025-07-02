// src/components/ChartComponent.js
import React, { useState, useEffect } from 'react'; // <-- useState ve useEffect ekledik
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import '../app.css';
import { getDailyAverages } from '../utils';

const ChartComponent = ({ forecast }) => {
  const [chartReady, setChartReady] = useState(false); // <-- Yeni state

  useEffect(() => {
    // Küçük bir gecikme ekleyerek, DOM'un tamamen yerleştiğinden emin olmaya çalışıyoruz
    // Bu, ResponsiveContainer'ın bazen yaşadığı ilk render boyutlandırma sorunlarını çözebilir.
    const timer = setTimeout(() => {
      setChartReady(true);
    }, 100); // 100ms gecikme

    return () => clearTimeout(timer); // Bileşen unmount olduğunda timer'ı temizle
  }, []);

  if (!forecast) {
    return null; // forecast verisi yoksa grafik gösterme
  }

  const data = getDailyAverages(forecast.list);

  if (!data || data.length === 0) {
    return (
      <div className="chart-container">
        <h3>Günlük Ortalama Sıcaklık Grafiği</h3>
        <p>Grafik verisi mevcut değil.</p>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <h3>Günlük Ortalama Sıcaklık Grafiği</h3>
      {chartReady ? ( // <-- chartReady true olduğunda render et
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis unit="°C" />
            <Tooltip />
            <Line type="monotone" dataKey="temp" stroke="#2980b9" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div style={{ width: '100%', height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#666' }}>
            Grafik yükleniyor...
        </div>
      )}
    </div>
  );
};

export default ChartComponent;