import type { IParticipantTableFilters } from 'src/types/participant';
import type { UseSetStateReturn } from 'minimal-shared/hooks';
import type { FiltersResultProps } from 'src/components/filters-result';

import { useCallback } from 'react';

import Chip from '@mui/material/Chip';

import { chipProps, FiltersBlock, FiltersResult } from 'src/components/filters-result';

// ----------------------------------------------------------------------

type Props = FiltersResultProps & {
  onResetPage: () => void;
  filters: UseSetStateReturn<IParticipantTableFilters>;
};

export function ParticipantTableFiltersResult({ filters, onResetPage, totalResults, sx }: Props) {
  const { state: currentFilters, setState: updateFilters, resetState: resetFilters } = filters;

  const handleRemoveKeyword = useCallback(() => {
    onResetPage();
    updateFilters({ full_name: '' });
  }, [onResetPage, updateFilters]);

  const handleRemoveStatus = useCallback(
    (inputValue: string) => {
      const newStatuses = currentFilters.status.filter((item) => item !== inputValue);
      onResetPage();
      updateFilters({ status: newStatuses });
    },
    [onResetPage, updateFilters, currentFilters.status]
  );

  const handleReset = useCallback(() => {
    onResetPage();
    resetFilters();
  }, [onResetPage, resetFilters]);

  return (
    <FiltersResult totalResults={totalResults} onReset={handleReset} sx={sx}>
      <FiltersBlock label="Statuts:" isShow={!!currentFilters.status.length}>
        {currentFilters.status.map((item) => (
          <Chip {...chipProps} key={item} label={item} onDelete={() => handleRemoveStatus(item)} />
        ))}
      </FiltersBlock>

      <FiltersBlock label="Mot-clé:" isShow={!!currentFilters.full_name}>
        <Chip {...chipProps} label={currentFilters.full_name} onDelete={handleRemoveKeyword} />
      </FiltersBlock>
    </FiltersResult>
  );
}
