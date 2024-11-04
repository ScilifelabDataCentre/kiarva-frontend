'use client';

import { ReactElement } from 'react';
import {
    BODY_CLASSES,
    H_1,
} from '@/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IPaths } from '@/interfaces/types';

export default function SelectionTabComponent(prop: {
    paths: IPaths;
  }): ReactElement {
    const pageTitle: string = "Population plots";

    const currentRoute = usePathname();
    
    return (
        <>
            <div className={BODY_CLASSES}>
                <div className={H_1}>{pageTitle}</div>
                <div role="tablist" className="tabs tabs-lifted pb-4">
                    {Object.keys(prop.paths).map( key => (
                        <Link 
                            key={key}
                            href={prop.paths[key as keyof typeof prop.paths]} 
                            role='tab' 
                            className={`tab ${ currentRoute == prop.paths[key as keyof typeof prop.paths] 
                                ? 
                                'tab-active text-info-content !bg-info' 
                                : 
                                'bg-white shadow'}`}
                        >
                        {key}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}