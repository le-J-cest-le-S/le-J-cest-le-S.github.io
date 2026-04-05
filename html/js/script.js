const tBody = $('tbody');

// Récupérer tous les pokémons et les formater
const allPokemons = Object.values(Pokemon.all_pokemons);
let currentPokemons = allPokemons;

allPokemons.forEach(pokemon => {
    pokemon.id = pokemon.id.toString().padStart(3, '0');
});

const btnPrec = $('#btn-prec');
const btnSuiv = $('#btn-suiv');

let searchQuery = '';
let selectedType = '';
let selectedFastAttack = '';

const typeFilter = $('#type-filter');
// Récupérer tous les types uniques
const allTypes = Object.values(Type.all_types).map(type => type.name).sort();
// Ajouter les options de type au select
allTypes.forEach(type => {
    typeFilter.append(`<option value="${type}">${type}</option>`);
});

const fastAttackFilter = $('#fast-attack-filter');
// Récupérer tous les types d'attaque rapide uniques
const allFastAttacks = [...new Set(allPokemons.flatMap(pokemon => pokemon.fastMoves.map(move => move.name)))].sort();
// Ajouter les options d'attaque rapide au select
allFastAttacks.forEach(move => {
    fastAttackFilter.append(`<option value="${move}">${move}</option>`);
});


// Récupérer la page courante depuis le localStorage 
let currentPage = parseInt(localStorage.getItem('currentPage')) || 0;

const itemsPerPage = 25;

// Afficher les pokémons de la page courante
function showPage(page = 0, pokemons = allPokemons) {
    // Vider le tableau avant d'afficher les nouveaux pokémons
    tBody.empty();
    // Calculer les indices de début et de fin pour la pagination
    const start = page * itemsPerPage;
    const end = start + itemsPerPage;

    // Afficher les pokémons de la page courante
    pokemons.slice(start, end).forEach(pokemon => {
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
        showPage(currentPage, currentPokemons);
        updatePageInfo(currentPokemons);
    }
});

btnSuiv.click(() => {
    if ((currentPage + 1) * itemsPerPage < currentPokemons.length) {
        currentPage++;
        localStorage.setItem('currentPage', currentPage);
        showPage(currentPage, currentPokemons);
        updatePageInfo(currentPokemons);
    }
});

// Mettre à jour les informations de la page et l'état des boutons
const pageInfo = $('#page-info');

function updatePageInfo(pokemons = currentPokemons) {
    const totalPages = Math.ceil(pokemons.length / itemsPerPage);
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
showPage(currentPage, currentPokemons);
updatePageInfo(currentPokemons);

const searchInput = $('#search');

function applyFilters() {
    currentPage = 0; 
    localStorage.setItem('currentPage', 0);

    currentPokemons = allPokemons.filter(pokemon => {
        const matchesSearch = pokemon.name.toLowerCase().includes(searchQuery);
        const matchesType = selectedType
            ? pokemon.types.some(t => t.name === selectedType)
            : true;
        const matchesFastAttack = selectedFastAttack ? pokemon.fastMoves.some(move => move.name === selectedFastAttack)
            : true;
        return matchesSearch && matchesType && matchesFastAttack;
    });

    showPage(currentPage, currentPokemons);
    updatePageInfo(currentPokemons);
}

searchInput.on('input', () => {
    searchQuery = searchInput.val().toLowerCase();
    applyFilters();
});

typeFilter.on('change', () => { 
    selectedType = typeFilter.val();
    applyFilters();
});

fastAttackFilter.on('change', () => {
    selectedFastAttack = fastAttackFilter.val();
    applyFilters();
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
});