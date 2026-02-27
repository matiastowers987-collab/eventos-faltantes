document.addEventListener("DOMContentLoaded", function () {

    const input = document.getElementById("buscador");

    input.addEventListener("input", function() {
        const texto = input.value.toLowerCase();
        const cards = document.querySelectorAll(".card");

        cards.forEach(card => {
            const titulo = card.querySelector("h3").textContent.toLowerCase();
            card.style.display = titulo.includes(texto) ? "" : "none";
        });
    });

    cargarEventos();
});

export function cargarEventos() {
    fetch("/https://eventos-faltantes.onrender.com")
        .then(response => response.json())
        .then(data => {
            const contenedor = document.getElementById("contenedor-eventos");
            contenedor.innerHTML = "";

            const modalConfirmar = document.getElementById("modal-confirmar");
            const btnConfirmar = document.getElementById("confirmar-eliminar");
            const btnCancelar = document.getElementById("cancelar-eliminar");

            data.forEach(evento => {
                const card = document.createElement("div");
                card.classList.add("card");

                card.innerHTML = `
                    <img src="${evento.foto}" alt="${evento.nombre}">
                    <h3>${evento.nombre}</h3>
                    <span class="btn-eliminar" data-id="${evento.id}">✖</span>
                `;

                card.querySelector('.btn-eliminar').addEventListener('click', () => {
                    modalConfirmar.style.display = 'flex';

                    btnConfirmar.onclick = () => {
                        fetch(`/eventos/${evento.id}`, { method: 'DELETE' })
                            .then(() => {
                                modalConfirmar.style.display = 'none';
                                cargarEventos();
                            });
                    };

                    btnCancelar.onclick = () => {
                        modalConfirmar.style.display = 'none';
                    };
                });

                contenedor.appendChild(card);
            });
        })
        .catch(error => console.error("Error:", error));
}