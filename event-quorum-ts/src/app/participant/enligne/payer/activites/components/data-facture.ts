//src/app/participant/enligne/payer/suivredirecte/activites/components/data-facture.ts

export interface Facture {
  id: string;
  type: 'Orange Money' | 'MTN Money' | 'Wave' | 'Guichet';
  montant: number;
  date: string;
  numeroTransaction?: string;
}

export const FACTURES_DATA: Facture[] = [
  {
    id: 'F001',
    type: 'Orange Money',
    montant: 22000,
    date: '2024-01-15T10:30:00',
    numeroTransaction: 'OM-2024-001234',
  },
  {
    id: 'F002',
    type: 'MTN Money',
    montant: 20000,
    date: '2024-01-15T11:45:00',
    numeroTransaction: 'MM-2024-005678',
  },
  {
    id: 'F003',
    type: 'Wave',
    montant: 18000,
    date: '2024-01-15T14:20:00',
    numeroTransaction: 'WV-2024-009876',
  },
  {
    id: 'F004',
    type: 'Guichet',
    montant: 10000,
    date: '2024-01-15T09:15:00',
  },
  {
    id: 'F005',
    type: 'Orange Money',
    montant: 22000,
    date: '2024-01-14T16:30:00',
    numeroTransaction: 'OM-2024-001122',
  },
];