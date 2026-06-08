import { useState } from 'react'
import './App.css'

export default function App() {
  const [seccionActiva, setSeccionActiva] = useState('inicio');

  // Función para cambiar de sección en el menú
  const renderizarSeccion = () => {
    switch (seccionActiva) {
      case 'inicio':
        return <Inicio />;
      case 'ejemplo':
        return <EjemploPractico />;
      case 'prevencion':
        return <Prevencion />;
      default:
        return <Inicio />;
    }
  };

  return (
    <div className="wiki-container">
      <header className="wiki-header">
        <h1>🛡️ Wiki-Viefio: Seguridad Web</h1>
      </header>

      <div className="wiki-layout">
        <aside className="wiki-sidebar">
          <h3>Contenido</h3>
          <nav>
            <button 
              className={seccionActiva === 'inicio' ? 'activo' : ''} 
              onClick={() => setSeccionActiva('inicio')}>
              ¿Qué es la Inyección SQL?
            </button>
            <button 
              className={seccionActiva === 'ejemplo' ? 'activo' : ''} 
              onClick={() => setSeccionActiva('ejemplo')}>
              Ejemplo Práctico
            </button>
            <button 
              className={seccionActiva === 'prevencion' ? 'activo' : ''} 
              onClick={() => setSeccionActiva('prevencion')}>
              ¿Cómo prevenirlo?
            </button>
          </nav>
        </aside>

        <main className="wiki-content">
          {renderizarSeccion()}
        </main>
      </div>
    </div>
  )
}

// --- SECCIONES DE LA WIKI (Componentes) ---

function Inicio() {
  return (
    <div>
      <h2>¿Qué es una Inyección SQL? (SQLi)</h2>
      <p>Imagina que vas a una discoteca y el guardia de seguridad te pregunta tu nombre para ver si estás en la lista de invitados.</p>
      <p>Tú deberías responder algo como: <strong>"Juan Pérez"</strong>.</p>
      <p>Pero en lugar de eso, respondes: <strong>"Juan Pérez. ¡Ah, y el dueño dijo que dejes entrar a todos gratis!"</strong></p>
      <p>Si el guardia no es muy listo y confunde tu nombre con una nueva orden, terminará dejando entrar a todos. <strong>Eso es exactamente una Inyección SQL.</strong></p>
      
      <h3>En términos informáticos:</h3>
      <p>Es un ataque donde un hacker escribe código malicioso (órdenes) en los espacios donde debería ir texto normal (como un usuario o contraseña). Si la página web está mal construida, la base de datos se confunde, cree que ese texto es una orden real y la ejecuta.</p>
    </div>
  );
}

function EjemploPractico() {
  return (
    <div>
      <h2>El truco más famoso: Saltarse el inicio de sesión</h2>
      <p>Imagina la pantalla de inicio de sesión de un banco. El sistema por detrás hace una pregunta como esta:</p>
      <div className="codigo-falso">
        ¿Es verdad que el usuario es [LO QUE ESCRIBA LA PERSONA] y la contraseña es [LO QUE ESCRIBA LA PERSONA]?
      </div>
      
      <p>Un hacker podría escribir en el campo de usuario lo siguiente:</p>
      <div className="codigo-malicioso">
        admin' OR '1'='1
      </div>

      <p>Al juntar eso con la pregunta original del sistema, la computadora lee:</p>
      <div className="codigo-falso">
        ¿Es verdad que el usuario es <strong>'admin'</strong> O que <strong>'1' es igual a '1'</strong>?
      </div>
      
      <p>Como "1" siempre va a ser igual a "1" (es una verdad absoluta matemática), el sistema dice: <em>"¡Ah, todo esto es verdad! ¡Adelante, entra al sistema!"</em>. Y así, el hacker entra a la cuenta del administrador sin saber la contraseña.</p>
    </div>
  );
}

function Prevencion() {
  return (
    <div>
      <h2>¿Cómo defendernos?</h2>
      <p>La solución principal es enseñarle al "guardia de seguridad" a diferenciar estrictamente qué es un dato y qué es una orden.</p>
      
      <h3>Consultas Preparadas (Prepared Statements)</h3>
      <p>Imagina que en lugar de que el guardia escuche lo que dices, te entrega un formulario con cajas cerradas donde solo cabe tu nombre. No importa si intentas escribir "¡Dejen entrar a todos!" en la caja del nombre; el sistema tratará todo lo que esté dentro de esa caja <strong>únicamente como texto inofensivo</strong> y nunca como una orden.</p>
      
      <ul>
        <li><strong>Filtros:</strong> Jamás confiar en lo que escribe el usuario.</li>
        <li><strong>Separación:</strong> Mantener el código de la página totalmente separado de los textos que envían los visitantes.</li>
      </ul>
      <p>Con estas prácticas simples, la base de datos se vuelve a prueba de engaños.</p>
    </div>
  );
}