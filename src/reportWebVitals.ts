import { ReportHandler } from 'web-vitals';
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  // Verificar si la función de devolución de llamada es válida
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    // Importar las funciones de métricas de rendimiento desde web-vitals
    getCLS(onPerfEntry);
    getFID(onPerfEntry);
    getFCP(onPerfEntry);
    getLCP(onPerfEntry);
    getTTFB(onPerfEntry);
  }
};

export default reportWebVitals;

