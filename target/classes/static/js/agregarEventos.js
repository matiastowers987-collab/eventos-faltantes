import { cargarEventos } from "./cargarEventos.js";

document.addEventListener("DOMContentLoaded", function () {

    const modal = document.getElementById("modal");
    const btnAgregar = document.getElementById("btnAgregar");
    const cerrarModal = document.getElementById("cerrarModal");
    const guardarEvento = document.getElementById("guardarEvento");

    btnAgregar.addEventListener("click", () => {
        modal.style.display = "flex";
    });

    cerrarModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    guardarEvento.addEventListener("click", () => {

        const nombre = document.getElementById("nombreEvento").value;
        const link = document.getElementById("linkEvento").value;

        if (!nombre || !link) return;

        fetch("/eventos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: nombre,
                foto: link
            })
        })
        .then(response => response.json())
        .then(() => {
            cargarEventos();   // 🔥 reutilizamos la función buena
            modal.style.display = "none";

            document.getElementById("nombreEvento").value = "";
            document.getElementById("linkEvento").value = "";
        })
        .catch(error => console.error("Error:", error));
    });
});