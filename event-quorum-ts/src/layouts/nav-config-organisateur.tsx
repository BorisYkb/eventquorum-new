//src/layouts/nav-config-organisateur.tsx
import type { NavSectionProps } from 'src/components/nav-section';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/global-config';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
    <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
    job: icon('ic-job'),
    blog: icon('ic-blog'),
    chat: icon('ic-chat'),
    mail: icon('ic-mail'),
    user: icon('ic-user'),
    file: icon('ic-file'),
    lock: icon('ic-lock'),
    tour: icon('ic-tour'),
    order: icon('ic-order'),
    label: icon('ic-label'),
    blank: icon('ic-blank'),
    kanban: icon('ic-kanban'),
    folder: icon('ic-folder'),
    course: icon('ic-course'),
    banking: icon('ic-banking'),
    booking: icon('ic-booking'),
    invoice: icon('ic-invoice'),
    product: icon('ic-product'),
    calendar: icon('ic-calendar'),
    disabled: icon('ic-disabled'),
    external: icon('ic-external'),
    menuItem: icon('ic-menu-item'),
    ecommerce: icon('ic-ecommerce'),
    analytics: icon('ic-analytics'),
    dashboard: icon('ic-dashboard'),
    parameter: icon('ic-parameter'),
    habilitation: icon('ic-habilitation'),
};

// ----------------------------------------------------------------------

export const organisateurNavData: NavSectionProps['data'] = [
    /**
     * Overview
     */
    {
        // subheader: 'Aperçu',
        items: [
            { title: 'Accueil', path: paths.organisateur.root, icon: ICONS.dashboard },
            { title: 'Gestion Evenement', path: paths.organisateur.gestionevent.root, icon: ICONS.calendar },
            
            // ✅ Transformation de "Gestion Participant" en dropdown avec sous-éléments
            { 
                title: 'Gestion Participant', 
                path: paths.organisateur.gestionparticipant.root, 
                icon: ICONS.user,
                children: [
                    {
                        title: 'Liste des invités et participants',
                        path: paths.organisateur.gestionparticipant.root,
                        icon: ICONS.user,
                    },
                    {
                        title: 'Gestion des demandes d\'inscription',
                        path: `${paths.organisateur.gestionparticipant.root}/demandes-inscription`,
                        icon: ICONS.menuItem,
                    },
                    {
                        title: 'Gestion des messages',
                        path: `${paths.organisateur.gestionparticipant.root}/gestion-messages`,
                        icon: ICONS.chat,
                    },
                    {
                        title: 'Gestion des boitiers electroniques',
                        path: `${paths.organisateur.gestionparticipant.root}/gestion-boitiers`,
                        icon: ICONS.parameter,
                    }
                ]
            },
            
            { title: 'Gestion Habilitations', path: paths.organisateur.gestionhabilitations.root, icon: ICONS.habilitation },
            { title: 'Gestion Enquete', path: paths.organisateur.gestionenquete.root, icon: ICONS.analytics },
        ],
    },
];