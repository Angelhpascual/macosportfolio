import { navIcons, navLinks } from '#constants';
import useWindowStore from '#store/window';
import dayjs from 'dayjs';

const NavBar = () => {
  const { openWindow } = useWindowStore();
  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="logo" />
        <p className="font-bold">angelhpascual portfolio</p>
        <ul>
          {navLinks.map(({ name, id, type }) => (
            <li key={id} onClick={() => openWindow(type)}>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul>
          {navIcons.map(({ img, id }) => (
            <li key={id}>
              <img className="icon-hover" src={img} alt={`icon-${id}`} />
            </li>
          ))}
        </ul>
        <time>{dayjs().format('ddd MMM D h:mm A')}</time>
      </div>
    </nav>
  );
};

export default NavBar;
