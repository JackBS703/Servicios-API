// test-rendimiento-api.js
const LOCAL_API_URL = "http://localhost:3000/api/empleados";

async function testExternalPerformance() {
  const start = Date.now();
  console.log("--- API EXTERNA (DummyJSON) ---");
  console.log("Iniciando prueba de carga masiva...");

  try {
    const response = await fetch("https://dummyjson.com/users?limit=100");
    const data = await response.json();
    const duration = Date.now() - start;
    console.log(`- Tiempo de respuesta: ${duration} ms`);
    console.log(`- Usuarios recibidos: ${data.users?.length || data.length}\n`);
    return duration;
  } catch (error) {
    console.error("- Error en API Externa:", error.message);
    return null;
  }
}

async function testExternalConcurrent(count = 100) {
  const start = Date.now();
  console.log(`Iniciando prueba concurrente (${count} peticiones simultáneas)...`);

  try {
    const requests = Array.from({ length: count }, (_, i) =>
      fetch(`https://dummyjson.com/users/${(i % 100) + 1}`).then(res => res.json())
    );
    await Promise.all(requests);
    const duration = Date.now() - start;
    console.log(`- Tiempo total para ${count} peticiones: ${duration} ms\n`);
    return duration;
  } catch (error) {
    console.error("- Error en prueba concurrente externa:", error.message);
    return null;
  }
}

async function testLocalPerformance() {
  const start = Date.now();
  console.log("--- API LOCAL (Tu Servidor) ---");
  console.log("Iniciando prueba de carga masiva...");

  try {
    const response = await fetch(LOCAL_API_URL);
    const data = await response.json();
    const duration = Date.now() - start;
    console.log(`- Tiempo de respuesta: ${duration} ms`);
    console.log(`- Empleados recibidos: ${data.length}\n`);
    return duration;
  } catch (error) {
    console.error("- Error en API Local:", error.message);
    return null;
  }
}

async function testLocalConcurrent(count = 100) {
  const start = Date.now();
  console.log(`Iniciando prueba concurrente (${count} peticiones simultáneas)...`);

  try {
    const requests = Array.from({ length: count }, () =>
      fetch(LOCAL_API_URL).then(res => res.json())
    );
    await Promise.all(requests);
    const duration = Date.now() - start;
    console.log(`- Tiempo total para ${count} peticiones: ${duration} ms\n`);
    return duration;
  } catch (error) {
    console.error("- Error en prueba concurrente local:", error.message);
    return null;
  }
}

async function runTests() {
  const extMassive = await testExternalPerformance();
  const extConcurrent = await testExternalConcurrent(100);

  const locMassive = await testLocalPerformance();
  const locConcurrent = await testLocalConcurrent(100);

  console.log("=======================================");
  console.log("      RESUMEN DE COMPARACIÓN           ");
  console.log("=======================================");
  console.log(`PRUEBA          | EXTERNA (ms) | LOCAL (ms)`);
  console.log(`----------------|--------------|-----------`);
  console.log(`Carga Masiva    | ${extMassive || 'FAIL'}          | ${locMassive || 'FAIL'}`);
  console.log(`100 Concurrentes| ${extConcurrent || 'FAIL'}          | ${locConcurrent || 'FAIL'}`);
  console.log("=======================================");
}

runTests();
