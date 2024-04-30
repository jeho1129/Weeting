import HomeFrame from '@/components/home/HomeFrame';
import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

export default function Layout() {
  const location = useLocation();
  console.log('이동한곳:', location);
  const transitionName =
    location.pathname === '/custom' ||
    (location.state != null && location.state.previousLocationPathname === '/room' && location.pathname === '/home')
      ? 'Left'
      : location.pathname === '/ranking'
        ? 'Down'
        : location.pathname === 'room' ||
            (location.state != null &&
              location.state.previousLocationPathname === '/custom' &&
              location.pathname === '/home')
          ? 'Right'
          : location.state != null &&
              location.state.previousLocationPathname === '/ranking' &&
              location.pathname === '/home'
            ? 'Up'
            : 'no';
  console.log(transitionName);

  return (
    <TransitionGroup className={`TransitionsWrapper`}>
      <CSSTransition
        key={location.pathname}
        classNames={`TransitionContainer Transition${transitionName}`}
        timeout={300}
      >
        <HomeFrame />
        {/* <div>
          <HomeFrame />
        </div> */}
      </CSSTransition>
    </TransitionGroup>
  );
}
