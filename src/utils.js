// src/utils.js

// Hava durumu açıklamalarına göre emoji döndüren fonksiyon
export const getEmojiForWeather = (description) => {
  const lower = description.toLowerCase();

  // Açık ve güneşli hava
  if (lower.includes('açık') || lower.includes('açık')) return '☀️';

  // Bulutlu hava çeşitleri
  if (lower.includes('az bulutlu') || lower.includes('az bulutlu')) return '🌤️';
  if (lower.includes('parçalı bulutlu') || lower.includes('parçalı bulutlu')) return '⛅';
  if (lower.includes('kırık bulutlu') || lower.includes('kırık bulutlu')) return '☁️';
  if (lower.includes('kapalı') || lower.includes('kapalı')) return  '☁️'; // Kapalı ve yoğun bulutlu

  // Yağışlı hava çeşitleri
  if (lower.includes('hafif yağmur') || lower.includes('hafif yağmur')) return '🌧️';
  if (lower.includes('orta şiddetli yağmur') || lower.includes('orta şiddetli yağmur')) return '🌧️';
  if (lower.includes('şiddetli yağmur') || lower.includes('şiddetli yağmur')) return '☔';
  if (lower.includes('çok şiddetli yağmur') || lower.includes('çok şiddetli yağış')) return '☔';
  if (lower.includes('aşırı yağmur') || lower.includes('aşırı yağış')) return ' ☔';
  if (lower.includes('çiseleyen yağmur') || lower.includes('çiseleyen yağış')) return '🌦️';
  if (lower.includes('sağanak yağmur') || lower.includes('sağanak yağış')) return '  驟雨'; // Sağanak yağmur için özel
  if (lower.includes('yağmur')) return '🌧️'; // Genel yağmur

  // Kar ve buz
  if (lower.includes('hafif kar') || lower.includes('hafif kar')) return '🌨️';
  if (lower.includes('kar') || lower.includes('kar yağışı')) return '❄️';
  if (lower.includes('yoğun kar') || lower.includes('yoğun kar yağışı')) return ' 🌨️';
  if (lower.includes('dolu') || lower.includes('dolu beklentisi')) return '🧊'; // Dolu veya buzlu kar
  if (lower.includes('buz') || lower.includes('don tehlikesi')) return '🧊';

  // Fırtına çeşitleri
  if (lower.includes('fırtına') || lower.includes('fırtınalı')) return '🌩️';
  if (lower.includes('gök gürültülü') || lower.includes('gök gürültülü yağış')) return '⛈️'; // Yağmurlu fırtına
  if (lower.includes('tayfun') || lower.includes('tayfun riski')) return '🌪️';
  if (lower.includes('kasırga') || lower.includes('kasırga riski')) return '🌀';

  // Atmosferik olaylar
  if (lower.includes('sis') || lower.includes('sisli') || lower.includes('sisli')) return '🌫️';
  if (lower.includes('pus') || lower.includes('puslu')) return '🌫️'; // Puslu
  if (lower.includes('duman') || lower.includes('dumanlı')) return '💨';
  if (lower.includes('kum') || lower.includes('kum fırtınası')) return '🏜️'; // Kum fırtınası gibi
  if (lower.includes('toz') || lower.includes('toz')) return '💨';
  if (lower.includes('volkanik kül') || lower.includes('volkanik kül')) return '🌋';
  if (lower.includes('hortum') || lower.includes('hortum riski')) return '🌪️';
  if (lower.includes('bora') || lower.includes('bora')) return '💨'; // Bora (şiddetli rüzgar)

  // Diğer veya bilinmeyen durumlar
  return '❓'; // Hiçbirine uymazsa varsayılan soru işareti
};

// Unix zaman damgasını yerel saate çeviren fonksiyon
export const convertUnixToTime = (unixTime) => {
  if (!unixTime) return ''; 
  const date = new Date(unixTime * 1000);
  return date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
};


export const convertDtTxtToDate = (dt_txt) => {
  if (!dt_txt) return ''; 
  const date = new Date(dt_txt);
  return date.toLocaleDateString('tr-TR', { weekday: 'short', day: 'numeric', month: 'short' }) + ' ' +
         date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
};


export const groupForecastByDay = (list) => {
  if (!list) return {}; 
  return list.reduce((acc, item) => {
    const date = item.dt_txt.split(' ')[0];
    if (!acc[date]) acc[date] = [];
    acc[date].push(item);
    return acc;
  }, {});
};

export const getDailyAverages = (forecastList) => {
  if (!forecastList) return [];

  const grouped = groupForecastByDay(forecastList); 
  return Object.entries(grouped).map(([day, items]) => {
    const temps = items.map(i => i.main.temp);
    const avg = temps.reduce((a, b) => a + b, 0) / temps.length;
    return {
      date: new Date(day).toLocaleDateString('tr-TR', { weekday: 'short' }),
      temp: Number(avg.toFixed(1)),
    };
  });
};