const tBody = $('tbody');

// Récupérer tous les pokémons et les formater
const allPokemons = Object.values(Pokemon.all_pokemons);

allPokemons.forEach(pokemon => {
    pokemon.id = pokemon.id.toString().padStart(3, '0');
});

const btnPrec = $('#btn-prec');
const btnSuiv = $('#btn-suiv');

// Récupérer la page courante depuis le localStorage 
let currentPage = parseInt(localStorage.getItem('currentPage')) || 0;

const itemsPerPage = 25;

// Afficher les pokémons de la page courante
function showPage(page) {
    // Vider le tableau avant d'afficher les nouveaux pokémons
    tBody.empty();
    // Calculer les indices de début et de fin pour la pagination
    const start = page * itemsPerPage;
    const end = start + itemsPerPage;

    // Afficher les pokémons de la page courante
    allPokemons.slice(start, end).forEach(pokemon => {
        const tr = $('<tr></tr>');
        tr.append(`<td>${pokemon.id}</td>`);
        tr.append(`<td>${pokemon.name}</td>`);
        tr.append(`<td>${pokemon.generation}</td>`);
        tr.append(`<td>${pokemon.types.map(t => t.name).join(', ')}</td>`);
        tr.append(`<td>${pokemon.stamina}</td>`);
        tr.append(`<td>${pokemon.baseAttack}</td>`);
        tr.append(`<td>${pokemon.baseDefense}</td>`);
        tr.append(`<td><img src="./webp/images/${pokemon.id}.webp" alt="${pokemon.name}" width="100"></td>`);
        tBody.append(tr);
    });
}

// Gérer les clics sur les boutons de pagination
btnPrec.click(() => {
    if (currentPage > 0) {
        currentPage--;
        localStorage.setItem('currentPage', currentPage);
        showPage(currentPage);
        updatePageInfo();
    }
});

btnSuiv.click(() => {
    if ((currentPage + 1) * itemsPerPage < allPokemons.length) {
        currentPage++;
        localStorage.setItem('currentPage', currentPage);
        showPage(currentPage);
        updatePageInfo();
    }
});

// Mettre à jour les informations de la page et l'état des boutons
const pageInfo = $('#page-info');

function updatePageInfo() {
    const totalPages = Math.ceil(allPokemons.length / itemsPerPage);
    pageInfo.text(`Page ${currentPage + 1} sur ${totalPages}`);
    
    btnPrec.css('disabled', false);
    btnPrec.css('pointer-events', 'auto');
    btnSuiv.css('disabled', false);
    btnSuiv.css('pointer-events', 'auto');
    
    if (currentPage === 0) {
        btnPrec.css('disabled', true);
        btnPrec.css('pointer-events', 'none');
    }
    
    if (currentPage === totalPages - 1) {
        btnSuiv.css('disabled', true);
        btnSuiv.css('pointer-events', 'none');
    }
}

showPage(currentPage);
updatePageInfo();

const searchInput = $('#search');

searchInput.on('input', () => {
    const query = searchInput.val().toLowerCase();
    const filteredPokemons = allPokemons.filter(pokemon => pokemon.name.toLowerCase().includes(query));
    // Mettre à jour l'affichage avec les pokémons filtrés
    tBody.empty();
    filteredPokemons.forEach(pokemon => {
        const tr = $('<tr></tr>');
        tr.append(`<td>${pokemon.id}</td>`);
        tr.append(`<td>${pokemon.name}</td>`);
        tr.append(`<td>${pokemon.generation}</td>`);
        tr.append(`<td>${pokemon.types.map(t => t.name).join(', ')}</td>`);
        tr.append(`<td>${pokemon.stamina}</td>`);
        tr.append(`<td>${pokemon.baseAttack}</td>`);
        tr.append(`<td>${pokemon.baseDefense}</td>`);
        tr.append(`<td><img src="./webp/images/${pokemon.id}.webp" alt="${pokemon.name}" width="100"></td>`);
        tBody.append(tr);
    });
});

const typeFilter = $('#type-filter');
// Récupérer tous les types uniques
const allTypes = Object.values(Type.all_types).map(type => type.name).sort();
// Ajouter les options de type au select
allTypes.forEach(type => {
    typeFilter.append(`<option value="${type}">${type}</option>`);
});

typeFilter.on('change', () => {
    const selectedType = typeFilter.val();
    const filteredPokemons = selectedType ? allPokemons.filter(pokemon => pokemon.types.some(t => t.name === selectedType)) : allPokemons;
    // Mettre à jour l'affichage avec les pokémons filtrés
    tBody.empty();
    filteredPokemons.forEach(pokemon => {
        const tr = $('<tr></tr>');
        tr.append(`<td>${pokemon.id}</td>`);
        tr.append(`<td>${pokemon.name}</td>`);
        tr.append(`<td>${pokemon.generation}</td>`);
        tr.append(`<td>${pokemon.types.map(t => t.name).join(', ')}</td>`);
        tr.append(`<td>${pokemon.stamina}</td>`);
        tr.append(`<td>${pokemon.baseAttack}</td>`);
        tr.append(`<td>${pokemon.baseDefense}</td>`);
        tr.append(`<td><img src="./webp/images/${pokemon.id}.webp" alt="${pokemon.name}" width="100"></td>`);
        tBody.append(tr);
    });
});
allPokemons.forEach(pokemon => {
    const tr = $(`<tr id="${pokemon.id}"></tr>`);
    tr.append(`<td>${pokemon.id}</td>`);
    tr.append(`<td>${pokemon.name}</td>`);
    tr.append(`<td>${pokemon.generation}</td>`);
    tr.append(`<td>${pokemon.types.map(t => t.name).join(', ')}</td>`);
    tr.append(`<td>${pokemon.stamina}</td>`);
    tr.append(`<td>${pokemon.baseAttack}</td>`);
    tr.append(`<td>${pokemon.baseDefense}</td>`);
    tr.append(`<td><img src="webp/sprites/${pokemon.id}MS.webp" alt="${pokemon.name}" width="100"></td>`);
    tBody.append(tr);
});

// POPUP
$('tr').on('click', source => {
    // Reinitaliser
    $('dialog').remove();

    const pokemon = Pokemon.getById(source.currentTarget.id);

    // Création du popup
    const modal = $('<dialog>');
    modal.on('click', source => {
        if (source.target === modal[0]) {
            modal[0].close();
            modal.remove();
        }
    }).on('close', () => {
        modal.remove();
    }).css({
        backgroundImage: `url('images/popup-bg.jpg'), linear-gradient(135deg, ${pokemon.types[0].color}, ${pokemon.types[1] ? pokemon.types[1].color : pokemon.types[0].color})`
    });

    const types = $('<ul>');
    pokemon.types.forEach(type => {
        types.append(
            $('<li>').append(
                $('<figure>').append(
                    $('<img>').attr({
                        src: `images/types/${type.name}.svg`
                    }),
                    $('<figcaption>').text(type.name)
                ).css({ 'border-color': type.color, 'color': type.color, 'background-color': type.color.replace('rgb', 'rgba').replace(')', ', 0.2)') })
            )
        );
    })

    const fm = $('<ul>');
    pokemon.fastMoves.forEach(move => {
        fm.append(
            $('<li>').addClass('move').append(
                $('<figure>').append(
                    $('<img>').attr({
                        src: `images/types/${move.type}.svg`
                    }),
                    $('<table>').append(
                        $('<tr>').append(
                            $('<th colspan=2>').text(move.name)
                        ),
                        $('<tr>').append(
                            $('<td>').text(`${move.power} PP`),
                            $('<td>').text(`${move.duration / 1000}s`)
                        )
                    )
                ).css({ 'border-color': Type.colors[move.type], 'background-color': Type.colors[move.type].replace('rgb', 'rgba').replace(')', ', 0.2)') })
            )
        )
    })

    const cm = $('<ul>');
    pokemon.chargedMoves.forEach(move => {
        cm.append(
            $('<li>').addClass('move').append(
                $('<figure>').append(
                    $('<img>').attr({
                        src: `images/types/${move.type}.svg`
                    }),
                    $('<table>').append(
                        $('<tr>').append(
                            $('<th colspan=2>').text(move.name).css('color', Type.colors[move.type])
                        ),
                        $('<tr>').append(
                            $('<td>').text(`${move.power} PP`),
                            $('<td>').text(`${move.duration / 1000}s`)
                        )
                    )
                ).css({ 'border-color': Type.colors[move.type], 'background-color': Type.colors[move.type].replace('rgb', 'rgba').replace(')', ', 0.2)') })
            )
        )
    })

    const table = $('<table>').append(
        $('<thead>').append(
            $('<tr>').append(
                $('<th>', { text: `#${pokemon.id} - ${pokemon.name}` }),
                $('<th colspan=3>').append(types)
            )
        ),
        $('<tbody>').append(
            $('<tr>').append(
                $('<td rowspan=6>').append(
                    $('<img>').attr({
                        src: `webp/thumbnails/${pokemon.id}.webp`,
                        title: 'Ouvrir en grand'
                    })
                ),
                $('<th>').text('STA'), $('<th>').text('ATK'), $('<th>').text('DEF')
            ),
            $('<tr>').append(
                $('<td>').text(pokemon.stamina).css('padding-bottom', '1em'), $('<td>').text(pokemon.baseAttack).css('padding-bottom', '1em'), $('<td>').text(pokemon.baseDefense).css('padding-bottom', '1em')
            ),
            $('<tr>').append(
                $('<th colspan=3>').text('Fast Moves')
            ),
            $('<tr>').append(
                $('<td colspan=3>').append(fm)
            ),
            $('<tr>').append(
                $('<th colspan=3>').text('Charged Moves')
            ),
            $('<tr>').append(
                $('<td colspan=3>').append(cm)
            )
        )
    );

    // Affichage du popup
    modal.append([table]);

    $('body').append([modal]);

    modal[0].showModal();

    // SCROLL HORIZONTAL
    document.querySelectorAll('dialog ul').forEach(list => {
        list.addEventListener('wheel', wh => {
            wh.preventDefault();
            list.scrollLeft += wh.deltaY;
        })
    })
})
