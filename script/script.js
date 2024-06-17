document.addEventListener("DOMContentLoaded", function() {
    // Manejo de los enlaces de las redes sociales
    const redes = document.querySelectorAll('.redes a');
    redes.forEach(red => {
        red.addEventListener('click', function(event) {
            event.preventDefault();
            const url = this.href;
            window.open(url, '_blank');
        });
    });

    // Manejo del formulario de generación de boleta
    document.getElementById("formularioBoleta").addEventListener("submit", function(event) {
        event.preventDefault();

        // Validación de nombre permitiendo tildes y espacios
        const nombreInput = document.getElementById("nombre");
        const nombre = nombreInput.value.trim(); // Elimina espacios en blanco al inicio y final
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/.test(nombre)) {
            alert("El nombre solo debe contener letras y espacios, permitiendo tildes.");
            nombreInput.focus();
            return;
        }

        // Validación de cantidad y precio: solo números positivos
        const cantidad = parseFloat(document.getElementById("cantidad").value);
        const precio = parseFloat(document.getElementById("precio").value);
        if (isNaN(cantidad) || cantidad <= 0 || isNaN(precio) || precio <= 0) {
            alert("Cantidad y precio deben ser números positivos.");
            return;
        }

        // Obtener los valores del formulario
        const fecha = document.getElementById("fecha").value;
        const producto = document.getElementById("producto").value;

        // Calcular el total, descuentos e impuestos
        const total = cantidad * precio;
        const descuentos = total > 100 ? total * 0.1 : 0;
        const impuestos = total * 0.18;
        const totalPagar = total - descuentos + impuestos;

        // Mostrar los resultados en la boleta
        document.getElementById("numeroBoleta").textContent = Math.floor(Math.random() * 1000000);
        document.getElementById("fechaEmision").textContent = new Date().toLocaleDateString();
        document.getElementById("boletaNombre").textContent = nombre;
        document.getElementById("boletaProducto").textContent = producto;
        document.getElementById("boletaCantidad").textContent = cantidad;
        document.getElementById("boletaPrecio").textContent = precio.toFixed(2);
        document.getElementById("boletaTotal").textContent = total.toFixed(2);
        document.getElementById("boletaDescuentos").textContent = descuentos.toFixed(2);
        document.getElementById("boletaImpuestos").textContent = impuestos.toFixed(2);
        document.getElementById("boletaTotalPagar").textContent = totalPagar.toFixed(2);
    });

    // Manejo de botones adicionales
    document.getElementById("mostrarIntegrantes").addEventListener("click", function() {
        toggleVisibility("contenidoIntegrantes");
    });

    document.getElementById("mostrarCurso").addEventListener("click", function() {
        toggleVisibility("contenidoCurso");
    });

    function toggleVisibility(elementId) {
        const element = document.getElementById(elementId);
        if (element.style.display === "none" || element.style.display === "") {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    }

    // Función para mostrar slides automáticamente
    let slideIndex = 0;

    function showSlides() {
        const slides = document.querySelectorAll('.carousel-slide');
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = 'none';
        }
        slideIndex++;
        if (slideIndex > slides.length) { slideIndex = 1 }
        slides[slideIndex - 1].style.display = 'block';
        setTimeout(showSlides, 3000); // Cambia la imagen cada 3 segundos
    }

    // Función para mover slides con botones
    function moveSlide(n) {
        const slides = document.querySelectorAll('.carousel-slide');
        slideIndex += n;
        if (slideIndex > slides.length) { slideIndex = 1 }
        if (slideIndex < 1) { slideIndex = slides.length }
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = 'none';
        }
        slides[slideIndex - 1].style.display = 'block';
    }

    // Ejecutar la función para mostrar slides automáticamente al cargar la página
    showSlides();

    // Contador de vistas de página
    let viewCount = localStorage.getItem('viewCount') || 0;
    viewCount = parseInt(viewCount, 10);
    viewCount++;
    document.getElementById('viewCount').textContent = viewCount;
    localStorage.setItem('viewCount', viewCount.toString());
});


