import { IconType } from "react-icons";
import { HiChartPie, HiCog, HiDocument, HiOutlinePlusCircle } from "react-icons/hi";

interface NavGroup {
    requiresAdmin?: boolean;
    items: NavItem[];
}

interface NavItem {
    requiresAdmin?: boolean;
    href: string;
    text: string;
    icon: IconType;
}

export const nav: NavGroup[] = [
    { 
        requiresAdmin: true,
        items: [
            { 
                href: '/',
                text: 'Dashboard',
                icon: HiChartPie
            },
            { 
                href: '/workbooks/create',
                text: 'Create workbook',
                icon: HiOutlinePlusCircle
            }
        ]
    },
    { 
        items: [
            { 
                href: '/workbook',
                text: 'Workbook',
                icon: HiDocument
            },
            { 
                href: '/settings',
                text: 'settings',
                icon: HiCog
            }
        ]
    }
];
