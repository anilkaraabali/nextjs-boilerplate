import { NextPageWithLayout } from '@/pages/_app';
import { ViewProps } from '@/types';
import Image from 'next/image';

import styles from './HomeView.module.scss';

interface HomeViewProps extends ViewProps {}

function HomeView() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          alt='Next.js logo'
          className={styles.logo}
          height={38}
          priority
          src='/next.svg'
          width={180}
        />
        <ol>
          <li>
            Get started by editing <code>src/pages/index.tsx</code>.
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>
      </main>
    </div>
  );
}

export type { HomeViewProps };
export default HomeView;

HomeView.getLayout = (page: NextPageWithLayout) => page;
