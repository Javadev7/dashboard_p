import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SiShopware } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

/* Importing the links from the dummy.js file. */
import { links } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';

const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } = useStateContext();

  /* If the activeMenu is not undefined and the screenSize is less than or equal to 900, then set the
 * activeMenu to false
 */
  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  /* A string that is used to style the active link. */
  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {/* Se crea la barra de navegacion parte superior cuando se despliega se ingluye el icono logo y tambien el boton cancelar, ademas se evalua si esta activo con activeMenu, parte superior */}
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link to="/" onClick={handleCloseSideBar} className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
              <SiShopware /> <span>Shoppy</span>
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                /* Toggling the activeMenu state. */
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          {/* Se mapea cada link objeto y se obtiene el title y dentro de este mapeo inicial se mapea y se obtiene el name, adi mismo el componente NavLink enlazara con el name mediante la funcion HandleCloseSideBar y se le pasara un estilo con la funcion isActive(diferentes className), tambien se renderiza los iconos  */}
          <div className="mt-10 ">
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  /* handleCloseSideBar ayuda a cerrar la barra lateral despues de averiguar el tamaño de pantalla, si es movil una vez q elijas un link de la barra, esta te llevara a la pagina y se cerrar automaticamente */
                  /* NavLink es un componente de react router especial nos permite nacegar por distintas paginas,
                   */
                  <NavLink
                    to={`/${link.name}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    //  Se aplica un inline style que nos permite llamar un callback
                    // TODO:  investigar el valor de 'isActive'
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : '',
                    })}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  >
                    {link.icon}
                    <span className="capitalize ">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
