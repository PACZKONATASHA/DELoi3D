import { useMemo, useRef, useState, useCallback, useEffect } from 'react';
import { RotateCw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './Viewer360.css';

// Visor de giro 360: en vez de mandar el modelo 3D al navegador, muestra una
// vuelta completa de la pieza como fotos numeradas (01.jpg, 02.jpg, ...) y
// cambia de foto segun cuanto arrastra el usuario. La geometria nunca sale de
// la maquina del cliente, asi que el STL no se puede descargar ni reconstruir.

function framesDe(base, cantidad, ext) {
  return Array.from(
    { length: cantidad },
    (_, i) => `${base}${String(i + 1).padStart(2, '0')}.${ext}`,
  );
}

export default function Viewer360({ base, cantidad = 36, ext = 'jpg', alt }) {
  const { t } = useLanguage();
  const frames = useMemo(() => framesDe(base, cantidad, ext), [base, cantidad, ext]);

  const [cargados, setCargados] = useState(0);
  const [frame, setFrame] = useState(0);
  const [tocado, setTocado] = useState(false);
  const arrastre = useRef(null);

  const cargando = cargados < cantidad;
  const progreso = Math.round((cargados / cantidad) * 100);

  // La precarga se hace con Image() y no con onLoad en el JSX: si la foto ya
  // estaba en cache, React engancha el onLoad despues de que cargo y el evento
  // no llega nunca, dejando la barra clavada.
  // El contador no se resetea aca: quien usa el visor le pasa un `key` por
  // producto, asi cambiar de ficha lo remonta con el contador limpio.
  useEffect(() => {
    let vivo = true;
    const sumar = () => { if (vivo) setCargados(n => Math.min(n + 1, cantidad)); };
    for (const src of frames) {
      const img = new Image();
      img.onload = sumar;
      img.onerror = sumar; // un frame que falta no debe trabar el visor
      img.src = src;
    }
    return () => { vivo = false; };
  }, [frames, cantidad]);

  // Una vuelta sola de presentacion, hasta que el usuario toma el control.
  useEffect(() => {
    if (cargando || tocado) return;
    let pasos = 0;
    const id = setInterval(() => {
      setFrame(f => (f + 1) % cantidad);
      if (++pasos >= cantidad) clearInterval(id);
    }, 80);
    return () => clearInterval(id);
  }, [cargando, tocado, cantidad]);

  const girar = useCallback((saltos) => {
    setFrame(f => (((f - saltos) % cantidad) + cantidad) % cantidad);
  }, [cantidad]);

  const alBajar = (e) => {
    setTocado(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    arrastre.current = { x: e.clientX, ancho: e.currentTarget.clientWidth || 400 };
  };

  const alMover = (e) => {
    const a = arrastre.current;
    if (!a) return;
    // Arrastrar todo el ancho del visor equivale a una vuelta entera.
    const paso = a.ancho / cantidad;
    const saltos = Math.trunc((e.clientX - a.x) / paso);
    if (!saltos) return;
    girar(saltos);
    a.x += saltos * paso;
  };

  const alSoltar = () => { arrastre.current = null; };

  const alTeclear = (e) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    setTocado(true);
    girar(e.key === 'ArrowRight' ? 1 : -1);
  };

  return (
    <div className="v360">
      <div
        className="v360__stage"
        role="img"
        aria-label={alt}
        tabIndex={0}
        onPointerDown={alBajar}
        onPointerMove={alMover}
        onPointerUp={alSoltar}
        onPointerCancel={alSoltar}
        onKeyDown={alTeclear}
      >
        {frames.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden="true"
            draggable={false}
            decoding="async"
            className={`v360__frame${i === frame ? ' is-on' : ''}`}
          />
        ))}

        {cargando && (
          <div className="v360__loading">
            <div className="v360__bar"><span style={{ width: `${progreso}%` }} /></div>
            <p>{t('cargando360')}</p>
          </div>
        )}
      </div>

      <p className="v360__hint">
        <RotateCw size={14} /> {t('arrastraGirar')}
      </p>
    </div>
  );
}
