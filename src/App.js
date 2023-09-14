import { useState, useEffect, useMemo } from "react";
import { pokemonData } from "./data/pokemon";

const PokemonList = () => {
  // instruction: set up the following states
  // - pokemons: array of pokemons. use pokemonData as initial value
  const [pokemons, setPokemons] = useState(pokemonData);
  // - searchTerm: search term for pokemon's name
  const [searchTerm, setSearchTerm] = useState("");
  // - sort: sort by title or rating
  const [sort, setSort] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const types = useMemo(() => {
    let options = [];
    // instruction: get all types from pokemoneData
    // pokemonData.type.forEach((t) => {
    //   if (!options.includes(t)) {
    //     options.push(t);
    //   }
    // });
    if (pokemonData && pokemonData.length > 0) {
      pokemonData.forEach((pokemon) => {
        if (!options.includes(pokemon.type)) {
          options.push(pokemon.type);
        }
      });
    }
    return options;
  }, [pokemonData]);

  useEffect(() => {
    let newPokemons = [...pokemonData];
    // instruction: do title search using the searchTerm state
    if (searchTerm) {
      newPokemons = newPokemons.filter(
        (i) => i.name.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0
      );
    }
    // instruction: do type filter using the selectedType state
    if (selectedType) {
      newPokemons = newPokemons.filter((dontcopyme) =>
        dontcopyme.type.includes(selectedType)
      );
    }

    // instruction: sort by name or level
    switch (sort) {
      case "name":
        newPokemons = newPokemons.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
        break;
      case "levelh-l":
        newPokemons = newPokemons.sort((a, b) => {
          return a.level - b.level;
        });
        break;
      case "levell-h":
        newPokemons = newPokemons.sort((a, b) => {
          return b.level - a.level;
        });
        break;
      default:
        break;
    }

    // instruction: set pokemons state with newPokemons variable
    setPokemons(newPokemons);
  }, [pokemonData, selectedType, sort, searchTerm]);

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-6">
          <input
            type="text"
            placeholder="Search"
            // instruction: assign searchTerm state to value
            value={searchTerm}
            onChange={(e) => {
              // instruction: set searchTerm state
              setSearchTerm(e.target.value);
            }}
          />
        </div>
        <div className="col-6 text-end mb-3">
          <select
            className="me-1 mb-1"
            // instruction: assign sort state to value
            value={sort}
            onChange={(e) => {
              // instruction: set sort state
              setSort(e.target.value);
            }}
          >
            <option value="name">Sort by Name</option>
            <option value="levell-h">Sort by Level High to Low</option>
            <option value="levelh-l">Sort by Level Low to High</option>
          </select>

          <select
            className="me-1 mb-1"
            // instruction: assign selectedType state to value
            value={selectedType}
            onChange={(e) => {
              // instruction: set selectedType state
              setSelectedType(e.target.value);
            }}
          >
            <option value="">All Types</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* instruction:  */}
      {/* - display the pokemons here */}
      {/* - responsive layout: 1 column for mobile, 2 columns for tablet, 3 columns for desktop */}
      <div className="row">
        {pokemons.length > 0 ? (
          pokemons.map((pokemon) => {
            return (
              <div
                className="col-lg-4 col-md-6 col-sm-12 my-3"
                key={pokemon.name}
              >
                <div className="card p-3">
                  <img
                    src={"/images/" + pokemon.image}
                    alt={pokemon.name}
                    className="card-img-top"
                    max-width="25px"
                  />
                  <h5 className="card-text">{pokemon.name}</h5>
                  <p className="card-text text-muted">{pokemon.type}</p>
                  <p className="card-text">Level: {pokemon.level}</p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center mt-5">
            <h3>cannot search this Pokémon !</h3>
            <img
              src="https://cdn.stealthoptional.com/images/ncavvykf/stealth/b71fabe8f307a5b35ba6d22dee29eb24d71d8ffd-1920x1080.jpg?rect=0,36,1920,1008&w=1600&h=840"
              width="700px"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonList;
