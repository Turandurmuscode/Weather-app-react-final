// src/utils.js

// Hava durumu açıklamalarına göre emoji döndüren fonksiyon
export const getEmojiForWeather = (description) => {
  const lower = description.toLowerCase();
  if (lower.includes('açık')) return '☀️';
  if (lower.includes('bulut')) return '☁️';
  if (lower.includes('yağmur') || lower.includes('çiseleyen')) return '🌧️';
  if (lower.includes('kar')) return '❄️';
  if (lower.includes('sis') || lower.includes('pus')) return '🌫️';
  if (lower.includes('fırtına') || lower.includes('gök gürültülü')) return '🌩️';
  if (lower.includes('duman') || lower.includes('kum') || lower.includes('toz') || lower.includes('volkanik kül')) return '💨';
  if (lower.includes('hortum')) return '🌪️';
  return '🌈'; // Varsayılan veya bilinmeyen durumlar için
};

// Unix zaman damgasını yerel saate çeviren fonksiyon
export const convertUnixToTime = (unixTime) => {
  if (!unixTime) return ''; // Undefined veya null gelirse boş döndür
  const date = new Date(unixTime * 1000);
  return date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
};

// dt_txt formatındaki zamanı okunabilir tarihe ve saate çeviren fonksiyon
export const convertDtTxtToDate = (dt_txt) => {
  if (!dt_txt) return ''; // Undefined veya null gelirse boş döndür
  const date = new Date(dt_txt);
  return date.toLocaleDateString('tr-TR', { weekday: 'short', day: 'numeric', month: 'short' }) + ' ' +
         date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
};

// Tahmin listesini gün bazında gruplayan fonksiyon
export const groupForecastByDay = (list) => {
  if (!list) return {}; // Undefined veya null gelirse boş obje döndür
  return list.reduce((acc, item) => {
    const date = item.dt_txt.split(' ')[0];
    if (!acc[date]) acc[date] = [];
    acc[date].push(item);
    return acc;
  }, {});
};

// Günlük ortalamaları hesaplayan fonksiyon
export const getDailyAverages = (forecastList) => {
  if (!forecastList) return [];

  const grouped = groupForecastByDay(forecastList); // utils içindeki fonksiyonu kullanıyoruz
  return Object.entries(grouped).map(([day, items]) => {
    const temps = items.map(i => i.main.temp);
    const avg = temps.reduce((a, b) => a + b, 0) / temps.length;
    return {
      date: new Date(day).toLocaleDateString('tr-TR', { weekday: 'short' }),
      temp: Number(avg.toFixed(1)),
    };
  });
};