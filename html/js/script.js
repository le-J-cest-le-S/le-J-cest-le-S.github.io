const tBody = $('tbody');

const allPokemons = Object.values(Pokemon.all_pokemons);

allPokemons.forEach(pokemon => {
    pokemon.id = pokemon.id.toString().padStart(3, '0');
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