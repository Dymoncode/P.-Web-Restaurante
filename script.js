const toggleButton = document.getElementById("themeToggle");
const body = document.body;
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

toggleButton.addEventListener("click", () => {
  body.classList.toggle("dark");
  toggleButton.textContent = body.classList.contains("dark") ? "☀️" : "🌙";
});

menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    mainNav.classList.toggle("active");
});

// Cerrar menú al hacer click en un enlace
mainNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        mainNav.classList.remove("active");
    });
});

// Actualiza el año en el footer
document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Cargar menú y carta desde JSON
    cargarMenu();

    // Validación del formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', validarFormulario);
    }

    // Añadir listeners a los enlaces de contacto
    const contactLinks = document.querySelectorAll('a[href="#contacto"]');
    contactLinks.forEach(link => {
        link.addEventListener('click', showContactForm);
    });
});

// Fución para mostrar el formulario de contacto
function showContactForm() {
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
        contactSection.classList.remove('hidden');
    }
}

// Función para cargar el menú diario y carta desde JSON
async function cargarMenu() {
    try {
        const response = await fetch('menu.json');
        const data = await response.json();

        // Cargar menú diario
        const menuDiarioContainer = document.getElementById('menuDiarioContainer');
        const menuDescripcion = document.getElementById('menuDescripcion');

        if (menuDiarioContainer && data.menuDiario) {
            // Añadir descripción
            if (menuDescripcion) {
                menuDescripcion.textContent = data.menuDiario.descripcion;
            }

            // Crear columna de Primeros
            const primerosDiv = document.createElement('div');
            primerosDiv.className = 'menu-column';

            const primerosTitle = document.createElement('h3');
            primerosTitle.textContent = 'Primeros';
            primerosDiv.appendChild(primerosTitle);

            data.menuDiario.primeros.forEach(plato => {
                const dishDiv = document.createElement('div');
                dishDiv.className = 'menu-dish';

                const dishName = document.createElement('h4');
                dishName.textContent = plato.nombre;

                const dishDesc = document.createElement('p');
                dishDesc.textContent = plato.descripcion;

                dishDiv.appendChild(dishName);
                dishDiv.appendChild(dishDesc);
                primerosDiv.appendChild(dishDiv);
            });

            // Crear columna de Segundos
            const segundosDiv = document.createElement('div');
            segundosDiv.className = 'menu-column';

            const segundosTitle = document.createElement('h3');
            segundosTitle.textContent = 'Segundos';
            segundosDiv.appendChild(segundosTitle);

            data.menuDiario.segundos.forEach(plato => {
                const dishDiv = document.createElement('div');
                dishDiv.className = 'menu-dish';

                const dishName = document.createElement('h4');
                dishName.textContent = plato.nombre;

                const dishDesc = document.createElement('p');
                dishDesc.textContent = plato.descripcion;

                dishDiv.appendChild(dishName);
                dishDiv.appendChild(dishDesc);
                segundosDiv.appendChild(dishDiv);
            });

            // Crear columna de Postres y Bebida
            const postresDiv = document.createElement('div');
            postresDiv.className = 'menu-column';

            const postresTitle = document.createElement('h3');
            postresTitle.textContent = 'Postres y Bebida';
            postresDiv.appendChild(postresTitle);

            const dishDiv = document.createElement('div');
            dishDiv.className = 'menu-dish';

            const dishName = document.createElement('h4');
            dishName.textContent = data.menuDiario.postres;

            const dishDesc = document.createElement('p');
            dishDesc.textContent = data.menuDiario.bebida;

            dishDiv.appendChild(dishName);
            dishDiv.appendChild(dishDesc);
            postresDiv.appendChild(dishDiv);

            const priceBox = document.createElement('div');
            priceBox.className = 'menu-price-box';

            const priceLabel = document.createElement('p');
            priceLabel.textContent = 'Precio del menú';

            const priceValue = document.createElement('h3');
            priceValue.textContent = data.menuDiario.precio;

            priceBox.appendChild(priceLabel);
            priceBox.appendChild(priceValue);
            postresDiv.appendChild(priceBox);

            menuDiarioContainer.appendChild(primerosDiv);
            menuDiarioContainer.appendChild(segundosDiv);
            menuDiarioContainer.appendChild(postresDiv);
        }

        // Cargar carta completa
        const cartaContainer = document.getElementById('cartaContainer');
        if (cartaContainer && data.carta) {
            // Crear tabs
            const tabsDiv = document.createElement('div');
            tabsDiv.className = 'menu-tabs';

            // Crear contenedor de contenido
            const contentDiv = document.createElement('div');
            contentDiv.className = 'menu-content';

            data.carta.forEach((categoria, index) => {
                // Crear tab
                const tabButton = document.createElement('button');
                tabButton.className = `menu-tab ${index === 0 ? 'active' : ''}`;
                tabButton.textContent = categoria.categoria;
                tabButton.dataset.index = index;

                tabButton.addEventListener('click', () => {
                    // Remover active de todos los tabs y categorías
                    document.querySelectorAll('.menu-tab').forEach(tab => tab.classList.remove('active'));
                    document.querySelectorAll('.menu-category').forEach(cat => cat.classList.remove('active'));

                    // Activar tab y categoría clickeada
                    tabButton.classList.add('active');
                    document.querySelector(`.menu-category[data-index="${index}"]`).classList.add('active');
                });

                tabsDiv.appendChild(tabButton);

                // Crear contenido de categoría
                const categoriaDiv = document.createElement('div');
                categoriaDiv.className = `menu-category ${index === 0 ? 'active' : ''}`;
                categoriaDiv.dataset.index = index;

                const categoryTitle = document.createElement('h3');
                categoryTitle.textContent = categoria.categoria;
                categoriaDiv.appendChild(categoryTitle);

                categoria.platos.forEach(plato => {
                    const menuItem = document.createElement('div');
                    menuItem.className = 'menu-item';

                    const platoName = document.createElement('span');
                    platoName.textContent = plato.nombre;

                    const platoPrice = document.createElement('span');
                    platoPrice.className = 'price';
                    platoPrice.textContent = plato.precio;

                    menuItem.appendChild(platoName);
                    menuItem.appendChild(platoPrice);
                    categoriaDiv.appendChild(menuItem);
                });

                contentDiv.appendChild(categoriaDiv);
            });

            cartaContainer.appendChild(tabsDiv);
            cartaContainer.appendChild(contentDiv);
        }
    } catch (error) {
        console.error('Error al cargar el menú:', error);
    }
}

// Función para validar el formulario de contacto
function validarFormulario(e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    // Validar campos obligatorios
    if (!nombre || !email || !mensaje) {
        alert('Por favor, completa todos los campos obligatorios (*)');
        return false;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, introduce un email válido');
        return false;
    }

    // Validar longitud mínima del mensaje
    if (mensaje.length < 10) {
        alert('El mensaje debe tener al menos 10 caracteres');
        return false;
    }

    // Si todo es válido, mostrar mensaje de éxito
    alert('¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.');

    // Limpiar formulario
    document.getElementById('contactForm').reset();

    return true;
}
