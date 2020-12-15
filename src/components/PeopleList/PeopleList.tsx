import React, { useState, useMemo } from 'react';
import { Box, Input } from '@chakra-ui/react';

import { Person } from '../../types';

import { PeopleListItem } from './PeopleListItem';
import { PeopleListSearch } from './PeopleListSearch';

export interface Props {
  people: Person[];
}

export function PeopleList({
  people,
}: Props) {
  const [searchValue, setSearchValue] = useState('');

  const filteredPeople = useMemo(() => {
    let sortedPeople;
    if (searchValue) {
      sortedPeople = people.filter((person) => {
        const { name, teamName } = person;
        let lowerCaseSearchValue = searchValue.toLowerCase();
        if (name.toLowerCase().includes(lowerCaseSearchValue) || teamName.toLowerCase().includes(lowerCaseSearchValue)) {
          return true;
        }
      });
    } else {
      sortedPeople = people;
    }
    return sortedPeople.sort((personA, personB) => {
      if (personA.name === personB.name) {
        return 0;
      }
      return personA.name > personB.name ? 1 : -1;
    });
  
  }, [people, searchValue]);


  function handleSearch(value) {
    setSearchValue(value);
  }

  return (
    <Box>
      <PeopleListSearch
        onSearch={handleSearch}
      />

      {filteredPeople.map((person) => (
        <PeopleListItem
          key={person.id}
          {...person}
        />
      ))}
    </Box>
  );
}
