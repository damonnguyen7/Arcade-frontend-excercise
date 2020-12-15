import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';

import { PeopleList, Props } from '../PeopleList';

describe('PeopleList', () => {
  const buildSubject = (props: Props) => render(<PeopleList {...props} />)

  describe('rendering', () => {
    const props = {
      people: [
        {
          id: '1',
          name: 'FAKE_NAME_1',
        },
      ],
    };

    it('renders a list of people', () => {
      const { getByText } = buildSubject(props);

      expect(getByText('FAKE_NAME_1')).toBeDefined();
    });
  });

  describe('searching', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    const props = {
      people: [
        {
          id: '1',
          name: 'FAKE_NAME_1',
          teamName: 'FAKE_TEAM_NAME_1',
        },
        {
          id: '2',
          name: 'FAKE_NAME_2',
          teamName: 'FAKE_TEAM_NAME_2',
        },
      ],
    };

    it('filters a list of people by name', () => {
      const { queryByText, getByLabelText } = buildSubject(props);

      fireEvent.change(getByLabelText('Search'), {
        target: {
          value: 'FAKE_NAME_2'
        }
      });

      act(() => jest.runAllTimers());

      expect(queryByText('FAKE_NAME_1')).toBeNull();
      expect(queryByText('FAKE_NAME_2')).not.toBeNull();
    });

    it('filters a list of people by teamName', () => {
      const { queryByText, getByLabelText } = buildSubject(props);

      fireEvent.change(getByLabelText('Search'), {
        target: {
          value: 'FAKE_TEAM_NAME_1'
        }
      });

      act(() => jest.runAllTimers());

      expect(queryByText('FAKE_TEAM_NAME_2')).toBeNull(); //has to exist in document
      expect(queryByText('FAKE_TEAM_NAME_1')).not.toBeNull(); //does not exist in document
    });
  });
});
