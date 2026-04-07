import { RouterProvider } from 'react-router-dom';
import { useContext, useEffect, useRef } from 'react';
import CircleLoader from './ui-component/extended/circleLoader';

// routing
import router from 'routes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import ThemeCustomization from 'themes';
import i18n from './i18n';
import useConfig from 'hooks/useConfig';
import config from 'config';
import { GoalContext } from './contexts/GoalContext';

// ==============================|| APP ||============================== //

export default function App() {

  const { loading } = useContext(GoalContext);

    const {
    state: { fontFamily },
    setField
  } = useConfig();

    const previousLanguageRef = useRef(i18n.language);

  useEffect(() => {
    const resolveDirection = (lng) => (lng === 'ps' || lng === 'ar' ? 'rtl' : 'ltr');

    const resolveFontFamily = (lng) => (lng === 'ps' || lng === 'ar' ? `'Noto Sans Arabic', sans-serif` : `'Poppins', sans-serif`);

    const applyDirection = (lng) => {
      const previousLanguage = previousLanguageRef.current;
      const nextDirection = resolveDirection(lng);
      const nextFontFamily = resolveFontFamily(lng);
      const previousDefaultFont = resolveFontFamily(previousLanguage);

      document.documentElement.dir = nextDirection;
      setField('direction', nextDirection);

      if (!fontFamily || fontFamily === previousDefaultFont || fontFamily === config.fontFamily) {
        setField('fontFamily', nextFontFamily);
      }

      previousLanguageRef.current = lng;
    };

    applyDirection(i18n.language);
    i18n.on('languageChanged', applyDirection);

    return () => {
      i18n.off('languageChanged', applyDirection);
    };
  }, [fontFamily, setField]);


  //notification permissiom
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  if(loading) {
    return <CircleLoader/>
  }

  return (

    <ThemeCustomization>
      <NavigationScroll>
        <>
         <RouterProvider router={router} />
        </>
      </NavigationScroll>
    </ThemeCustomization>
  );
  
}
