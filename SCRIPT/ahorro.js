document.addEventListener('DOMContentLoaded' , () => {

})

const app = document.getElementById(`app`);
const navbuttons = document.querySelectorAll(`.navBtn`);
let botonSaldo = document.getElementById(`Inicio`);
botonSaldo.addEventListener(`click`, renderHome);

let user = {
    nombre: "usuario",
    monto: 0,
    transacciones: []      
}

function renderHome() {
    app.innerHTML = `
    <h2>Bienvenido, ${user.nombre}</h2>
    <p>Presupuesto disponible: ${user.monto}</p>
    `;
}
function renderAddTransaction() {
    app.innerHTML = `
    <h2>Añadir transaccion </h2>
    <form id="transaction-form">
        <input type="text" id="descripcion" placeholder="Descripcion"  required>
        <input type="number" id="cantidad" placeholder="monto" required>
        <select id="type" required>
             <option value="ingreso">ingreso</option> 
             <option value="egreso">Egreso</option> 
        </select>
        <button type="submit">Añadir</button>
    </form>
    `;
document.getElementById(`transaction-form`).addEventListener(`submit`, addTransaccion);
}
function addTransaccion(event) {
    event.preventDefault()
    const descripcion = document.getElementById(`descripcion`).value
    const monto = parseInt(document.getElementById(`cantidad`).value) 
    const type = document.getElementById(`type`).value
    
    if (type === "ingreso") {
        user.monto += monto
    } else { 
        if (user.monto - monto < 0){
            alert(`fondos insuficientes`)
            return;
        }else {
            user.monto -= monto;
        }
    }

    alert(`tranasaccion fue anadida correctamente`)
    user.transacciones.push({descripcion, monto, type})
    renderHome()
}

function renderTransactions() {
    const transactionRows = user.transacciones.map((t, i) => `
    <tr>
         <td>${i + 1}</td>
         <td>${t.descripcion}</td>
         <td>${t.type === `ingreso` ? `+` : `-`}${t.monto}</td></tr>
    `).join(``)
    app.innerHTML = `
        <h2>Lista de transacciones</h2>
        <table>
             <thead>
                <tr>
                    <th>#</th>
                    <th>Descripcion</th>
                    <th>Monto</th>
                </tr>
            </thead>
            <tbody>
            ${transactionRows || `<tr><td colspan="3" >  No hay transacciones registradas.</td></tr>`} 
            </tbody>
        </table>
    `;
} 
function renderSettings() {
    app.innerHTML = `
    <h2>Configuracion</h2>
    <form id="settingsform">
         <input type="text" id="name" placeholder="Nombre del usuario" value= "${user.nombre}" required>
         <input type="number" id="monto" placeholder="Presupuesto inicial" value= "${user.monto}" required>
         <button type="submit">Guardar</button>
    </form>
    `
    document.getElementById(`settingsform`).addEventListener(`submit`, updateSettings)
}

function updateSettings(event) {
    event.preventDefault();
    const nombre = document.getElementById(`name`).value
    const monto = parseFloat(document.getElementById(`monto`).value);

    user.nombre = nombre
    user.monto = monto

    alert("configuracion actualizada")
    renderHome()
}

navbuttons.forEach(btn => {
    btn.addEventListener(`click`, (event) =>{
        const view = event.target.dataset.view;
        if (view === "inicio") renderHome();
        if (view === "añadirTransaccion")renderAddTransaction();
        if (view === "Transacciones") renderTransactions();
        if (view === "Configuracion" ) renderSettings();
        console.log(view);
        
    })
}) 
  
renderHome()



