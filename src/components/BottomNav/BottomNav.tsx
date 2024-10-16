import React, { Key, ReactNode } from 'react';
import s from './BottomNav.module.scss';
import cn from 'classnames';
import { pages } from '@/utils/const';

import { mdiClipboardTextClockOutline, mdiTextBoxSearchOutline, mdiPlusBoxOutline, mdiAccountBoxOutline } from '@mdi/js';
import Icon from '@mdi/react';
import Link from "next/link";
import { useRouter } from 'next/router';

type TabItemType = {
  id: Key,
  label: string,
  href: string,
  icon: ReactNode,
}

const tabs: TabItemType[] = [
  {
    id: 'find-job',
    label: pages.findJob.title,
    href: pages.findJob.link,
    icon: <Icon path={mdiTextBoxSearchOutline} size="24px" />,
  },
  {
    id: 'create-trip',
    label: pages.createTrip.title,
    href: pages.createTrip.link,
    icon: <Icon path={mdiPlusBoxOutline} size="24px" />,
  },
  {
    id: 'my-orders',
    label: pages.myJobs.title,
    href: pages.myJobs.link,
    icon: <Icon path={mdiClipboardTextClockOutline} size="24px" />,
  },
  {
    id: 'profile',
    label: pages.profile.title,
    href: pages.profile.link,
    icon: <Icon path={mdiAccountBoxOutline} size="24px" />
  },
]

export const BottomNav = () => {
  const router = useRouter();

  return (
    <nav className={s['nav-layout']}>
      {tabs.map(tab => {
        const isActive = router.pathname === tab.href;
        //console.log(router)
        return (
          <div className={s.tabWrapper} key={tab.id}>
            <Link href={tab.href} className={cn(s['tab-item'], { [s.active]: isActive })}>
              {tab.icon}
              <span>{tab.label}</span>
            </Link>
          </div>
        )
      })}
    </nav>
  );
};