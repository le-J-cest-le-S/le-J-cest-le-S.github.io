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
// Récupérer tous les types d'attaque rapide 
const allFastAttacksTemp = [];

for (const pokemon of Object.values(Pokemon.all_pokemons)) {
    for (const move of pokemon.fastMoves) {
        allFastAttacksTemp.push(move.name);
    }
}

const allFastAttacks = [...new Set(allFastAttacksTemp)].sort();

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
        tr.attr('id', pokemon.id);
        tr.append(`<td>${pokemon.id} </td>`);
        tr.append(`<td>${pokemon.name}</td>`);
        const types = pokemon.types.map(type => `
                <figure style="border-color: ${type.color}; color: ${type.color}; background-color: ${type.color.replace('rgb', 'rgba').replace(')', ', 0.2)')}">
                    <img src="images/types/${type.name}.svg" alt="${type.name}">
                    <figcaption>${type.name}</figcaption>
                </figure>
        `).join('');
        tr.append(`<td><div class="table-types">${types}</div></td>`);
        
        tr.append(`<td>${pokemon.stamina}</td>`);
        tr.append(`<td>${pokemon.baseAttack}</td>`);
        tr.append(`<td>${pokemon.baseDefense}</td>`);
        tr.append(`<td><img class='sprite' src="./webp/sprites/${pokemon.id}MS.webp" alt="${pokemon.name}" width="100" id="${pokemon.id}"></td>`);
        tBody.append(tr);
    });
}

tBody.on('mouseenter', 'img.sprite', function() {
    const rect = this.getBoundingClientRect();

    $('<img>', {
        src: `webp/thumbnails/${this.id}.webp`,
        id: 'preview'
    }).css({
        position: 'absolute',
        pointerEvents: 'none',
        top: `${rect.top + window.scrollY - 0}px`,
        left: `${rect.left + window.scrollX}px`
    }).on('load', function() {
        $(this).css('top', `${rect.top + window.scrollY}`);
    }).appendTo('body');

    $(this).css('visibility', 'hidden');
})

tBody.on('mouseleave', 'img.sprite', function() {
    $('#preview').remove();

    $(this).css('visibility', 'visible');
})

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

const searchInput = $('#search');

function applyFilters() {
    // Réinitialiser la page courante à 0 à chaque fois que les filtres sont appliqués
    currentPage = 0; 
    localStorage.setItem('currentPage', 0);

    // Filtrer les pokémons en fonction des critères de recherche
    currentPokemons = allPokemons.filter(pokemon => {
        // Vérifier si le nom du pokémon correspond à la requête de recherche
        const matchesSearch = pokemon.name.toLowerCase().includes(searchQuery);
        // Vérifier si le pokémon correspond au type sélectionné
        const matchesType = selectedType
            ? pokemon.types.some(t => t.name === selectedType)
            : true;
        // Vérifier si le pokémon correspond à l'attaque rapide sélectionnée
        const matchesFastAttack = selectedFastAttack ? pokemon.fastMoves.some(move => move.name === selectedFastAttack)
            : true;
        return matchesSearch && matchesType && matchesFastAttack;
    });

    showPage(currentPage, currentPokemons);
    updatePageInfo(currentPokemons);
}

// Filtrer par nom
searchInput.on('input', () => {
    searchQuery = searchInput.val().toLowerCase();
    applyFilters();
});

// Filtrer par type
typeFilter.on('change', () => { 
    selectedType = typeFilter.val();
    applyFilters();
});

// Filtrer par attaque rapide
fastAttackFilter.on('change', () => {
    selectedFastAttack = fastAttackFilter.val();
    applyFilters();
});

// POPUP
tBody.on('click', 'tr', source => {
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

    // Génération des types
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

    // Génération des attaques rapides
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

    // Génération des attaques chargées
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

    // Génération du tableau
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
                        src: `webp/images/${pokemon.id}.webp`,
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

showPage(currentPage, currentPokemons);
updatePageInfo(currentPokemons);